#!/bin/bash 
# IP or URL of the server you want to deploy to
APP_HOST="books.10clouds.com"

# Uncomment this if your host is an EC2 instance
# EC2_PEM_FILE=path/to/your/file.pem

# You usually don't need to change anything below this line

ROOT_URL=http://$APP_HOST
PORT=58080
APP_DIR=/home/books10c/book_app/books.10clouds.com
MONGO_URL='mongodb://book_user:Qwe23$as9@127.0.0.1:27017/bookDB'
SSH_HOST="root@$APP_HOST" SSH_OPT=""
if [ -d ".meteor/meteorite" ]; then
    METEOR_CMD=mrt
  else
    METEOR_CMD=meteor
fi

echo Deploying...
$METEOR_CMD bundle books.10clouds.com.tgz > /dev/null 2>&1 &&
scp -v $SSH_OPT books.10clouds.com.tgz $SSH_HOST:/home/books10c/tmp/ #> /dev/null 2>&1 &&
scp -v $SSH_OPT update_up.sh $SSH_HOST:/home/books10c/ > /dev/null 2>&1 &&
rm books.10clouds.com.tgz> /dev/null 2>&1 &&
ssh -v $SSH_OPT $SSH_HOST PORT=$PORT MONGO_URL=$MONGO_URL ROOT_URL=$ROOT_URL APP_DIR=$APP_DIR 'sudo -E bash -s' > ERRORS 2>&1 <<'ENDSSH'
chmod a+x /home/books10c/update_up.sh
chown books10c:books10c /home/books10c/update_up.sh
su  books10c /home/books10c/update_up.sh
ENDSSH
echo Your app is deployed and serving on: $ROOT_URL
