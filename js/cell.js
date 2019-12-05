import { FILES } from './globals.js';

/**
 * Cell
 */
export class Cell {
    file = 0;
    piece = null;
    rank = 0;

    constructor(file, rank) {
        if(isNaN(rank) || rank > 8 || rank < 1) {
            console.error("Cell.constructor: Invalid rank value.");
            return;
        }
        if(!Object.keys(FILES).includes(file)) {
            console.error("Cell.constructor: Invalid file value.");
            return;
        }

        this.file = FILES[file];
        this.rank = parseInt(rank);
    }

    getFile() {
        return Object.keys(FILES)[this.file];
    }
    
    getCoord() {
        return "" + this.getFile() + this.rank;
    }

    isOccupied() {
        return this.piece != null;
    }
}