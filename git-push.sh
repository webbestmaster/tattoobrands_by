#!/usr/bin/env bash

echo "go to server repo"
#cd ./apps/tattoobrands_by/

echo "add all files to git"
git add .

currentDate=`date +%Y-%m-%d-%H-%M-%S`
commitMessage="save state - $currentDate"

echo "commit $commitMessage"
git commit -m "$commitMessage"


echo "push to repo"
git push

