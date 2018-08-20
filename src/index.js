const path = require('path');
const {spawn} = require('child_process');
const _ = require('lodash');
const moment = require('moment');
const Git = require('simple-git/promise');

exports.execute = async (options = {}) => {
    console.info('Restore databse from dump');
    console.info('Options:');
    console.info(`--database: ${options.database}`);
    console.info(`--date: ${options.date}`);
    console.info(`--environment: ${options.environment}`);
    console.info(`--backups: ${options.backups}`);

    const dbPath = path.resolve(options.backups);
    const git = Git(dbPath);

    await git.checkout('master');
    await git.pull();

    const commitHash = await getTargetCommitHash(git, options);
    await git.checkout(commitHash);

    await makeDatabaseRestore(options);
    console.info('success');
};

async function getTargetCommitHash(git, {date, environment}) {
    date = moment(date);
    environment = environment.toUpperCase();

    const log = await git.log();
    const commit = _(log.all)
        .filter((item) => _.includes(item.message, environment))
        .filter((item) => date.isSame(moment(item.date, 'YYYY-MM-DD'), 'day'))
        .first();

    if (!commit) {
        throw new Error(`No suitable backup found for ${date} and ${environment}`);
    }

    console.info(`Found backup with hash: ${commit.hash}`);
    return commit.hash;
}

async function makeDatabaseRestore(options) {
    const dbPath = path.resolve(options.backups);
    const backupPath = path.join(dbPath, options.environment, 'dump/platform-api');
    const args = ['--drop', `--db=${options.database}`, backupPath];

    return new Promise((resolve, reject) => {
        const restore = spawn('mongorestore', args);

        restore.stdout.on('data', (data) => console.log(`stdout: ${data}`));
        // restore.stderr.on('data', (data) => console.log(`stderr: ${data}`));
        restore.on('close', (code) => resolve(code));
        restore.on('error', (code) => reject(code));
    });
}
