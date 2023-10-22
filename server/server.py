from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

from api.db_utils import *
from api.wordbomb_api import *

app = Flask(__name__) # create Flask instance
CORS(app) # enable CORS on Flask server to work with Nodejs pages
api = Api(app) # api router

api.add_resource(Dictionaries,'/dictionaries')
api.add_resource(LetterPrompts, '/letterprompts')
api.add_resource(Game, '/game')
# api.add_resource(LetterPrompts, '/letterprompts/<int:id>')

if __name__ == '__main__':
    print("Loading db")
    exec_sql_file('word_data.sql')
    print("Starting flask")
    app.run(debug=True), #starts Flask