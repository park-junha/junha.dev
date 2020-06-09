#!/bin/bash
BASE_DIR="$(cd "$(dirname "$0" )" && pwd )"
SCRIPT_DIR=$BASE_DIR"/write-to-db.js"
DB_ENDPOINT=$(grep DB_ENDPOINT $BASE_DIR/.env | cut -d '=' -f2)
DB_USER=$(grep DB_USER $BASE_DIR/.env | cut -d '=' -f2)

function usage () {
    echo "Usage:"
    echo "--access, -a: Log onto cluster via mongo shell"
    echo "--write, -w: Write data to cluster via mongo shell"
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
