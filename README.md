# backup-detective
CLI Utility for restore local mongo db from repo with backups

## Usage

Clone repo on local filesystem:
```bash
git clone https://github.com/tormozz48/backup-detective.git
```

Install npm dependencies:
```bash
npm install
```

```bash
CLI utility for restore local mongo database from repository with backups
Restore local mongo database

Usage:
  bd restore [OPTIONS] [ARGS]


Options:
  -h, --help : Help
  -db DATABASE, --database=DATABASE : name of local database (required)
  -d DATE, --date=DATE : date of backup in YYYY-MM-DD format (example: 2018-08-10)
  -env ENVIRONMENT, --environment=ENVIRONMENT : backup environment identifier
  -backups BACKUPS, --backups=BACKUPS : repository with backups
```

Example:
```bash
node bin/bd restore --database=platform-api-test --backups=../mongobackups/ -d 2018-08-01
```
