from flask import Flask, request, render_template, redirect, flash, session
from random import choice
from flask_debugtoolbar import DebugToolbarExtension
from unittest import TestCase
app=Flask(__name__)

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