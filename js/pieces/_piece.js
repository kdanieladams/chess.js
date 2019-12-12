import { FILES, PIECESPRITEWIDTH, PIECETYPE, SIDES } from '../globals.js';
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
    side = SIDES.white;
    type = PIECETYPE.pawn;
    value = 100;
    active = false;

    // private
    _cell = null;
    _forward = 1;
    _possibleMoves = new Array();
    _slideDiag = false;
    _slideVertHoriz = false;
    
    constructor(side, type) {
        this.side = side;
        this.type = type;
        
        this._forward = this.side == SIDES.white ? 1 : -1; // -1 = down, 1 = up
        this._slideDiag = (this.type == PIECETYPE.bishop || this.type == PIECETYPE.queen);
        this._slideVertHoriz = (this.type == PIECETYPE.rook || this.type == PIECETYPE.queen);
    }

    canMove() {
        console.error("Piece.canMove: canMove has not been implemented!");
    }

    draw(img, ctx, xPos, yPos, cellWidth) {
        var clipX = (img.naturalWidth - PIECESPRITEWIDTH) - (this.type * PIECESPRITEWIDTH) + PIECESPRITEWIDTH,
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
    
            return this.iterateMoves(board, coord, incFile, incRank);
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

            return this.iterateMoves(board, coord, incFile, incRank);
        }

        console.error("Piece.getPerpMoves: Invalid board");
        return false;
    }

    getPieceType() {
        return Object.keys(PIECETYPE)[this.type];
    }

    getSide() {
        return Object.keys(SIDES)[this.side];
    }

    iterateMoves(board, coord, incFile, incRank) {
        var moves = new Array();

        while(board.cellInBounds(coord)) {
            let file = FILES[coord[0]];
            let rank = parseInt(coord[1]);

            if(coord != this.getCoord())  {
                let cell = board.getCellByCoord(coord);
                
                if(cell.isOccupied()) {
                    if(cell.piece.getSide() != this.getSide()) {
                        moves.push(coord);
                        cell.possibleMove = true;
                    }
                    
                    break;
                }
                
                moves.push(coord);
                cell.possibleMove = true;
            }

            coord = "" + Object.keys(FILES)[file + incFile] + (rank + incRank);
        }

        return moves;
    }

    move(cell) {
        // check if I can be moved to this cell...
        if(cell instanceof Cell && this._possibleMoves.includes(cell.getCoord())) {
            if(this._cell != null) 
                this._cell.piece = null;

            // TODO: handle captures
                        
            this._cell = cell;
            this._cell.piece = this;
            this._possibleMoves = [];

            return true;
        }

        return false;
    }

}