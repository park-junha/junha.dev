## GraphQL API

Directory for web backend.

## First-Time Setup

1. Install the following dependencies:
```
go get go.mongodb.org/mongo-driver/bson
go get go.mongodb.org/mongo-driver/mongo
go get github.com/aws/aws-lambda-go/events
go get github.com/aws/aws-lambda-go/lambda
go get github.com/graphql-go/graphql
go get github.com/joho/godotenv
```
2. Create a `.env` file within this directory:
```
DB_URI="<ATLAS-URI>"        # URI string of MongoDB cluster with password
DB_NAME="<DATABASE-NAME>"   # Name of your MongoDB database

# Optional parameters
HOST=127.0.0.1              # App selects 127.0.0.1 by default
PORT=2000                   # App selects 2000 by default
```

Note that `.env` is mostly needed for running the app locally. When deploying to AWS Lambda, the environment variables should be set within the AWS Console on the respective Lambda function it is deployed to.

## Run the App

### Developer mode
1. Clone this repository and navigate to this (`api/`) directory
2. Run `go run main.go dev`, or `go build` then `./main dev`
