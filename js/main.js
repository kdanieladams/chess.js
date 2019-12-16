import { SIDES } from './globals.js';
import { Board } from './board.js';
import { Match } from './match.js';
import { Team } from './team.js';

/**
 * Chess.js
 * 
 * Main thread for the game.
 */

var canvas = document.getElementById('chess_board');
var match = null;
var piecesImg = document.getElementById('pieces_img');
var scoreBox = document.getElementById('score_box');
var statusBox = document.getElementById('status_box');

/**
 * Global Functions
 */
function updateScore() {
    var whiteScore = match.team1.side == SIDES.white ? match.team1.getScore() : match.team2.getScore();
    var blackScore = match.team1.side == SIDES.black ? match.team1.getScore() : match.team2.getScore();

    scoreBox.innerHTML = "<span class='teamScore'>White: " + whiteScore + "pts.</span>\n"
        + "<span class='teamScore'>Black: " + blackScore + "pts.</span>";
}

function updateStatus(msg) {
    statusBox.innerHTML = msg;
    statusBox.scrollTop = statusBox.scrollHeight;
}

/**
 * Initialization
 */
function init() {
    match = new Match(new Board(canvas, piecesImg), 
        new Team(SIDES.white), 
        new Team(SIDES.black),
        updateStatus, updateScore);

    match.board.draw();
    canvas.addEventListener('click', function(e){
        match.click(e);
    });
    updateScore();
    
    console.log('init complete...');
}

/**
 * Start
 */
window.addEventListener('load', function(e){
    init();
});
