import { FILES, SQWIDTH, LIGHTSQCOLOR, DARKSQCOLOR, NUMRANKS, SIDES } from './globals.js';
import { Cell } from './cell.js';

/**
 * Board
 */
export class Board {
    cells = new Array();

    constructor() {
        var filesArr = Object.keys(FILES);

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

    draw(ctx, canvasWidth, lightCol, darkCol) {
        canvasWidth = isNaN(canvasWidth) ? null : parseInt(canvasWidth);
        lightCol = typeof(lightCol) == 'string' && !(lightCol.length > 7) ? lightCol : LIGHTSQCOLOR;
        darkCol = typeof(darkCol) == 'string' && !(darkCol.length > 7) ? darkCol : DARKSQCOLOR;
        
        var cellWidth = canvasWidth == null ? SQWIDTH : canvasWidth / Object.keys(FILES).length;
        
        for(var i = 0; i < this.cells.length; i++) {
            var cell = this.cells[i];
            var xPos = cell.file * cellWidth;
            var yPos = (NUMRANKS * cellWidth) - (cellWidth * (cell.rank - 1)) - cellWidth;

            ctx.beginPath();
            ctx.fillStyle = cell.isLight ? lightCol : darkCol;
            if(cell.isOccupied()) { 
                if(cell.piece.side == SIDES.black)
                    ctx.fillStyle = cell.isLight ? '#900' : '#300'; 
                else
                    ctx.fillStyle = cell.isLight ? '#090' : '#030'; 
            }
            ctx.fillRect(xPos, yPos, cellWidth, cellWidth);
            ctx.closePath();

            // TOOD: draw any pieces occupying this cell...
            // if(cell.isOccupied()) { ... }
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