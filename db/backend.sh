#!/bin/bash

BASE_DIR="$(cd "$(dirname "$0" )" && pwd )"
SCRIPT_DIR=$BASE_DIR"/write-to-db.js"
DB_ENDPOINT="mongodb+srv://junha-m2byj.mongodb.net"
DB_USER="admin"

function usage () {
    echo "Usage:"
    echo "--access, -a: Log onto mongo shell"
    echo "--write, -w: Write data.json data to mongo shell"
    exit 1;
}

function access-mongo {
    mongo --host $DB_ENDPOINT --username $DB_USER --password
}

function write-to-mongo {
    mongo $SCRIPT_DIR --host $DB_ENDPOINT --username $DB_USER --password
}

if [[ $# -eq 1 ]]; then
    case $1 in
    -a | --access)
        access-mongo
        exit 1
        ;;
    -w | --write)
        write-to-mongo
        exit 1
        ;;
    *)
        usage
        ;;
    esac
else
    usage;
fi
