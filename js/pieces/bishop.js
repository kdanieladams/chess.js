import { SIDES, PIECETYPE, FILES } from '../globals.js';
import { Piece } from './_piece.js';

/**
 * Bishop
 */
export class Bishop extends Piece {
    value = 325;

    constructor(side) {
        super(side, PIECETYPE.bishop);

        // init possible starting locations
        this._possibleMoves = [
            'c1', 'f1', 'c8', 'f8'
        ];
    }

    canMove() {
        // ...
        return [];
    }
}