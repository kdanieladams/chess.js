import { SIDES, PIECETYPE, FILES } from './constants.js';
import { Cell } from './cell.js';

/**
 * Board
 */
export class Board {
    cells = new Array();

    constructor() {
        var filesArr = Object.keys(FILES);

        for(var row = 0; row < 8; row++) {
            for(var col = 0; col < filesArr.length; col++) {
                this.cells.push(new Cell(filesArr[col], row + 1));
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
        else if(isNaN(coord[1]) || coord[1] > 8 || coord[1] < 1) {
            return false;
        }

        return true;
    }

    cellInBounds(coord) {
        return this._validateCoord(coord);
    }

    getCellByCoord(coord) {
        if(!this._validateCoord(coord)) {
            console.error('Board.getCellByCoord: invalid coord value.');
            return;
        }

        var file = coord[0];
        var rank = coord[1];
        var index = ((rank * 8) - 8) + FILES[file];

        return this.cells[index];
    }
}