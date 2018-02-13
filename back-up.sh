#!/usr/bin/env bash

echo "stop server"
bash ./stop-server.sh

echo "push into git"
bash ./git-push.sh

#echo "make zip back-up"
#zip -r --exclude=*.git* --exclude=*.idea* --exclude=*node_modules* --exclude=*old-tb* --exclude=*_res* tb-`date +%Y-%m-%d-%H-%M-%S`.zip ./apps/tattoobrands_by/

echo "start server"
bash ./start-server.sh

ls -1 -s -h
df -h
