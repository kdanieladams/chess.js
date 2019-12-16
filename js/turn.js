import { SIDES } from './globals.js';

/**
 * Turn
 * 
 * Turn is assembled in parts as halfTurns (or team Actions) occur. 
 */
export class Turn {
    whiteAction = null;
    blackAction = null;
    captures = new Array();

    constructor(whiteAction) {
        if(whiteAction.side != SIDES.white) {
            console.error("Turn.constructor: invalid whiteAction");
            return;
        }

        this.whiteAction = whiteAction;
    }
}
