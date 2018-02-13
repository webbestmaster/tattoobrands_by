#!/usr/bin/env bash

# user this to cache git's credentials
# git config --global credential.helper 'cache --timeout=3600'
# 3600 = 1 hour
# git config --global credential.helper 'cache --timeout=31622400'
# 31622400 = 1 year

echo "go to server repo"
cd ~/apps/tattoobrands_by/

echo "add all files to git"
git add .

currentDate=`date +%Y-%m-%d-%H-%M-%S`
commitMessage="save state - $currentDate"

echo "commit $commitMessage"
git commit -m "$commitMessage"

echo "push to repo"
git push
