/**
 * Enums
 */
export const PIECETYPE = {
    empty: 0,
    pawn: 1,
    rook: 2,
    knight: 3,
    bishop: 4,
    queen: 5,
    king: 6
};

export const SIDES = {
    black: 0,
    white: 1
};

export const FILES = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7
};

/**
 * Colors
 */
export const LIGHTSQCOLOR       = '#919191';
export const DARKSQCOLOR        = '#333';
export const POSSIBLESQCOLOR    = '#40ff00';
export const CASTLEABLESQCOLOR  = '#5900b3';

/**
 * Functions
 */
export const CAPITALIZE = function(string){
    if (typeof string !== 'string') 
        return '';

    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Dimensions
 */
export const NUMRANKS = 8;
export const NUMFILES = Object.keys(FILES).length;
export const PIECESPRITEWIDTH = 100;
