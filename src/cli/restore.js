const moment = require('moment');
const app = require('../index');

/* eslint-disable indent*/
module.exports = function() {
    this
        .title('Restore local mongo database')
        .helpful()
        .opt()
            .name('database').title('name of local database')
            .short('db').long('database')
            .req()
        .end()
        .opt()
            .name('date').title('date of backup in YYYY-MM-DD format (example: 2018-08-10)')
            .short('d').long('date')
            .def(moment().format('YYYY-MM-DD'))
        .end()
        .opt()
            .name('environment').title('backup environment identifier')
            .short('env').long('environment')
            .def('dev')
        .end()
        .opt()
            .name('backups').title('repository with backups')
            .short('backups').long('backups')
        .end()
        .act((options) => {
            return app.execute(options);
        });
};
/* eslint-enable indent*/
