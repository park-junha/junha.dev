## GraphQL API

Directory for web backend.

## First-Time Setup

1. Install the following dependencies:
```
go get go.mongodb.org/mongo-driver/bson
go get go.mongodb.org/mongo-driver/mongo
go get go.mongodb.org/mongo-driver/mongo/options

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

## Run the App

### Developer mode
1. Clone this repository and navigate to this (`api/`) directory
2. Run `go run main.go`
