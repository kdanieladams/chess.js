import { FILES, CASTLEABLESQCOLOR, DARKSQCOLOR, 
    LIGHTSQCOLOR, POSSIBLESQCOLOR, NUMRANKS } from './globals.js';
import { Cell } from './cell.js';

/**
 * Board
 */
export class Board {
    canvas = null;
    cells = new Array();
    ctx = null;
    pieces_img = null;

    constructor(canvas, pieces_img) {
        canvas = canvas instanceof HTMLCanvasElement ? canvas : null;
        pieces_img = pieces_img instanceof HTMLImageElement ? pieces_img : null;

        if(canvas == null) {
            console.error('Board.constructor: invalid canvas element');
            return;
        }
        if(pieces_img == null) {
            console.error('Board.constructor: invalid pieces_img element');
            return;
        }

        var filesArr = Object.keys(FILES);

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.pieces_img = pieces_img;

        for(let row = 0; row < NUMRANKS; row++) {
            for(let col = 0; col < filesArr.length; col++) {
                let isLight = (row + col) % 2 ? true : false;
                this.cells.push(new Cell(filesArr[col], row + 1, isLight));
            }
        }
    }

    _validateCoord(coord) {
        // a valid coordinate is presented as file + rank in a 
        // two character string; e.g. "d4"
        if(!isNaN(coord) || coord.length != 2) {
            return false;
        }
        else if(!Object.keys(FILES).includes(coord[0])) {
            return false;
        }
        else if(isNaN(coord[1]) || coord[1] > NUMRANKS || coord[1] < 1) {
            return false;
        }

        return true;
    }

    cellInBounds(coord) {
        return this._validateCoord(coord);
    }

    clearPossible() {
        for(var i = 0; i < this.cells.length; i++) {
            let cell = this.cells[i];
            cell.possibleMove = false;
            cell.castleable = false;
        }
    }

    draw(lightCol, darkCol) {
        lightCol = typeof(lightCol) == 'string' && lightCol.length <= 7 ? lightCol : LIGHTSQCOLOR;
        darkCol = typeof(darkCol) == 'string' && darkCol.length <= 7 ? darkCol : DARKSQCOLOR;
        
        var cellWidth = this.canvas.width / Object.keys(FILES).length;
        
        for(let i = 0; i < this.cells.length; i++) {
            let cell = this.cells[i];
            let xPos = cell.file * cellWidth;
            let yPos = (NUMRANKS * cellWidth) - (cellWidth * (cell.rank - 1)) - cellWidth;

            this.ctx.beginPath();
            this.ctx.fillStyle = cell.isLight ? lightCol : darkCol;

            // highlight the active piece
            if(cell.isOccupied() && cell.piece.active) { 
                this.ctx.fillStyle = POSSIBLESQCOLOR;
            }

            this.ctx.fillRect(xPos, yPos, cellWidth, cellWidth);
            this.ctx.closePath();

            // highlight possible moves
            if(cell.possibleMove) {
                // offset by half lineWidth so highlight fits within square
                let lineWidth = 6,
                    pxPos = xPos + (lineWidth * 0.5),
                    pyPos = yPos + (lineWidth * 0.5),
                    pCellWidth = cellWidth - lineWidth;

                this.ctx.beginPath();
                this.ctx.lineWidth = lineWidth;
                this.ctx.strokeStyle = POSSIBLESQCOLOR;

                if(cell.castleable) {
                    this.ctx.strokeStyle = CASTLEABLESQCOLOR;
                }

                this.ctx.rect(pxPos, pyPos, pCellWidth, pCellWidth);
                this.ctx.stroke();
                this.ctx.closePath();
            }

            // draw any pieces occupying this cell
            if(cell.isOccupied()) {
                cell.piece.draw(this.pieces_img, this.ctx, xPos, yPos, cellWidth);
            }
        }
    }

    getCellByCoord(coord) {
        if(!this._validateCoord(coord)) {
            console.error('Board.getCellByCoord: invalid coord value.');
            return;
        }

        var file = coord[0];
        var rank = coord[1];
        var index = ((rank * Object.keys(FILES).length) - NUMRANKS) + FILES[file];

        return this.cells[index];
    }

    getCellByPixels(xPos, yPos) {
        var cellWidth = this.canvas.width / Object.keys(FILES).length;
        var file = Object.keys(FILES)[Math.floor(xPos / cellWidth)];
        var rank = NUMRANKS - Math.floor(yPos / cellWidth);

        return this.getCellByCoord("" + file + rank);
    }
}
