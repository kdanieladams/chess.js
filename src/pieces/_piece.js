import { CAPITALIZE, FILES, PIECESPRITEWIDTH, PIECETYPE, SIDES } from '../globals.js';
import { Board } from '../board.js';
import { Cell } from '../cell.js';

/**
 * Piece
 * 
 * Contains properties of a piece, and getters for making the enums make sense.
 * Functions as an abstract class for all the pieces.
 */
export class Piece {
    // public
    active = false;
    captured = false;
    side = SIDES.white;
    type = PIECETYPE.pawn;
    value = 100;

    // private
    _cell = null;
    _forward = 1;
    possibleMoves = new Array();
    
    constructor(side, type) {
        this.side = side;
        this.type = type;
        
        this._forward = this.side == SIDES.white ? 1 : -1; // -1 = down, 1 = up
    }

    _iterateMoves(board, coord, incFile, incRank) {
        var moves = new Array();

        while(board.cellInBounds(coord)) {
            let file = FILES[coord[0]];
            let rank = parseInt(coord[1]);
            let nextFile = file + incFile;
            let nextRank = rank + incRank;

            if(coord != this.getCoord())  {
                let cell = board.getCellByCoord(coord);
                
                if(cell.isOccupied()) {
                    if(cell.piece.side != this.side) {
                        moves.push(coord);
                        cell.possibleMove = true;
                    }
                    
                    break;
                }
                
                moves.push(coord);
                cell.possibleMove = true;
            }

            coord = "" + Object.keys(FILES)[nextFile] + (nextRank);
        }

        return moves;
    }

    canMove() {
        console.error("Piece.canMove: canMove has not been implemented!");
    }

    draw(img, ctx, xPos, yPos, cellWidth) {
        var clipX = img.naturalWidth - (this.type * PIECESPRITEWIDTH),
            clipY = this.side == SIDES.white ? 0 : PIECESPRITEWIDTH,
            clipWidth = PIECESPRITEWIDTH,
            clipHeight = PIECESPRITEWIDTH;

        ctx.drawImage(img, clipX, clipY, clipWidth, clipHeight, 
            xPos, yPos, cellWidth, cellWidth);
    }

    getCoord() {
        if(this._cell != null)
            return this._cell.getCoord();

        return "";
    }

    getDiagMoves(board, forward, right) {
        if(board instanceof Board) {
            forward = !!forward;
            right = !!right;
    
            var coord = this.getCoord();
            var incFile = right ? 1 : -1;
            var incRank = (forward ? 1 : -1) * this._forward;
    
            return this._iterateMoves(board, coord, incFile, incRank);
        }
        
        console.error("Piece.getDiagMoves: Invalid board");
        return false;
    }

    getPerpMoves(board, vertical, positive) {
        if(board instanceof Board) {
            vertical = !!vertical;
            positive = !!positive;

            var coord = this.getCoord();
            var incFile = !vertical ? (positive ? 1 : -1) : 0;
            var incRank = vertical ? (positive ? 1 : -1) * this._forward : 0;

            return this._iterateMoves(board, coord, incFile, incRank);
        }

        console.error("Piece.getPerpMoves: Invalid board");
        return false;
    }

    getPieceType() {
        return CAPITALIZE(Object.keys(PIECETYPE)[this.type]);
    }

    getSide() {
        return CAPITALIZE(Object.keys(SIDES)[this.side]);
    }

    move(cell) {
        // check if I can be moved to this cell...
        if(cell instanceof Cell && this.possibleMoves.includes(cell.getCoord())) {
            if(this._cell != null) 
                this._cell.piece = null;
            
            this._cell = cell;
            this._cell.piece = this;
            this.possibleMoves = [];

            return true;
        }

        return false;
    }

}