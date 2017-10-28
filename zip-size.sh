#!/usr/bin/env bash


# this is work, --exclude=*.git* --exclude=*node_modules* - both will excluded
#zip -9 -r --exclude=*.git* --exclude=*.idea* --exclude=*node_modules* --exclude=*old-tb* --exclude=*_res* site-`date +%Y-%m-%d-%H-%M-%S`.zip ./
zip -r --exclude=*.git* --exclude=*.idea* --exclude=*node_modules* --exclude=*old-tb* --exclude=*_res* site-`date +%Y-%m-%d-%H-%M-%S`.zip ./

#zip -r site-`date +%Y-%m-%d-%H-%M-%S`.zip ./
