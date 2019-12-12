import { CAPITALIZE, FILES, PIECETYPE, SIDES } from './globals.js';
import { Board } from './board.js';
import { Team } from './team.js';

/**
 * Match
 */
export class Match {
    // placeholders for object instances
    board = null;
    team1 = null;
    team2 = null;
    statusCallback = null;

    // full turns for both white & black
    turns = 0;      

    // half turns for either white or black, GameBoard.hisPly in tut
    halfTurns = 0;  

    // half turns made in search tree ??? idfk, GameBoard.ply in tut
    aiTurns = 0;   
    
    // draw if in 50 turns, no pawn has moved and no piece has been captured
    fiftyMove = 0;

    msgs = new Array();

    constructor(board, team1, team2, statusCallback) {
        // verify type of each param
        if(board instanceof Board 
            && team1 instanceof Team 
            && team2 instanceof Team
            && team1.side != team2.side) 
        {
            this.board = board;
            this.team1 = team1;
            this.team2 = team2;

            this.setupPieces(this.team1);
            this.setupPieces(this.team2);

            if(typeof(statusCallback) == 'function') {
                this.statusCallback = statusCallback;
            }

            this.updateStatus("It\'s White\'s turn.");

            return true;
        }

        console.error("Match.constructor: requires an instance of Board and two of Team");
        return false;
    }

    clearPossible() {
        this.board.clearPossible();
        this.team1.clearPossible();
        this.team2.clearPossible();
    }

    click(event) {
        var cell = this.board.getCellByPixels(event.offsetX, event.offsetY);
        var activeTeam = this.team1.side == this.whosTurn() ? this.team1 : this.team2;

        if(activeTeam.activePiece == null 
            && cell.isOccupied() 
            && cell.piece.side == activeTeam.side) 
        {
            let piece = cell.piece;

            activeTeam.activePiece = piece;
            piece.canMove(this.board);
            this.board.draw();
        }
        else if(activeTeam.activePiece != null && cell.possibleMove) {
            let msg = CAPITALIZE(activeTeam.getSide()) + " moves " 
                + CAPITALIZE(activeTeam.activePiece.getPieceType()) + " ("
                + activeTeam.activePiece.getCoord().toUpperCase() + ") to "
                + cell.getCoord().toUpperCase() + ".";
            
            this.updateStatus(msg);

            if(activeTeam.activePiece.type == PIECETYPE.king
                && !activeTeam.activePiece.hasMoved) 
            {
                activeTeam.activePiece.move(cell, this.board);
            }
            else {
                activeTeam.activePiece.move(cell);
            }
            
            this.clearPossible();
            this.board.draw();
            this.finishTurn();
        }
        else {
            this.clearPossible();
            this.board.draw();
        }
    }

    finishTurn() {
        this.halfTurns++;

        if(this.halfTurns % 2 == 0)
            this.turns++;

        let team = this.team1.side == this.whosTurn() ? this.team1 : this.team2;
        this.updateStatus("It\'s " + CAPITALIZE(team.getSide()) + "\'s turn.");
    }

    getBlackTeam() {
        return this.team1.side == SIDES.black ? this.team1 : this.team2;
    }

    getWhiteTeam() {
        return this.team1.side == SIDES.white ? this.team1 : this.team2;
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

    updateStatus(msg) {
        this.msgs.push(msg);

        if(this.statusCallback) {
            let string = "";
            
            for(let i = 0; i < this.msgs.length; i++) {
                if(i == this.msgs.length - 1) {
                    string += "<span class='topMsg'>" + this.msgs[i] + "</span><br>\n";
                    continue;
                }

                string += this.msgs[i] + "<br>\n";
            }
            
            return this.statusCallback(string);
        }

        return;
    }

    whosTurn() {
        return this.halfTurns % 2 ? SIDES.black : SIDES.white;
    }
}
