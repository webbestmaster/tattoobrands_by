#!/usr/bin/env bash

echo "stop server"
sh ./stop-server.sh

echo "make zip back-up"
zip -r --exclude=*.git* --exclude=*.idea* --exclude=*node_modules* --exclude=*old-tb* --exclude=*_res* tb-`date +%Y-%m-%d-%H-%M-%S`.zip ./apps/tattoobrands_by/

echo "start server"
sh ./start-server.sh

echo `ls`
