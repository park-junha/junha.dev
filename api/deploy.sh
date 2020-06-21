#!/bin/bash
BASE_DIR="$(cd "$(dirname "$0" )" && pwd )"
TEMP_DIR=/tmp/main
TEMPZIP_DIR=$TEMP_DIR.zip

# LAMBDA_FUNCTION required in .env file
LAMBDA_FUNCTION=$(grep LAMBDA_FUNCTION $BASE_DIR/.env | cut -d '=' -f2)

cd $BASE_DIR
echo "Building app to $TEMP_DIR..."
env GOOS=linux GOARCH=amd64 go build -o $TEMP_DIR
echo "Zipping app to $TEMPZIP_DIR..."
zip -j $TEMPZIP_DIR $TEMP_DIR $BASE_DIR/projects.sql $BASE_DIR/project.sql
echo "Deploying your app to Lambda function $LAMBDA_FUNCTION..."
aws lambda update-function-code --function-name $LAMBDA_FUNCTION --zip-file fileb://$TEMPZIP_DIR
echo "Done!"
