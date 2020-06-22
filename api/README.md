## GraphQL API

Directory for web backend.

## First-Time Setup

1. Install the following dependencies:
```
go get github.com/aws/aws-lambda-go/events
go get github.com/aws/aws-lambda-go/lambda
go get github.com/graphql-go/graphql
go get github.com/joho/godotenv
go get github.com/lib/pq
```
2. Create a `.env` file within this directory:
```
# PostgreSQL database credentials
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=samplepassword
DB_SCHEMA=sampledb
DB_SSLMODE=prefer

# Dev server configuration
HOST=127.0.0.1
PORT=2000

# OPTIONAL: Allowed origins for CORS
ORIGINS_ALLOWED=*

# OPTIONAL: Lambda function name
LAMBDA_FUNCTION=samplelambda
```

Note that `.env` is mostly needed for running the app locally. When deploying to AWS Lambda, the environment variables should be set within the AWS Console on the respective Lambda function it is deployed to.

## Run the App

### Developer mode
1. Clone this repository and navigate to this (`api/`) directory
2. Run `go run main.go dev`, or `go build` then `./main dev`

## Deploy to AWS Lambda

You can deploy the Go app to AWS Lambda with `./deploy.sh`! (Assuming your AWS Lambda / API Gateway have already been configured and set up)
