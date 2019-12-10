import { SIDES } from './globals.js';
import { Board } from './board.js';
import { Match } from './match.js';
import { Team } from './team.js';

/**
 * Chess.js
 * 
 * Main thread for the game.
 */

// runtime globals
var canvas = document.getElementById('chess_board');
var match = null;
var pieces_img = document.getElementById('pieces_img');

// testing devices
var advBtn = document.getElementById('advance_btn');
var statusBox = document.getElementById('test_status');
var step = 0;

function init() {
    match = new Match(new Board(canvas, pieces_img), new Team(SIDES.white), new Team(SIDES.black));
    match.board.draw();
    
    console.log('init complete...');
}

function updateStatus(msg) {
    statusBox.innerHTML = msg;
}

function advanceTest(e) {
    var whitePawn = match.getWhiteTeam().pieces[4];
    var whiteKnight = match.getWhiteTeam().pieces[10];
    var blackPawn = match.getBlackTeam().pieces[3];
    var board = match.board;

    if(step == 0){
        whitePawn.canMove(board);
        board.draw();
        board.clearPossible();
        updateStatus("White Pawn (E2): get possible moves");
    }
    else if(step == 1) {
        whitePawn.move(board.getCellByCoord('e4'));
        board.draw();
        updateStatus("White Pawn (E2): move to E4");
    }
    else if(step == 2) {
        blackPawn.canMove(board);
        board.draw();
        board.clearPossible();
        updateStatus("Black Pawn (D7): get possible moves");
    }
    else if(step == 3) {
        blackPawn.move(board.getCellByCoord('d5'));
        board.draw();
        updateStatus("Black Pawn (D7): move to D5");
    }
    else if(step == 4) {
        whitePawn.canMove(board);
        board.draw();
        board.clearPossible();
        updateStatus("White Pawn (E4): get possible moves");
    }
    else if(step == 5) {
        whiteKnight.canMove(board);
        board.draw();
        updateStatus("White Knight (B1): get possible moves");
        board.clearPossible();
    }
    else if(step == 6) {
        whiteKnight.move(board.getCellByCoord('c3'));
        board.draw();
        updateStatus("White Knight (B1): move to C3");
    }
    else if(step == 7) {
        whiteKnight.canMove(board);
        board.draw();
        updateStatus("White Knight (C3): get possible moves");
        board.clearPossible();
    }
    else {
        // do nothing
        advBtn.disabled = true;
        board.draw();
        updateStatus("Test complete.");
        return;
    }

    step++;
}

/**
 * Start
 */
window.onload = function() {
    init();
    advBtn.onclick = advanceTest;
};
