import { SIDES, PIECETYPE, FILES } from '../globals.js';
import { Piece } from './_piece.js';

/**
 * Rook
 */
export class Rook extends Piece {
    hasMoved = false;
    value = 550;

    constructor(side) {
        super(side, PIECETYPE.rook);

        // init possible starting locations
        this._possibleMoves = [
            'a1', 'h1', 'a8', 'h8'
        ];
    }

    canMove() {
        // can slide up & down until end of board
        // can slide left & right until end of board
        // cannot jump other pieces on team
        // encountering an opponent piece will halt forward movement
        return [];
    }

    move(cell) {
        var startFile = this._cell ? this._cell.file : null;

        if(super.move(cell)) {
            if((cell.file != FILES.a && cell.file != FILES.h)
                || (this.side == SIDES.black && cell.rank != 8)
                || (this.side == SIDES.white && cell.rank != 1)) 
            {
                // TODO: team can no longer castle on this side...
                this.hasMoved = true;
            }
        }

        return;
    }
}
