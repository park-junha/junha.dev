# Modules
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from werkzeug.exceptions import BadRequest, NotFound

import pymongo

# App
app = Flask(__name__)
cors = CORS(app, resources={r'api/*': {'origins': '*'}})

app.config['DEBUG'] = True

api = Api(app)

# Resources
class ServerStatus(Resource):
    def get(self):
        response = {}
        try:
            response['message'] = 'Server is running.'
            return response, 200
        except:
            response['message'] = 'Internal server error.'
            return response, 500

# Routes
api.add_resource(ServerStatus, '/')

if __name__ == '__main__':
 app.run(host = 'localhost', port = 3080)
