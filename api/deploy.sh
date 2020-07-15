#!/bin/bash
BASE_DIR="$(cd "$(dirname "$0" )" && pwd )"
TEMP_DIR=/tmp/main
TEMPZIP_DIR=$TEMP_DIR.zip

PROJECTS_SQL=$BASE_DIR/projects.sql
PROJECT_SQL=$BASE_DIR/project.sql
EXPERIENCES_SQL=$BASE_DIR/experiences.sql
EXPERIENCE_SQL=$BASE_DIR/experience.sql
TECHS_SQL=$BASE_DIR/techs.sql
TECH_SQL=$BASE_DIR/tech.sql

# LAMBDA_FUNCTION required in .env file
LAMBDA_FUNCTION=$(grep LAMBDA_FUNCTION $BASE_DIR/.env | cut -d '=' -f2)

cd $BASE_DIR
echo "Building app to $TEMP_DIR..."
env GOOS=linux GOARCH=amd64 go build -o $TEMP_DIR
echo "Zipping app to $TEMPZIP_DIR..."
zip -j $TEMPZIP_DIR $TEMP_DIR $PROJECTS_SQL $PROJECT_SQL $EXPERIENCES_SQL \
    $EXPERIENCE_SQL $TECHS_SQL $TECH_SQL
echo "Deploying your app to Lambda function $LAMBDA_FUNCTION..."
aws lambda update-function-code --function-name $LAMBDA_FUNCTION \
    --zip-file fileb://$TEMPZIP_DIR
echo "Done!"
