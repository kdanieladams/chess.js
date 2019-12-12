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
var pieces_img = document.getElementById('pieces_img');
var statusBox = document.getElementById('status_box');

/**
 * Global Functions
 */
function updateStatus(msg) {
    statusBox.innerHTML = msg;
    statusBox.scrollTop = statusBox.scrollHeight;
}

/**
 * Initialization
 */
function init() {
    match = new Match(new Board(canvas, pieces_img), 
        new Team(SIDES.white), 
        new Team(SIDES.black),
        updateStatus);

    match.board.draw();
    canvas.addEventListener('click', function(e){
        match.click(e);
    });
    
    console.log('init complete...');
}

/**
 * Start
 */
window.addEventListener('load', function(e){
    init();
});
