import { SIDES } from './globals.js';
import { Board } from './board.js';
import { Match } from './match.js';
import { Team } from './team.js';

/**
 * Program
 */
var match = null;

function init() {
    // setup the match
    match = new Match(new Board(), new Team(SIDES.white), new Team(SIDES.black));
    console.log('init complete...');
    testMove();
}

function testMove() {
    var team = match.whiteTeam;
    var board = match.board;
    var pawn = team.pieces[4]; // white pawn on E2

    pawn.canMove(); // calc possible moves
    pawn.move(board.getCellByCoord('e4')); // actually move

    console.log('testMove complete...');
}

/**
 * Start
 */
init();
