#!/bin/bash
BASE_DIR="$(cd "$(dirname "$0" )" && pwd )"
SCRIPT_DIR=$BASE_DIR"/data.sql"
USER=$(grep USER $BASE_DIR/.env | cut -d '=' -f2)
PASSWORD=$(grep PASSWORD $BASE_DIR/.env | cut -d '=' -f2)
NETLOC=$(grep NETLOC $BASE_DIR/.env | cut -d '=' -f2)
PORT=$(grep PORT $BASE_DIR/.env | cut -d '=' -f2)
DBNAME=$(grep DBNAME $BASE_DIR/.env | cut -d '=' -f2)

function usage () {
    echo "Usage:"
    echo "--access, -a: Log onto database via shell"
    echo "--write, -w: Execute script on database via shell"
    exit 1;
}

function access-db {
    psql postgres://$USER:$PASSWORD@$NETLOC:$PORT/$DBNAME
}

function write-to-db {
    psql postgres://$USER:$PASSWORD@$NETLOC:$PORT/$DBNAME < $SCRIPT_DIR
}

if [[ $# -eq 1 ]]; then
    case $1 in
    -a | --access)
        access-db
        exit 1
        ;;
    -w | --write)
        write-to-db
        exit 1
        ;;
    *)
        usage
        ;;
    esac
else
    usage;
fi
