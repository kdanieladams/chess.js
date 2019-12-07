import { SIDES } from './globals.js';
import { Board } from './board.js';
import { Match } from './match.js';
import { Team } from './team.js';

/**
 * Chess.js
 */
var match = null;
var canvas = document.getElementById('chess_board');
var ctx = canvas.getContext('2d');

function init() {
    // setup the match
    match = new Match(new Board(), new Team(SIDES.white), new Team(SIDES.black));
    
    // draw the board
    match.board.draw(ctx, canvas.width);
    
    console.log('init complete...');
}

function testMove() {
    var team = match.whiteTeam;
    var board = match.board;
    var pawn = team.pieces[4]; // white pawn on E2

    pawn.canMove(board); // calc possible moves
    pawn.move(board.getCellByCoord('e4')); // actually move
    board.draw(ctx, canvas.width);

    console.log('testMove complete...');
}

/**
 * Start
 */
init();
testMove();

