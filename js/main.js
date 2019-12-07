import { SIDES } from './globals.js';
import { Board } from './board.js';
import { Match } from './match.js';
import { Team } from './team.js';

/**
 * Chess.js
 * 
 * Main thread for the game.
 */
var advBtn = document.getElementById('advance_btn');
var canvas = document.getElementById('chess_board');
var match = null;
var step = 0;

function init() {
    match = new Match(new Board(canvas), new Team(SIDES.white), new Team(SIDES.black));
    match.board.draw();
    
    console.log('init complete...');
}

function testMove() {
    var team = match.whiteTeam;
    var board = match.board;
    var pawn = team.pieces[4]; // white pawn on E2

    pawn.canMove(board); // calc possible moves
    pawn.move(board.getCellByCoord('e4')); // actually move
    board.draw();

    console.log('testMove complete...');
}

function testMove2() {
    var team = match.blackTeam;
    var board = match.board;
    var pawn = team.pieces[3];

    pawn.canMove(board);
    pawn.move(board.getCellByCoord('d5'));
    board.draw();

    console.log('testMove2 complete...');
}

function advanceTest(e) {
    if(step == 0)
        testMove();
    else if(step == 1) {
        testMove2();
        advBtn.disabled = true;
    }
    else
        return;

    step++;
}

/**
 * Start
 */
init();
advBtn.onclick = advanceTest;
