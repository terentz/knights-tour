/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* JS GLOBALS */

/* CONSTANTS */
var minSquareSize = 50,
    minSqPerSide = 3,
    maxSqPerSide = 12,
    knightImgPath = '../img/knight.png',
    knightImgId = 'IMG_knight',
    knightImgTag = '<img id="' + knightImgId + '" src="' + knightImgPath + '" alt="current position"/>',
    asciiDiff = 96;
	
/* CALCULATED */ 
var browserWidth = 0,
    browserHeight = 0,
    numCols = 0,
    numRows = 0,
    requiredMoves = 0,
    sqSize = 59, // TODO generate this value 
    orientation = "landscape";	// TODO generate this value 

/* DYNAMIC */
var started = false,
    allSquares = new Array(), 
    usedSquares = new Array(), 
    prevId = "",
    currId = "",
    nextId = "",
    moveNum = 0;

/* TODO
 * wtf did i mean by scrollOverlap???
 * 
 */

