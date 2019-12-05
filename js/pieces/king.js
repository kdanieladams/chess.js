import { SIDES, PIECETYPE, FILES } from '../globals.js';
import { Piece } from './_piece.js';

/**
 * King
 */
export class King extends Piece {
    value = 50000;

    constructor(side) {
        super(side, PIECETYPE.king);

        // init possible starting locations
        this._possibleMoves = [
            'e1', 'e8'
        ];
    }

    canMove() {
        // ...
        return [];
    }
}