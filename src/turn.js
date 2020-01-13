import { SIDES } from './globals.js';
import { Piece } from './pieces/_piece.js';

/**
 * Turn
 * 
 * Half-turn or action of one team (white OR black).
 */
export class Turn {
    captures = new Array();
    movedPiece = null;
    side = SIDES.white;
    startCoord = '';
    endCoord = '';

    constructor(piece, moveTo) {
        if(piece instanceof Piece
            && (typeof(moveTo) == 'string' && moveTo.length == 2))
        {
            this.movedPiece = piece;
            this.side = this.movedPiece.side;
            this.startCoord = this.movedPiece.getCoord();
            this.endCoord = moveTo;
        }
    }
}
