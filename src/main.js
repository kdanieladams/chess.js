import { FILES, NUMFILES, NUMRANKS, SIDES } from './globals.js';
import { Board } from './board.js';
import { Match } from './match.js';
import { Team } from './team.js';

/**
 * Chess.js
 * 
 * Main thread for the game.
 */

// Runtime Globals
var match = null;

// HTML Elements
var canvas      = document.getElementById('chess_board');
var piecesImg   = document.getElementById('pieces_img');
var scoreBox    = document.getElementById('score_box');
var statusBox   = document.getElementById('status_box');
var undoBtn     = document.getElementById('undo_btn');

/**
 * Global Functions
 */
function fillBoardAxes() {
    var fileRow = document.getElementById('file_row');
    var rankCol = document.getElementById('rank_col');

    // fill file axis
    for(let i = 0; i < NUMFILES; i++) {
        let elm = '<div class="file">';
        elm += Object.keys(FILES)[i];
        elm += '</div>\n';
        fileRow.innerHTML += elm;
    }

    // fill rank axis
    for(let i = 0; i < NUMRANKS; i++) {
        let elm = '<div class="rank">';
        elm += NUMRANKS - i;
        elm += '</div>\n';
        rankCol.innerHTML += elm;
    }
}

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
    undoBtn.addEventListener('click', function(e){
        match.undoMove(e);
    });

    fillBoardAxes();
    updateScore();
    
    console.log('init complete...');
}

/**
 * Start
 */
window.addEventListener('load', function(e){
    init();
});
