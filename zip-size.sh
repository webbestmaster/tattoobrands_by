#!/usr/bin/env bash


# this is work, --exclude=*.git* --exclude=*node_modules* - both will excluded
zip -r --exclude=*.git* --exclude=*node_modules* site-`date +%Y-%m-%d-%H-%M-%S`.zip ./

#zip -r site-`date +%Y-%m-%d-%H-%M-%S`.zip ./
