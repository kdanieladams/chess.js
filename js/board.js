import { FILES, LIGHTSQCOLOR, DARKSQCOLOR, NUMRANKS, SIDES, POSSIBLESQCOLOR } from './globals.js';
import { Cell } from './cell.js';

/**
 * Board
 */
export class Board {
    canvas = null;
    cells = new Array();
    ctx = null;

    constructor(canvas) {
        canvas = canvas instanceof HTMLCanvasElement ? canvas : null;

        var filesArr = Object.keys(FILES);

        if(canvas == null) {
            console.error('Board.constructor: invalid canvas element');
            return;
        }

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        for(var row = 0; row < NUMRANKS; row++) {
            for(var col = 0; col < filesArr.length; col++) {
                var isLight = (row + col) % 2 ? true : false;
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

    draw(lightCol, darkCol) {
        lightCol = typeof(lightCol) == 'string' && !(lightCol.length > 7) ? lightCol : LIGHTSQCOLOR;
        darkCol = typeof(darkCol) == 'string' && !(darkCol.length > 7) ? darkCol : DARKSQCOLOR;
        
        var cellWidth = this.canvas.width / Object.keys(FILES).length;
        
        for(let i = 0; i < this.cells.length; i++) {
            let cell = this.cells[i];
            let xPos = cell.file * cellWidth;
            let yPos = (NUMRANKS * cellWidth) - (cellWidth * (cell.rank - 1)) - cellWidth;

            this.ctx.beginPath();
            this.ctx.fillStyle = cell.isLight ? lightCol : darkCol;

            // TEMPORARY
            if(cell.isOccupied()) { 
                if(cell.piece.side == SIDES.black)
                    this.ctx.fillStyle = cell.isLight ? '#900' : '#300'; 
                else
                    this.ctx.fillStyle = cell.isLight ? '#3269a8' : '#123075'; 
            }
            // ./TEMPORARY

            this.ctx.fillRect(xPos, yPos, cellWidth, cellWidth);
            this.ctx.closePath();

            // TOOD: draw any pieces occupying this cell...
            if(cell.isOccupied()) {
                cell.piece.draw(this.ctx, xPos, yPos);
            }
        }

        // highlight possible moves
        // must occur AFTER board is fully rendered to appear 'ontop' of the squares
        for(let i = 0; i < this.cells.length; i++) {
            let cell = this.cells[i];
            
            if(cell.possibleMove) {
                let xPos = cell.file * cellWidth;
                let yPos = (NUMRANKS * cellWidth) - (cellWidth * (cell.rank - 1)) - cellWidth;
                this.ctx.beginPath();
                this.ctx.lineWidth = "6";
                this.ctx.strokeStyle = POSSIBLESQCOLOR;
                this.ctx.rect(xPos, yPos, cellWidth, cellWidth);
                this.ctx.stroke();
                this.ctx.closePath();
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
}