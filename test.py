from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOST'] = ['dont-show-debug-toolbar']

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!

    def test_show_board(self):
        with app.test_client() as client:
            res=client.get('/')

            self.assertEqual(res.status_code, 200)
            self.assertEqual(len(session['board']), 5)

    def test_check_invalid_word(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] =[
                    ['A', 'B', 'C', 'D', 'E'],
                    ['F', 'G', 'H', 'I', 'J'],
                    ['K', 'L', 'M', 'N', 'O'],
                    ['P', 'Q', 'R', 'S', 'T'],
                    ['U', 'V', 'W', 'X', 'Y']
                ]
            res=client.post('/check-guess', json={'guess': 'qwerrt'})
            data=res.get_json()

            self.assertEqual(res.status_code, 200)
            self.assertEqual(data['result'], "not-word")

    def test_check_not_on_board(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] =[
                    ['A', 'B', 'C', 'D', 'E'],
                    ['F', 'G', 'H', 'I', 'J'],
                    ['K', 'L', 'M', 'N', 'O'],
                    ['P', 'Q', 'R', 'S', 'T'],
                    ['U', 'V', 'W', 'X', 'Y']
                ]
            res=client.post('/check-guess', json={'guess': 'possible'})
            data=res.get_json()

            self.assertEqual(res.status_code, 200)
            self.assertEqual(data['result'], "not-on-board")


    def test_game_over(self):
        with app.test_client() as client:
            res=client.post('/game-over', json={'score': 3, 'plays': 6})
            data=res.get_json()

            self.assertEqual(res.status_code, 200)
            self.assertEqual(data['score'], 3)
            self.assertEqual(data['plays'], 6)

