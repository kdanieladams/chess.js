import { FILES, PIECETYPE, SIDES } from './globals.js';
import { Board } from './board.js';
import { Cell } from './cell.js';
import { ChessAi } from './chessai.js';
import { Team } from './team.js';
import { Turn } from './turn.js';

/**
 * Match
 */
export class Match {
    // placeholders for object instances & callback functions
    ai = null;
    board = null;
    team1 = null;
    team2 = null;
    captureCallback = null;
    scoreCallback = null;
    statusCallback = null;

    // internal collections
    turns = new Array();
    msgs = new Array();

    // half turns made in search tree ??? idfk, GameBoard.ply in tut
    // aiTurns = 0;   
    
    // draw if in 50 turns, no pawn has moved and no piece has been captured
    fiftyMove = 0;

    constructor(board, team1, team2, statusCallback, scoreCallback, captureCallback) {
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

            if(typeof(statusCallback) == 'function')
                this.statusCallback = statusCallback;
            
            if(typeof(scoreCallback) == 'function')
                this.scoreCallback = scoreCallback;

            if(typeof(captureCallback) == 'function')
                this.captureCallback = captureCallback;

            this.ai = new ChessAi(this.board);
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

        // select a piece to move
        if(cell.isOccupied() && cell.piece.side == activeTeam.side) {
            let piece = cell.piece;

            this.clearPossible();
            activeTeam.activePiece = piece;
            piece.canMove(this.board);
            this.board.draw();
        }
        // move a piece to a possible cell
        else if(activeTeam.activePiece != null && cell.possibleMove) {
            let msg = activeTeam.getSide() + " moves " 
                + activeTeam.activePiece.getPieceType() + "("
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

            this.finishTurn();
            this.clearPossible();
            this.board.draw();
        }
        // de-select a piece to move
        else {
            this.clearPossible();
            this.board.draw();
        }
    }

    finishTurn() {
        var nextTeam = this.team1.side == this.whosTurn() ? this.team1 : this.team2;
        var prevTeam = this.team1.side == this.whosTurn() ? this.team2 : this.team1;

        this.isTeamInCheck(nextTeam, prevTeam);
        this.isTeamInCheck(prevTeam, nextTeam);
        this.updateStatus("It\'s " + nextTeam.getSide() + "\'s turn.");
    }

    getBlackTeam() {
        return this.team1.side == SIDES.black ? this.team1 : this.team2;
    }

    getWhiteTeam() {
        return this.team1.side == SIDES.white ? this.team1 : this.team2;
    }

    isTeamInCheck(defTeam, offTeam) {
        var kingCoord = defTeam.pieces[15].getCoord();

        if(this.ai.detectCheck(kingCoord, offTeam)) {
            defTeam.kingInCheck = true;
            this.updateStatus(defTeam.getSide() + "\'s king is in check!");
            // TODO: check for checkmate
            
            return true;
        }
        else if(defTeam.kingInCheck == true) {
            defTeam.kingInCheck = false;
            this.updateStatus(defTeam.getSide() + "\'s king is no longer in check.");
        }

        return false;
    }

    setupPieces(team) {
        var board = this.board;
        var filesArr = Object.keys(FILES);
        var pawnRank = team.side == SIDES.white ? "2" : "7";
        var rank = team.side == SIDES.white ? "1" : "8";
        
        for(let i = 0; i < team.pieces.length; i++) {
            let piece = team.pieces[i];
            let coord = '';

            // pawns
            if(i < filesArr.length && piece.type == PIECETYPE.pawn)
                coord = filesArr[i] + pawnRank;
            // rooks
            else if(i == 8) coord = "a" + rank;
            else if(i == 9) coord = "h" + rank;
            // knights
            else if(i == 10) coord = "b" + rank;
            else if(i == 11) coord = "g" + rank;
            // bishops
            else if(i == 12) coord = "c" + rank;
            else if(i == 13) coord = "f" + rank;
            // royalty
            else if(i == 14) coord = "d" + rank;
            else if(i == 15) coord = "e" + rank;

            piece.move(board.getCellByCoord(coord));
        }
    }

    startTurn(piece, cell) {
        if(!(cell instanceof Cell)) {
            console.error("Match.startTurn: invalid moveTo cell.");
            return false;
        }

        var activeTurn = new Turn(piece, cell.getCoord());

        // handle captures
        if(cell.isOccupied()) {
            let activeTeam = this.whosTurn() == this.team1.side ? this.team1 : this.team2;
            let notActiveSide = activeTeam.side == this.team1.side ? this.team2.getSide() : this.team1.getSide();
            let msg = activeTeam.getSide() + " captures " 
                + notActiveSide + " " + cell.piece.getPieceType()
                + "(" + cell.getCoord().toUpperCase() + ") \+" + cell.piece.value + "pts.";
            let pieceCopy = null; 

            cell.piece.captured = true;
            pieceCopy = Object.assign({}, cell.piece);
            activeTurn.captures.push(pieceCopy);
            activeTeam.captures.push(pieceCopy);
    
            this.updateCaptures(activeTeam);
            this.updateStatus(msg);
            this.updateScore();
        }

        this.turns.push(activeTurn);
    }

    undoMove() {
        var latestTurn = this.turns[this.turns.length - 1];
        var piece = latestTurn.movedPiece;
        var capturedPiece = latestTurn.captures.length > 0 ? latestTurn.captures[latestTurn.captures.length - 1] : null;

        // move the piece to it's originating position
        piece.possibleMoves = [latestTurn.startCoord];
        piece.move(this.board.getCellByCoord(latestTurn.startCoord));

        // remove hasMoved where applicable
        if(piece.hasMoved != null && piece.origCoord != null 
            && piece.origCoord.includes(latestTurn.startCoord)) 
        {
            piece.hasMoved = false;
        }

        // replace any captured piece
        if(capturedPiece != null) {
            let capTeam = capturedPiece.side == SIDES.white ? this.getWhiteTeam() : this.getBlackTeam();
            let offTeam = capTeam == this.team1 ? this.team2 : this.team1;
            
            for(let i = 0; i < capTeam.pieces.length; i++) {
                let capPieceInst = capTeam.pieces[i];

                if(capPieceInst.captured 
                    && capPieceInst.type == capturedPiece.type
                    && capPieceInst.getCoord() == latestTurn.endCoord)
                {
                    capPieceInst.captured = false;
                    capPieceInst.possibleMoves = [latestTurn.endCoord];
                    capPieceInst.move(this.board.getCellByCoord(latestTurn.endCoord));
                    break;
                }
            }

            // remove captured pieces from Team.captured
            offTeam.captures.pop();
            this.updateCaptures(offTeam);
            this.updateScore();
            this.msgs.pop(); // "White captures Black Pawn (E7)."
        }

        // remove the action from the log
        this.turns.pop();

        this.msgs.pop(); // "It's White's turn."
        this.msgs.pop(); // "Black moves Pawn(A7) to A5"
        this.updateStatus();
        

        // re-draw the board
        this.board.draw();
    }

    updateCaptures(team) {
        if(!(team instanceof Team)) {
            console.error('Match.updateCaptures: requires instance of Team.');
            return;
        }

        if(this.captureCallback) {
            this.captureCallback(team);
        }
    }

    updateStatus(msg) {
        if(typeof(msg) == 'string' && msg.length > 0)
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

    updateScore() {
        if(this.scoreCallback) {
            return this.scoreCallback();
        }

        return;
    }

    whosTurn() {
        return this.turns.length % 2 ? SIDES.black : SIDES.white;
    }
}
