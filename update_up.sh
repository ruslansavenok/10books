#!/bin/bash 

APP_HOST="books.10clouds.com"
ROOT_URL=http://$APP_HOST
PORT=58080
APP_DIR=/home/books10c/book_app/books.10clouds.com
MONGO_URL='mongodb://book_user:Qwe23$as9@127.0.0.1:27017/bookDB'
APP_HOST="books.10clouds.com"

source /home/books10c/.virtualenvs/10books/bin/activate
if [ ! -d "$APP_DIR" ]; then
mkdir -p $APP_DIR
chown -R books10c:books10c $APP_DIR
fi
pushd $APP_DIR
forever stop bundle/main.js
rm -rf bundle
tar xfz /home/books10c/tmp/books.10clouds.com.tgz -C $APP_DIR
rm /home/books10c/tmp/books.10clouds.com.tgz
forever start --append -l forever.log -o out.log -e error.log bundle/main.js
