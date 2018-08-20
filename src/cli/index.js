require('loud-rejection')();

require('coa').Cmd()
    .name(process.argv[1])
    .title('CLI utility for restore local mongo database from repository with backups')
    .helpful()
    .cmd().name('restore').apply(require('./restore')).end()
    .run(process.argv.slice(2));
