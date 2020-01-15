import { FILES, NUMFILES, NUMRANKS, PIECESPRITEWIDTH, SIDES } from './globals.js';
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

function updateCaptures(team) {
    var capElmId = (team.side == SIDES.white ? 'white_captures' : 'black_captures'),
        capElm = document.getElementById(capElmId),
        redux = (canvas.width / NUMFILES) / PIECESPRITEWIDTH,
        spriteWidth = PIECESPRITEWIDTH * redux;

    // clear out the list first
    capElm.innerHTML = "";

    for(let capture of team.captures) {
        let displayElm = document.createElement('div'),
            clipX = -1 * ((piecesImg.naturalWidth * redux) - (capture.type * spriteWidth)),
            clipY = -1 * (capture.side == SIDES.white ? 0 : spriteWidth);
        
        displayElm.style.width = `${spriteWidth}px`;
        displayElm.style.height = `${spriteWidth}px`;
        displayElm.style.backgroundImage = `url(${piecesImg.src})`;
        displayElm.style.backgroundSize = `${piecesImg.naturalWidth * redux}px`;
        displayElm.style.backgroundPosition = `${clipX}px ${clipY}px`;
        displayElm.style.display = 'inline-block';

        capElm.appendChild(displayElm);
    }
}

function updateScore() {
    var scoreBox = document.getElementById('score_box');
    var whiteScore = match.team1.side == SIDES.white ? match.team1.getScore() : match.team2.getScore();
    var blackScore = match.team1.side == SIDES.black ? match.team1.getScore() : match.team2.getScore();

    scoreBox.innerHTML = "<span class='teamScore'>White: " + whiteScore + "pts.</span>\n"
        + "<span class='teamScore'>Black: " + blackScore + "pts.</span>";
}

function updateStatus(msg) {
    var statusBox = document.getElementById('status_box');

    statusBox.innerHTML = msg;
    statusBox.scrollTop = statusBox.scrollHeight;
}

/**
 * Initialization
 */
function init() {
    var undoBtn = document.getElementById('undo_btn');

    match = new Match(new Board(canvas, piecesImg), 
        new Team(SIDES.white), 
        new Team(SIDES.black),
        updateStatus, updateScore, updateCaptures);

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
