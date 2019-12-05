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

    getCellByCoord(coord) {
        if(!isNaN(coord) || coord.length != 2) {
            console.error('Board.getCellByCoord: invalid coord value.');
            return;
        }

        var file = coord[0];
        var rank = coord[1];
        var index = ((rank * 8) - 8) + FILES[file];

        return this.cells[index];
    }
}