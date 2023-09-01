from flask import Flask, jsonify, request, render_template, redirect, flash, session
from random import choice
from flask_debugtoolbar import DebugToolbarExtension
from unittest import TestCase
app=Flask(__name__, static_folder='static')

app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

from boggle import Boggle

boggle_game = Boggle()

@app.route('/')
def show_board():
    ''' Show the board '''
    board=boggle_game.make_board()
    session['board']=board


    return render_template('home.html', board=board)

@app.route('/check-guess', methods=['POST'])
def check_guess():
    ''' Check if the word is in words.txt and on the board '''
    guess=request.json.get('guess')
    if guess:
        validation_result=boggle_game.check_valid_word(session['board'], guess)
        return jsonify({'result': validation_result})
    return jsonify({'result': 'error'})

@app.route('/game-over', methods=['POST'])
def game_over():
    ''' Get the score '''
    score=request.json.get('score')
    return jsonify({'message': 'Score and plays updated successfully'})
