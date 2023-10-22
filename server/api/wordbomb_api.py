from flask_restful import Resource

from flask_restful import request
from .db_utils import *

class Dictionaries(Resource):
    def get(self):
       result = exec_get_all("SELECT * FROM Dictionaries")
       return result
        
class LetterPrompts(Resource):
    def get(self):
       result = exec_get_all("SELECT * FROM LetterPrompts")
       return result
    
class Game(Resource):
    def get(self):
       result = exec_get_one("SELECT * FROM Game")
       return result
    
    def put(self):
        dictionary = request.json.get('Dictionary')
        used_words = request.json.get('Used Words')
        players = request.json.get('Players')
        lives = request.json.get('Lives')
        exec_commit('UPDATE Game \
                        SET dictionary=%s, used_words=%s, players=%s, lives=%s',
                    (dictionary, used_words, players, lives))