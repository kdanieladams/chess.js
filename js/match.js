import { CAPITALIZE, FILES, PIECETYPE, SIDES } from './globals.js';
import { Action } from './action.js';
import { Board } from './board.js';
import { Team } from './team.js';
import { Turn } from './turn.js';

/**
 * Match
 */
export class Match {
    // placeholders for object instances
    board = null;
    team1 = null;
    team2 = null;
    statusCallback = null;

    // internal collections
    turns = new Array();
    msgs = new Array();

    // half turns for either white or black
    halfTurns = 0;

    // half turns made in search tree ??? idfk, GameBoard.ply in tut
    // aiTurns = 0;   
    
    // draw if in 50 turns, no pawn has moved and no piece has been captured
    fiftyMove = 0;

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
                + CAPITALIZE(activeTeam.activePiece.getPieceType()) + "("
                + activeTeam.activePiece.getCoord().toUpperCase() + ") to "
                + cell.getCoord().toUpperCase() + ".";
            
            this.updateStatus(msg);
            this.startTurn(activeTeam.activePiece, cell);

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
        var team = this.team1.side == this.whosTurn() ? this.team1 : this.team2;
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
                piece.move(board.getCellByCoord(filesArr[i] + pawnRank));

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

    startTurn(piece, cell) {
        var action = new Action(piece, cell.getCoord());
        var activeTurn = this.turns[this.turns.length - 1];
        
        if(this.whosTurn() == SIDES.white) {
            this.turns.push(new Turn(action));
            activeTurn = this.turns[this.turns.length - 1];
        }
        else {
            activeTurn.blackAction = action;
        }

        // handle captures
        if(cell.isOccupied()) {
            let activeTeam = this.whosTurn() == this.team1.side ? this.team1 : this.team2;
            let notActiveSide = activeTeam.side == this.team1.side ? this.team2.getSide() : this.team1.getSide();
            let msg = CAPITALIZE(activeTeam.getSide()) + " captures " 
                + CAPITALIZE(notActiveSide) + " " + CAPITALIZE(cell.piece.getPieceType())
                + "(" + cell.getCoord().toUpperCase() + ") \+" + cell.piece.value + "pts.";
            let pieceCopy = null; 

            this.updateStatus(msg);
            cell.piece.captured = true;
            pieceCopy = Object.assign({}, cell.piece);
            activeTurn.captures.push(pieceCopy);
            activeTeam.captures.push(pieceCopy);
        }

        this.halfTurns++;
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
