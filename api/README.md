## Web API

Directory for web backend.

## First-Time Setup

1. Create a Python 3 virtual environment somewhere outside the project directory. Perhaps `mkdir ~/.virtualenv`, then `cd ~/.virtualenv` and run `python3 -m venv api-env`.
2. Activate your environment with `source ~/.virtualenv/api-env/bin/activate`.
3. Install all Python modules required by the app by (first navigating back to this directory then) running `pip3 install -r requirements.txt`.
4. Create a `pymongocreds.py` file with the following contents:
```
CONN_STR = "endpoint-of-mongodb-database"
```

## Run the App

1. Activate your environment with `source ~/.virtualenv/api-env/bin/activate` (if you haven't already).
2. Run `python3 api.py` to start the app on `localhost:3080`.
