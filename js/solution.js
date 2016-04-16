/*
 * This file contains code to generate a solution to the current board configuration
 * (if one exists).  The user can either try solving from their current position,
 * or clear the board and solve it from scratch.
 */

/* SOLUTION GLOBALS */
var drillDepth = 8;


function solve() {
    if ( started ) {
        var fromStart = prompt("Solve from here or with clear board?");
        if ( fromStart ) {
            restart();
        }
    }
    if ( started ) {
        drill();
    } else {
        drillFromTop();
    }
}

function drillFromTop() {
    // Create an array 'baseSquares' : 
    var baseSquares = ( function() { 
        var out = new Array();
        
        if ( numRows == numCols ) {
            // If board is square, ie numRows == numCols...
            // 1/8 x allSqaures.length < baseSqaures.length < 1/4 x allSqaures.length
            //  y       
            //  3   4       *
            //  2   3     * *
            //  1   2   * * * 
            //  0   1 * * * *
            //        a b c d
            //        
            //    x   0 1 2 3
            
            var degree = Math.floor((numRows+1)/2);
            
            // Iteratively generate allowable square names...
            for ( var y = 0 ; y < degree ; ++y ) {
                for ( var x = y ; x < degree ; ++x ) {
                    var file = (function(y){ return y; }),
                        rank = (function(x){ return String.fromCharCode(asciiDiff + x); });
                    
                }
            }

        // Else if board is rectangular, use a whole quadrant...
        } else {
            var qWd = ,
                qHt = 

        }
    });
    
    var baseSquares = new Array();
    for ( var y = 0 ; y<)
    
    
    // Iterate thru baseSquares and drill down...
    for ( var square in baseSquares ) {
        alert(allSquares[square]);
        drill(baseSquares[square]);
    }
}

function drill(path) {
    
    
}