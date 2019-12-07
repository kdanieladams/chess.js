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

// testing devices
var advBtn = document.getElementById('advance_btn');
var statusBox = document.getElementById('test_status');
var step = 0;

function init() {
    match = new Match(new Board(canvas), new Team(SIDES.white), new Team(SIDES.black));
    match.board.draw();
    
    console.log('init complete...');
}

function updateStatus(msg) {
    statusBox.innerHTML = msg;
}

function advanceTest(e) {
    var whitePawn = match.getWhiteTeam().pieces[4];
    var blackPawn = match.getBlackTeam().pieces[3];
    var board = match.board;

    if(step == 0){
        whitePawn.canMove(board);
        console.log(whitePawn._possibleMoves);
        board.draw();
        // clear possible moves from board for next render
        board.cells.forEach(cell => {
            cell.possibleMove = false;
        });
        updateStatus("White Pawn (E5): get possible moves");
    }
    else if(step == 1) {
        whitePawn.move(board.getCellByCoord('e4'));
        board.draw();
        updateStatus("White Pawn (E5): move to E4");
    }
    else if(step == 2) {
        blackPawn.canMove(board);
        console.log(blackPawn._possibleMoves);
        board.draw();
        // clear possible moves from board for next render
        board.cells.forEach(cell => {
            cell.possibleMove = false;
        });
        updateStatus("Black Pawn (D7): get possible moves");
    }
    else if(step == 3) {
        blackPawn.move(board.getCellByCoord('d5'));
        board.draw();
        updateStatus("Black Pawn (D7): move to D5");
    }
    else if(step == 4) {
        whitePawn.canMove(board);
        console.log(whitePawn._possibleMoves);
        board.draw();
        // clear possible moves from board for next render
        board.cells.forEach(cell => {
            cell.possibleMove = false;
        });
        updateStatus("White Pawn (E4): get possible moves");
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
init();
advBtn.onclick = advanceTest;
