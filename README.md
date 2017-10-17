# tattoobrands_by
TattooBrands.by

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

mongod --shutdown --dbpath ./db/data # kill mongodb process with --dbpath ./db/data
mongod --fork --logpath ./db/log.txt --dbpath ./db/data
