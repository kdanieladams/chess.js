import { SIDES } from './globals.js';
import { Pawn } from './pieces/pawn.js';
import { Rook } from './pieces/rook.js';
import { Knight } from './pieces/knight.js';
import { Bishop } from './pieces/bishop.js';
import { Queen } from './pieces/queen.js';
import { King } from './pieces/king.js';

/**
 * Team
 * 
 * Contains properties of a team, and getters for making the enums make sense.  Also initializes
 * the pieces and side for a team.
 */
export class Team {
    captures = new Array();
    castleKingSide = true;
    castleQueenSide = true;
    pieces = new Array();
    side = SIDES.white;
    
    constructor(isWhite) { 
        this.side = isWhite && isWhite >= 1 ? SIDES.white : SIDES.black;
        
        // pawns
        this.pieces.push(new Pawn(this.side));   // 0
        this.pieces.push(new Pawn(this.side));   // 1
        this.pieces.push(new Pawn(this.side));   // 2
        this.pieces.push(new Pawn(this.side));   // 3
        this.pieces.push(new Pawn(this.side));   // 4
        this.pieces.push(new Pawn(this.side));   // 5
        this.pieces.push(new Pawn(this.side));   // 6
        this.pieces.push(new Pawn(this.side));   // 7

        // rooks
        this.pieces.push(new Rook(this.side));   // 8
        this.pieces.push(new Rook(this.side));   // 9

        // knights
        this.pieces.push(new Knight(this.side)); // 10
        this.pieces.push(new Knight(this.side)); // 11

        // bishops
        this.pieces.push(new Bishop(this.side)); // 12
        this.pieces.push(new Bishop(this.side)); // 13

        // royalty
        this.pieces.push(new Queen(this.side));  // 14
        this.pieces.push(new King(this.side));   // 15
    }

    getSide() {
        return Object.keys(SIDES)[this.side];
    }
}