import { SIDES, PIECETYPE, FILES } from '../globals.js';
import { Board } from '../board.js';
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

    canMove(board) {
        if(board instanceof Board) {
            var file = this._cell.file;
            var rank = this._cell.rank;

            this._possibleMoves = [];

            // can always move forward 1 sq
            var mv1sq = "" + this._cell.getFile() + (rank + this._forward);
            if(board.cellInBounds(mv1sq)) {
                var cell = board.getCellByCoord(mv1sq);
                if(!cell.isOccupied()) {
                    this._possibleMoves.push(mv1sq);
                }
            }

            // on first move, can move 2 sqs
            var mv2sq = "" + this._cell.getFile() + (rank + this._forward + this._forward);
            if(!this.hasMoved && board.cellInBounds(mv2sq)) {
                var cell = board.getCellByCoord(mv2sq);
                if(!cell.isOccupied()) {
                    this._possibleMoves.push(mv2sq);
                }
            }

            // can only attack diagonally
            var oppSide = this.side == SIDES.white ? SIDES.black : SIDES.white;
            var diagL = "" + Object.keys(FILES)[file - 1] + (rank + this._forward);
            if(board.cellInBounds(diagL)) {
                var cell = board.getCellByCoord(diagL);
                if(cell.isOccupied() && cell.piece.side == oppSide) {
                    this._possibleMoves.push(diagL);
                }
            }

            var diagR = "" + Object.keys(FILES)[file + 1] + (rank + this._forward);
            if(board.cellInBounds(diagR)) {
                var cell = board.getCellByCoord(diagR);
                if(cell.isOccupied() && cell.piece.side == oppSide) {
                    this._possibleMoves.push(diagR);
                }
            }

            return this._possibleMoves;
        }
     
        console.error("Pawn.canMove: Invalid board");
        return false;
    }

    move(cell) {
        if(super.move(cell)) {
            if((this.side == SIDES.black && cell.rank != 7) 
                || (this.side == SIDES.white && cell.rank != 2)) 
            {
                this.hasMoved = true;
            }
        }

        return;
    }
}
