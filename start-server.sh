#!/usr/bin/env bash

echo "go to server repo"
cd ~/apps/tattoobrands_by/

echo `pwd`

echo "run mongo db"
sudo mongod --fork --logpath ./db/log.txt --dbpath ./db/data --port=27001

echo "run server"
pm2 start ./keystone.js --name store

echo "wait 10 seconds for run server"
sleep 10s

echo "go to monit repo"
cd ~/apps/tattoobrands_monit/

echo "run monit"
pm2 start ./index.js --name monit

#pm2 monit
