import { FILES, PIECETYPE, SIDES } from '../globals.js';
import { Board } from '../board.js';
import { Piece } from './_piece.js';

/**
 * King
 */
export class King extends Piece {
    hasMoved = false;
    origCoord = [
        'e1', 'e8'
    ];
    value = 50000;

    constructor(side) {
        super(side, PIECETYPE.king);

        // init possible starting locations
        this.possibleMoves = this.origCoord;
    }

    canMove(board) {
        if(board instanceof Board) {
            var file = this._cell.file;
            var rank = this._cell.rank;
            var testMoves = new Array();

            this.possibleMoves = [];

            // can castle king-side?
            if(!this.hasMoved 
                && !board.getCellByCoord('f' + rank).isOccupied()
                && !board.getCellByCoord('g' + rank).isOccupied()
                && board.getCellByCoord('h' + rank).isOccupied()) 
            {
                let rook = board.getCellByCoord('h' + rank).piece;

                if(rook.type == PIECETYPE.rook && !rook.hasMoved) {
                    let castleCell = board.getCellByCoord('g' + rank);
                    
                    castleCell.possibleMove = true;
                    castleCell.castleable = true;
                    this.possibleMoves.push(castleCell.getCoord());
                }
            }

            // can castle queen-size?
            if(!this.hasMoved 
                && !board.getCellByCoord('d' + rank).isOccupied()
                && !board.getCellByCoord('c' + rank).isOccupied()
                && !board.getCellByCoord('b' + rank).isOccupied()
                && board.getCellByCoord('a' + rank).isOccupied())
            {
                let rook = board.getCellByCoord('a' + rank).piece;

                if(rook.type == PIECETYPE.rook && !rook.hasMoved) {
                    let castleCell = board.getCellByCoord('c' + rank);
                    
                    castleCell.possibleMove = true;
                    castleCell.castleable = true;
                    this.possibleMoves.push(castleCell.getCoord());
                }
            }

            // can move 1sq in any direction
            testMoves.push("" + Object.keys(FILES)[file + 1] + rank);
            testMoves.push("" + Object.keys(FILES)[file - 1] + rank);
            testMoves.push("" + Object.keys(FILES)[file] + (rank + 1));
            testMoves.push("" + Object.keys(FILES)[file] + (rank - 1));
            testMoves.push("" + Object.keys(FILES)[file + 1] + (rank + 1));
            testMoves.push("" + Object.keys(FILES)[file - 1] + (rank - 1));
            testMoves.push("" + Object.keys(FILES)[file - 1] + (rank + 1));
            testMoves.push("" + Object.keys(FILES)[file + 1] + (rank - 1));
            
            for(let i = 0; i < testMoves.length; i++) {
                let testMove = testMoves[i];

                if(board.cellInBounds(testMove)) {
                    let cell = board.getCellByCoord(testMove);
                    if(cell.isOccupied()) {
                        if(cell.piece.side != this.side) {
                            this.possibleMoves.push(testMove);
                            cell.possibleMove = true;
                        }

                        continue;
                    }
                    
                    this.possibleMoves.push(testMove);
                    cell.possibleMove = true;
                }
            }

            return this.possibleMoves;
        }

        console.error("King.canMove: invalid board");
        return false;
    }

    move(cell, board) {
        if(super.move(cell)) {
            if(cell.castleable && !this.hasMoved) {
                let rookFile = cell.file == FILES.c ? 'a' : 'h';
                let rank = cell.rank;
                let rookDest = (cell.file == FILES.c ? 'd' : 'f') + rank;
                let rook = board.getCellByCoord(rookFile + rank).piece;

                rook.possibleMoves.push(rookDest);
                rook.move(board.getCellByCoord(rookDest));
            }

            if(cell.file != FILES.e
                || (this.side == SIDES.black && cell.rank != 8)
                || (this.side == SIDES.white && cell.rank != 1)) 
            {
                // team can no longer castle
                this.hasMoved = true;
            }
        }

        return;
    }
}
