# tattoobrands_by
TattooBrands.by

Rerun

> ./mongo-start.sh
> sudo pm2 start ./start-server.sh

Steps:

- Install keystone:
    >$ npm install -g yo \
    $ npm install -g generator-keystone \
    $ yo keystone

- check store
/api/check-store

pm2 monit - show processes
pm2 kill - kill all processes
pm2 start app.js - start app.js as service
pm2 start ./app.js --name myName - start app.js as service with needed name

[sudo] mongod --shutdown --dbpath ./db/data # kill mongodb process with --dbpath ./db/data
[sudo] mongod --fork --logpath ./db/log.txt --dbpath ./db/data

ps -ax | grep mongo // get mongo status
ps -e | grep mongod // almost the same, show mongod process only

top/htop - to show all processes

scp deploy@188.166.70.236:~/apps/tattoobrands_by/site-2017-10-28-08-48-51.zip ~/site-2017-10-28-08-48-51.zip

#How to start
0 - go to tattoobrands_by

1 - run mongo

> sudo mongod --fork --logpath ./db/log.txt --dbpath ./db/data
- should return - about to fork child process, waiting until server is ready for connections.
                  forked process: 17350
                  child process started successfully, parent exiting

2 - run store
> pm2 start ./keystone.js --name store

3 - make sure store is running
> pm2 monit

4 - run store monit
    4.1 - go to tattoobrands_monit
    4.2 - start store monit
    > pm2 start ./index.js --name monit

5 - make sure store and store monit works properly
> pm2 monit


#How to make backup

1 - Enter to machine
> ssh deploy@188.166.70.236

2 - Kill all pm2 processes
> pm2 kill

3 - Stop MongoDB
    3.0 - go to tattoobrands_by

    3.1 - make sure mongodb is running
    > ps -e | grep mongod
        - should return smth like this - 7884 ? 00:09:38 mongod

    3.2 - kill mongodb process
    > sudo mongod --shutdown --dbpath ./db/data
        - should return smth like this - killing process with pid: 7884

4 - make backup
> zip -r --exclude=*.git* --exclude=*.idea* --exclude=*node_modules* --exclude=*old-tb* --exclude=*_res* site-`date +%Y-%m-%d-%H-%M-%S`.zip ./

#How to download backup
scp deploy@188.166.70.236:~/tb-<date>.zip ~/tb-<date>.zip

make back up every 1 hour
> $ nohup watch -n 3600 ./make-file-list.sh &


sudo pm2 start ./start-server.sh


mongodump --port=27017 --db=tattoo-brands --archive=db.zip
mongorestore --port=27001 --db=tattoo-brands --archive=./_res/db.zip
mongodump --port=27017 --db=tattoo-brands --archive=db-dump-`date +%Y-%m-%d-%H-%M-%S`.zip
