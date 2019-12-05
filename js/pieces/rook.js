import { SIDES, PIECETYPE, FILES } from '../globals.js';
import { Piece } from './_piece.js';

/**
 * Rook
 */
export class Rook extends Piece {
    hasMoved = false;

    constructor(side) {
        super(side, PIECETYPE.rook);

        // init possible starting locations
        this._possibleMoves = [
            'a1', 'h1', 'a8', 'h8'
        ];
    }

    canMove() {
        // ...
        return [];
    }

    move(cell) {
        if(super.move(cell))
            this.hasMoved = true;

        return;
    }

    moveEffects() {
        if(this._cell != null && !this.hasMoved) {
            // team can no longer castle on this side...
            var file = this._cell.file;
            
        }

        return;
    }
}