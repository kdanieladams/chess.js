import { FILES, PIECETYPE, SIDES } from './globals.js';

/**
 * Match
 * 
 * Tracks properties and indexes of a match.  Consists of stuff from the tut...mainly.
 * My take is that alot of this has to do with the AI engine, which I may or may not be 
 * fully implementing.
 */
export class Match {
    // placeholders for object instances
    board = null;
    whiteTeam = null;
    blackTeam = null;

    // full turns for both white & black
    turns = 0;      

    // half turns for either white or black, GameBoard.hisPly in tut
    halfTurns = 0;  

    // half turns made in search tree ??? idfk, GameBoard.ply in tut
    aiTurns = 0;   
    
    // draw if in 50 turns, no pawn has moved and no piece has been captured
    fiftyMove = 0;

    constructor(board, whiteTeam, blackTeam) {
        // TODO: verify type of each param
        this.board = board;
        this.whiteTeam = whiteTeam;
        this.blackTeam = blackTeam;

        this.init();
    }

    init() {
        if(this.whiteTeam != null && this.blackTeam != null && this.board != null) {
            this.setupPieces(this.whiteTeam);
            this.setupPieces(this.blackTeam);
            return;
        }

        console.error('Match.init: called before instantiation.');
    }

    setupPieces(team) {
        var board = this.board;
        var filesArr = Object.keys(FILES);
        var pawnRank = team.side == SIDES.white ? "2" : "7";
        var rank = team.side == SIDES.white ? "1" : "8";
        
        for(var i = 0; i < team.pieces.length; i++) {
            var piece = team.pieces[i];

            // pawns
            if(i < filesArr.length && piece.type == PIECETYPE.pawn)
                piece.move(board.getCellByCoord(filesArr.find(key => FILES[key] == i) + pawnRank));

            // rooks
            else if(i == 8) piece.move(board.getCellByCoord("a" + rank));
            else if(i == 9) piece.move(board.getCellByCoord("h" + rank));

            // knights
            else if(i == 10) piece.move(board.getCellByCoord("b" + rank));
            else if(i == 11) piece.move(board.getCellByCoord("g" + rank));

            // bishops
            else if(i == 12) piece.move(board.getCellByCoord("c" + rank));
            else if(i == 13) piece.move(board.getCellByCoord("f" + rank));

            // royalty
            else if(i == 14) piece.move(board.getCellByCoord("d" + rank));
            else if(i == 15) piece.move(board.getCellByCoord("e" + rank));
        }
    }

    whosTurn() {
        return this.halfTurns % 2 ? SIDES.black : SIDES.white;
    }
}
