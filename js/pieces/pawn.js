import { SIDES, PIECETYPE, FILES } from '../globals.js';
import { Piece } from './_piece.js';

/**
 * Pawn
 * 
 * Contains properties and methods specific to a pawn.
 */
export class Pawn extends Piece {
    hasMoved = false;
    value = 100;

    constructor(side) {
        super(side, PIECETYPE.pawn);

        // init possible starting locations
        this._possibleMoves = [
            'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
            'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
        ];
    }

    canMove() {
        var file = this._cell.file;
        var rank = this._cell.rank;

        // can move forward 1 sq
        var move1sq = "" + this._cell.getFile() + (rank + this._forward);
        // on first move, can move 2 sqs
        var move2sq = "" + this._cell.getFile() + (rank + this._forward + this._forward);

        // TODO: test if these possibilities are in-bounds and unobstructed

        // can only attack diagonally
        var diagL = "" + Object.keys(FILES)[file - 1] + (rank + this._forward);
        var diagR = "" + Object.keys(FILES)[file + 1] + (rank + this._forward);

        // TODO: test if diagonal possibilities are occupied or not

        this._possibleMoves.push(move1sq, move2sq, diagL, diagR);

        return this._possibleMoves;
    }

    move(cell) {
        if(super.move(cell) && (
            (this.side == SIDES.black && cell.rank != 7) 
            || (this.side == SIDES.white && cell.rank != 2)
        ))
        {
            this.hasMoved = true;
        }
            

        return;
    }
}