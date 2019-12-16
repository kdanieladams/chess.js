import { SIDES } from './globals.js';
import { Piece } from './pieces/_piece.js';

/**
 * Action
 * 
 * Object to store properties of an action for rolling-back turns
 * and logging events during the match.
 */
export class Action {
    side = SIDES.white;
    movedPiece = null;
    startCoord = '';
    endCoord = '';

    constructor(piece, moveTo) {
        if(piece instanceof Piece
            && (typeof(moveTo) == 'string' && moveTo.length == 2))
        {
            this.movedPiece = piece;
            this.side = this.movedPiece.side;
            
            // TODO: verify moveTo coord is in-bounds...
            this.startCoord = this.movedPiece.getCoord();
            this.endCoord = moveTo;
        }
    }
}
