#!/bin/bash
BASE_DIR="$(cd "$(dirname "$0" )" && pwd )"
API_DIR=$BASE_DIR"/api"
NG_DIR=$BASE_DIR"/ng"

DEF_LOG='\033[0m'
API_LOG='\033[0;36m'
NG_LOG='\033[0;31m'

function api {
    echo Starting web backend...
    cd $API_DIR
    go run main.go dev
}

function ui {
    echo Starting web frontend...
    cd $NG_DIR
    ng serve
}

function log {
    sed -e "s/^/`printf "${2}"`[$1] `printf "${DEF_LOG}"`/"
}

clear
(api | log pw3:api $API_LOG & ui | log pw3:ng $NG_LOG)
