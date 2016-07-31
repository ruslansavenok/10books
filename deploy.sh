# Requires mongo and node.js & forever to be installed on target server

# Server Config
SSH_HOST="books10c@books.10clouds.com"
NODE_PATH="/home/books10c/.nvm/versions/node/v6.3.0/bin"
TARGET_PATH="/home/books10c"
BUNDLE_NAME="10books.tar.gz"

# Meteor Config
ROOT_URL="http://books.10clouds.com"
PORT="58080"
MONGO_URL='mongodb://@localhost:27017/bookDB'

echo Updating npm...
npm install --production


echo Building bundle...
rm -rf $BUNDLE_NAME
meteor build . --architecture os.linux.x86_64


echo Uploading bundle...
ssh -v $SSH_HOST <<ENDSSH
cd $TARGET_PATH
rm -rf tmp
mkdir tmp
mkdir -p 10books
ENDSSH
scp -v $BUNDLE_NAME $SSH_HOST:$TARGET_PATH/tmp


echo Starting bundle..
ssh -v $SSH_HOST <<ENDSSH
cd $TARGET_PATH/10books
$NODE_PATH/forever stop bundle/main.js
rm -rf bundle
tar xfz $TARGET_PATH/tmp/$BUNDLE_NAME -C $TARGET_PATH/10books
cd bundle
(cd programs/server && $NODE_PATH/npm install)
MONGO_URL=$MONGO_URL \
ROOT_URL=$ROOT_URL \
PORT=$PORT \
MAIL_URL='smtp://10books_user:%27d%2Buy%24j3Kxv%25UJ%3Dh@smtp.sendgrid.net:587/' \
$NODE_PATH/forever start --append -l forever.log -o out.log -e error.log main.js
ENDSSH


echo Cleanup..
rm -rf $BUNDLE_NAME
