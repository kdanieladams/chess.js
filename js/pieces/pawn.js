import { SIDES, PIECETYPE, FILES } from '../globals.js';
import { Piece } from './_piece.js';

/**
 * Pawn
 * 
 * Contains properties and methods specific to a pawn.
 */
export class Pawn extends Piece {
    hasMoved = false;

    constructor(side) {
        super(side, PIECETYPE.pawn);

        // init possible starting locations
        this._possibleMoves = [
            'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
            'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
        ];
    }

    canMove() {
        var possibleMoves = [];
        var file = this._cell.file;
        var rank = this._cell.rank;

        // can it attack? is there a piece diagonally in front of it to either side?
        var canAttack = false;
        
        possibleMoves = ['d1', 'e1', 'f1'];

        return possibleMoves;
    }

    move(cell) {
        if(super.move(cell))
            this.hasMoved = true;

        return;
    }
}