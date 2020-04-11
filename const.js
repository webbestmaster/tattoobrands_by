const mainDataBaseName = 'tattoo-brands';
const databaseDumpFolderName = 'db-dump';

module.exports.dataBaseConst = {
    url: 'mongodb://localhost:27001,localhost:27002,localhost:27003,localhost:27004?replicaSet=MyBestReplica',
    shallCommand: {
        backup: [
            `mkdir ${databaseDumpFolderName};`,
            'mongodump',
            '--port=27001',
            `--archive=${databaseDumpFolderName}/db-dump-\`date +%Y-%m-%d--%H-%M-%S\`.zip`,
            `--db=${mainDataBaseName}`,
        ].join(' '),
    },
};
