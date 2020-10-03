#!/bin/bash
BASE_DIR="$(cd "$(dirname "$0" )" && pwd )"
API_DIR=$BASE_DIR"/api"
NG_DIR=$BASE_DIR"/ng"

DEF_LOG='\033[0m'
API_LOG='\033[0;36m'
NG_LOG='\033[0;31m'
SH_LOG='\033[0;32m'

UNIT_TEST_CONFIG_DIR=$NG_DIR/karma.single.conf.js
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
        lambda)
            echo "Using AWS Lambda API environment..."
            ng serve --configuration=lambda
            ;;
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
        rc_e2e=$?
        if [[ $# -eq 1 ]] && [[ $1 == "e2e" ]]; then
            echo "Skipping unit tests."
            rc_units=-1
        else
            echo "Starting unit tests..."
            ng test --karmaConfig=$UNIT_TEST_CONFIG_DIR
            rc_units=$?
        fi
        if [[ $rc_e2e -eq 0 ]]; then
            echo "All end-to-end tests passed!"
        else
            echo "ERR: Some end-to-end tests did not pass."
        fi
        if [[ $rc_units -eq 0 ]]; then
            echo "All unit tests passed!"
        elif [[ $rc_units -eq -1 ]]; then
            echo "Unit tests skipped."
        else
            echo "ERR: Some unit tests did not pass."
        fi
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
    echo "-ul, --ui-lambda: Run web UI only in development mode with connection to production API on AWS Lambda"
    echo "-p, --production-mode: Run web UI in development mode with a production environment. This mode will NOT run the web API, since the web UI will make calls from the live web API"
    echo "-h, --host-lan: Host web UI on local IP address"
    echo "-t, --test: Run unit tests and end-to-end tests while running web API in development mode"
    echo "-e, --e2e: Run end-to-end tests only while running web API in development mode"
}

function invalid {
    echo "Invalid option(s) specified. Run with -o or --options to view all options."
}

if [[ $# -eq 0 ]]; then
    clear
    echo "Starting script..." | log pw3:sh $SH_LOG
    (api | log pw3:api $API_LOG & ui | log pw3:ng $NG_LOG)
    echo "Script complete." | log pw3:sh $SH_LOG
elif [[ $# -eq 1 ]]; then
    case $1 in
    -o | --options)
        usage
        exit 0
        ;;
    -p | --production-mode)
        clear
        echo "Starting script..." | log pw3:sh $SH_LOG
        (ui prod | log pw3:ng $NG_LOG)
        echo "Script complete." | log pw3:sh $SH_LOG
        ;;
    -h | --host-lan)
        clear
        echo "Starting script..." | log pw3:sh $SH_LOG
        (api | log pw3:api $API_LOG & ui host | log pw3:ng $NG_LOG)
        echo "Script complete." | log pw3:sh $SH_LOG
        ;;
    -hp | -ph)
        clear
        echo "Starting script..." | log pw3:sh $SH_LOG
        (ui prodhost | log pw3:ng $NG_LOG)
        echo "Script complete." | log pw3:sh $SH_LOG
        ;;
    -a | --api-only)
        clear
        echo "Starting script..." | log pw3:sh $SH_LOG
        (api | log pw3:api $API_LOG)
        echo "Script complete." | log pw3:sh $SH_LOG
        ;;
    -u | --ui-only)
        clear
        echo "Starting script..." | log pw3:sh $SH_LOG
        (ui | log pw3:ng $NG_LOG)
        echo "Script complete." | log pw3:sh $SH_LOG
        ;;
    -ul | --ui-lambda)
        clear
        echo "Starting script..." | log pw3:sh $SH_LOG
        (ui lambda | log pw3:ng $NG_LOG)
        echo "Script complete." | log pw3:sh $SH_LOG
        ;;
    -uh | -hu)
        clear
        echo "Starting script..." | log pw3:sh $SH_LOG
        (ui host | log pw3:ng $NG_LOG)
        echo "Script complete." | log pw3:sh $SH_LOG
        ;;
    -t | --test)
        clear
        echo "Starting script..." | log pw3:sh $SH_LOG
        trap "kill 0" EXIT
        (api | log pw3:api $API_LOG & run-tests | log pw3:ng $NG_LOG)
        echo "Script complete." | log pw3:sh $SH_LOG
        ;;
    -e | --e2e)
        clear
        echo "Starting script..." | log pw3:sh $SH_LOG
        trap "kill 0" EXIT
        (api | log pw3:api $API_LOG & run-tests e2e | log pw3:ng $NG_LOG)
        echo "Script complete." | log pw3:sh $SH_LOG
        ;;
    *)
        invalid | log pw3:sh $SH_LOG
        exit 1
        ;;
    esac
else
    usage
fi
