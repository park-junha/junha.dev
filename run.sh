#!/bin/bash
BASE_DIR="$(cd "$(dirname "$0" )" && pwd )"
API_DIR=$BASE_DIR"/api"
NG_DIR=$BASE_DIR"/ng"

DEF_LOG='\033[0m'
API_LOG='\033[0;36m'
NG_LOG='\033[0;31m'

TIMEOUT=100

function get-ip {
    echo $(ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p')
}

function get-api-interface {
    echo $(cat $API_DIR/.env | awk '/HOST/ && !/DB/' | cut -d '=' -f2):$(cat $API_DIR/.env | awk '/PORT/ && !/DB/' | cut -d '=' -f2)
}

function api {
    echo Starting web backend...
    cd $API_DIR
    go run main.go dev
}

function ui {
    echo Starting web frontend...
    cd $NG_DIR
    if [[ $# -eq 0 ]]; then
        ng serve
    elif [[ $# -eq 1 ]]; then
        case $1 in
        prod)
            echo "Using production environment..."
            ng serve --configuration=production
            ;;
        host)
            IPADDR=$(get-ip)
            echo "Hosting on $IPADDR..."
            ng serve --host=$IPADDR
            ;;
        prodhost)
            echo "Using production environment..."
            IPADDR=$(get-ip)
            echo "Hosting on $IPADDR..."
            ng serve --configuration=production --host=$IPADDR
            ;;
        *)
            echo "FATAL ERR: Internal script function could not recognize parameter"
            exit 1
            ;;
        esac
    fi
}

function run-tests {
    API_INTERFACE=$(get-api-interface)
    echo "Waiting for $API_INTERFACE..."
    ((timer = $TIMEOUT))
    while [[ $timer -ne 0 ]]; do
        curl $API_INTERFACE 2> /dev/null
        rc=$?
        if [[ $rc -eq 0 ]]; then
            ((timer = 1))
        fi
        ((timer = timer - 1))
        sleep 1
    done

    if [[ $rc -eq 0 ]]; then
        cd $NG_DIR
        echo
        echo "Starting end-to-end tests..."
        ng e2e
        echo "Starting unit tests..."
        ng test
        exit 0
    else
        echo "FATAL ERR: Timeout"
        exit 1
    fi
}

function log {
    sed -e "s/^/`printf "${2}"`[$1] `printf "${DEF_LOG}"`/"
}

function usage {
    echo "Available Options:"
    echo "(no flags): Run web UI and web API locally in development mode"
    echo "-a, --api-only: Run web API only in development mode"
    echo "-u, --ui-only: Run web UI only in development mode"
    echo "-p, --production-mode: Run web UI in development mode with a production environment. This mode will NOT run the web API, since the web UI will make calls from the live web API"
    echo "-h, --host-ip: Host web UI on local IP address"
    echo "-t, --test: Run unit tests and end-to-end tests while running web API in development mode"
}

function invalid {
    echo "Invalid option(s) specified. Run with -o or --options to view all options."
}

if [[ $# -eq 0 ]]; then
    clear
    (api | log pw3:api $API_LOG & ui | log pw3:ng $NG_LOG)
elif [[ $# -eq 1 ]]; then
    case $1 in
    -o | --options)
        usage
        exit 0
        ;;
    -p | --production-mode)
        clear
        (ui prod | log pw3:ng $NG_LOG)
        ;;
    -h | --host-ip)
        clear
        (api | log pw3:api $API_LOG & ui host | log pw3:ng $NG_LOG)
        ;;
    -hp | -ph)
        clear
        (ui prodhost | log pw3:ng $NG_LOG)
        ;;
    -a | --api-only)
        clear
        (api | log pw3:api $API_LOG)
        ;;
    -u | --ui-only)
        clear
        (ui | log pw3:ng $NG_LOG)
        ;;
    -uh | -hu)
        clear
        (ui host | log pw3:ng $NG_LOG)
        ;;
    -t | --test)
        clear
        trap "kill 0" EXIT
        (api | log pw3:api $API_LOG & run-tests | log pw3:ng $NG_LOG)
        ;;
    *)
        invalid
        exit 1
        ;;
    esac
else
    usage
fi
