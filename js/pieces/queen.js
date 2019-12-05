import { SIDES, PIECETYPE, FILES } from '../globals.js';
import { Piece } from './_piece.js';

/**
 * Queen
 */
export class Queen extends Piece {
    value = 1000;

    constructor(side) {
        super(side, PIECETYPE.queen);

        // init possible starting locations
        this._possibleMoves = [
            'd1', 'd8'
        ];
    }

    canMove() {
        // ...
        return [];
    }
}