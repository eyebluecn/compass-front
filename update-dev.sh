#!/bin/sh

HOME_PATH=/data/group/railway/party-front-dev

cd $HOME_PATH

echo " --- reset to HEAD --- "
sudo git reset --hard HEAD

echo " --- pull from git server --- "
sudo git pull

echo " --- npm install --- "
sudo cnpm install

echo " --- npm run build --- "
sudo npm run build

echo " --- move to production folder --"
cp -r ./dist/* ./production/

echo " --- finish updating! --- "
