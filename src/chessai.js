import { SIDES } from './globals.js';
import { Board } from './board.js';
import { Team } from './team.js';

/**
 * ChessAi
 * 
 * Automated tasks and decision making methods.
 */
export class ChessAi {
    board = null;

    constructor(board) {
        if(board instanceof Board){
            this.board = board;
            return true;
        }

        console.error("ChessAi.constructor: requires an instance of Board");
        return false;
    }

    detectCheck(kingCoord, assaultTeam) {
        if(!this.board.cellInBounds(kingCoord)) {
            console.error("ChessAi.detectCheck: invalid kingCoord");
            return false;
        }
        if(!(assaultTeam instanceof Team)) {
            console.error("ChessAi.detectCheck: invalid assaultTeam");
            return false;
        }

        for(let i = 0; i < assaultTeam.pieces.length; i ++){
            let piece = assaultTeam.pieces[i];
            if(!piece.captured) {
                piece.canMove(this.board);
                if(piece.possibleMoves.includes(kingCoord)) {
                    return true;
                }
            }
        }

        return false;
    }
}
