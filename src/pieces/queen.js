import { PIECETYPE } from '../globals.js';
import { Board } from '../board.js';
import { Piece } from './_piece.js';

/**
 * Queen
 */
export class Queen extends Piece {
    value = 1000;

    constructor(side) {
        super(side, PIECETYPE.queen);

        // init possible starting locations
        this.possibleMoves = [
            'd1', 'd8'
        ];
    }

    canMove(board) {
        if(board instanceof Board) {
            this.active = true;
            this.possibleMoves = [];

            // can slide diagonally            
            this.possibleMoves = this.possibleMoves.concat(
                this.getDiagMoves(board, true, false),  // forward and left
                this.getDiagMoves(board, true, true),   // forward and right
                this.getDiagMoves(board, false, false), // backward and left
                this.getDiagMoves(board, false, true)   // backward and right
            );

            // can slide up-down-left-right until end of board
            this.possibleMoves = this.possibleMoves.concat(
                this.getPerpMoves(board, true, true),   // vertical up
                this.getPerpMoves(board, true, false),  // vertical down
                this.getPerpMoves(board, false, true),  // horizontal right
                this.getPerpMoves(board, false, false)  // horizontal left
            );

            return this.possibleMoves;
        }
        
        console.error("Queen.canMove: Invalid board");
        return false;
    }
}