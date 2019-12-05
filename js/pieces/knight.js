import { SIDES, PIECETYPE, FILES } from '../globals.js';
import { Piece } from './_piece.js';

/**
 * Knight
 */
export class Knight extends Piece {
    constructor(side) {
        super(side, PIECETYPE.knight);

        // init possible starting locations
        this._possibleMoves = [
            'g1', 'b1', 'g8', 'b8'
        ];
    }

    canMove() {
        // ...
        return [];
    }
}