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
}

/**
 * Start
 */
init();
