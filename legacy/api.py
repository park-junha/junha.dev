# Modules
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from werkzeug.exceptions import BadRequest

# MongoDB
from pymongo import MongoClient
from pymongocreds import CONN_STR

client = MongoClient(CONN_STR)
db = client['personalwebsite']
col = db['PersonalWebsite']

# App
app = Flask(__name__)
cors = CORS(app, resources={r'*': {'origins': '*'}})

app.config['DEBUG'] = True

api = Api(app)

# Resources
class All(Resource):
    def get(self):
        response = {}
        items = []
        try:
            for result in col.find():
                result['_id'] = str(result['_id'])
                items.append(result)

            response['message'] = 'Request successful.'
            response['result'] = items
            return response, 200
        except:
            raise BadRequest('Request failed, please try again later.')

# Routes
api.add_resource(All, '/')

if __name__ == '__main__':
    app.run(host='localhost', port=3080)
