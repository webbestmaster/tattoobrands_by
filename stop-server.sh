#!/usr/bin/env bash

echo "go to server repo"
cd ~/apps/tattoobrands_by/

echo `pwd`

echo "stop mongod"
sudo mongod --shutdown --dbpath ./db/data

if [[ `ps -e | grep mongod` = *[!\ ]* ]]; then
  echo "[ERROR] MongoDB still is RUNNING!!!"
else
  echo "MongoDB has been stop"
fi

echo "kill pm2"
pm2 kill
