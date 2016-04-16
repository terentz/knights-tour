/* board.js
 * 
 * Contains all functions necessary to process
 * user's input into the chess board. includes
 * functions involved in defining the initial
 * board restrictions.
 */



function move() {
    var target = $(event.currentTarget);
    nextId = target.attr('id');

    // If move is takeback ... 
    if ( nextId === currId ) { 
        moveBack();
        return;
    }

    // If first move... 
    if ( !started ) {

        // start the game  
        started = true;
        moveNum++;

        //  adjust css classes 
        target.addClass('current');
        
        // place the knight 
        target.html(knightImgTag);
        $("#moveLogContainer").removeClass('hidden');
        addToLog(nextId);

        // set valid squares
        setValid(nextId);

        // update globals 
        usedSquares.push(nextId);
        currId = nextId;
        nextId = "";

    // if not first move... 
    } else {

        // flags 
        var validMove = false;
        var available = false;

        // test if used or not 
        if ( !target.hasClass('used') ) {
            available = true;
        }

        // test for validity
        if ( target.hasClass('valid') ) {
            validMove = true;
        }
        if ( !available && !validMove ) {
            alert('Invalid move AND square previously visited!');
            nextId = "";
            return;
        } else if ( available && !validMove ) {
            alert('Invalid move!');
            nextId = "";
            return;
        } else if ( !available && validMove ) {
            alert('Square previously visited!');
            nextId = "";
            return;
        // DO DA MOVE!! 
        } else {
            // remove knight from current square 
            $("#"+currId).html("");
            $("#"+currId).text(moveNum++);
            $("#"+currId).removeClass('current');
            $("#"+currId).addClass('used');
            $(".valid").removeClass('valid');
            usedSquares.push(nextId);

            // place knight on new square 
            $("#"+nextId).addClass('current');
            $("#"+nextId).html(knightImgTag);
            $("#IMG_knight").text(moveNum);
            addToLog(nextId);

            // set next valid squares
            setValid(nextId);

            // update globals 
            prevId = currId;
            currId = nextId;
            nextId = "";
        }

        // If completed the tour... 
        if ( moveNum === requiredMoves ) {
            alert('You have completed the tour - CONGRATULATIONS!!');
            // TODO add functionality to print and email result (with board and log) 
        }
    }
}

function moveBack() {
    if ( started ) {
        // remove css and img from (old) current 
        $("#" + currId).removeClass('current');
        $("#" + currId).html("");
        // adjust log 
        deleteFromLog();

        // If not first move ... 
        if ( usedSquares.length > 1 ) {

            // set new current square 
            usedSquares.pop();
            var len = usedSquares.length;
            currId = usedSquares[len-1];
            $("#" + currId).removeClass('used');
            $("#" + currId).addClass('current');
            $("#" + currId).text("");
            $("#" + currId).html(knightImgTag);
            // set valid squares 
            prevId = usedSquares[usedSquares.length-2];
            setValid(currId);
            

        // If current was first move ... 	 
        } else {
            nextId = usedSquares[0];
            usedSquares.pop();
            $("#" + nextId).removeClass('current');
            $("#" + nextId).html("");
            $("#" + nextId).text("");
            nextId = "";
            currId = "";
            prevId = "";
            
            // set valid squares 
            $(".valid").removeClass('valid');
            $(".square").addClass('valid');

            // hide the log container
            $("#moveLogContainer").addClass('hidden');

            // reset game flag 
            started = false;
        }
        --moveNum;
        return;
    }
}

function setValid( target ) {
    $(".valid").removeClass('valid');
    
    // get the x,y values of target cell 
    var x = target.charCodeAt(0) - asciiDiff;
    var y = ~~Number(target.substring(1));

    // Alternative: no iteration...
    validSquares = new Array();
    if ( (x+1) <= numCols ) {
        if ( (y-2) > 0 ) _setValid( String.fromCharCode(asciiDiff + (x+1)) + (y-2).toString());
        if ( (y+2) <= numRows ) _setValid( String.fromCharCode(asciiDiff + (x+1)) + (y+2).toString());
    }
    if ( (x-1) > 0 ) {
        if ( (y-2) > 0 ) _setValid( String.fromCharCode(asciiDiff + (x-1)) + (y-2).toString());
        if ( (y+2) <= numRows ) _setValid( String.fromCharCode(asciiDiff + (x-1)) + (y+2).toString());
    }
    if ( (x+2) <= numCols ) {
        if ( (y-1) > 0 ) _setValid( String.fromCharCode(asciiDiff + (x+2)) + (y-1).toString());
        if ( (y+1) <= numRows ) _setValid( String.fromCharCode(asciiDiff + (x+2)) + (y+1).toString());
    }
    if ( (x-2) > 0 ) {
        if ( (y-1) > 0 ) _setValid( String.fromCharCode(asciiDiff + (x-2)) + (y-1).toString());
        if ( (y+1) <= numRows ) _setValid( String.fromCharCode(asciiDiff + (x-2)) + (y+1).toString());
    }
}
function _setValid(id) { 
    if ( usedSquares.indexOf(id) < 0 ) {
        // test line..
        console.log('valid:'+id);
        $("#" + id).addClass('valid');
        validSquares.push(id);
    }
}
function getXValue( square ) {
    return square.charCodeAt(0) - asciiDiff;
}
function getYValue( square ) {
    return ~~Number(square.substring(1));
}
function getSquareName( x, y ) {
//    return (char)(x + asciiDiff);
    return String.fromCharCode(97 + x) + (y+1).toString();
}
function validSquareName( input ) {
    var rgx_sq = /^[a-z][0-9]{1,2}$/;
    return input.toString().match(rgx_sq);
}
function getFile( input ) {
    if ( typeof input === 'string' && validSquareName( input ) ) {
        // 'input' is square name..
        
    } else if ( typeof input === 'number' && input.toString().match(/^([1-9][0-9])|([1-9])$/)) {
        // 'input' is x value..
        return String.fromCharCode(97 + input);
    } else {
        console.log('input error in getFile() - input:' + (typeof input).toString() + '(' + input.toString() + ')');
    }
}
function getRank( input ) {
    if ( typeof input === 'string' && validSquareName( input ) ) {
        // 'input' is square name..
                
    }else if ( typeof input === 'number' && input.toString().match(/^([1-9][0-9])|([1-9])$/)) {
        // 'input' is y value..
        
    } else {
        console.log('input error in getRank() - input:' + (typeof input).toString() + '(' + input.toString() + ')');
    }
}

/**
 * Appends a square id to the move log.
 * @param {type} id The id to add.
 */
function addToLog( id ) {
    var log = document.getElementById('moveLogContainer') ;
    // Remove the <br/>
    log.removeChild(log.lastChild);
    // Add the new log entry
    var out = '<div class="logDiv">' + moveNum + '.&nbsp;' + id + '</div><br class="clear"/>' ;
    $("#moveLogContainer").append(out);
}
/**
 * Removes the last move from the move log.
 */
function deleteFromLog( ) {
    var log = document.getElementById('moveLogContainer') ;
    // Remove the <br/> 
    log.removeChild(log.lastChild);
    // Remove the last log entry
    log.removeChild(log.lastChild);
    // Add a new <br/>
    $("#moveLogContainer").append('<br class="clear"/>');
}


function reset() {
    // Init..
    var proceed = false;
    var reconfigure = false;
    // Get reset type & decide whether to proceed..
    var type = '';
    var caller = $(event.currentTarget).attr('id');
    switch ( caller ) {
    case "BTN_reconfigureBoardDiv" :
        proceed = ( started ? confirm('Are you sure you wish to clear and reconfigure the board?') : true );
        reconfigure = true;
        break;
    case "BTN_resetBoardDiv" :
        if ( started ) {
            proceed = confirm('Are you sure you wish to clear the board?');
        } else return; 
        break;
    default:
        alert('unreachable code in game.js->reset()!');
        return;
    }
    
    // Proceed with reset...
    if ( proceed ) {
        // Starting with restart...
        restart();
        // Then full reconfigure if it's the case..
        if ( reconfigure ) {
            numCols = 0;
            numRows = 0;
            requiredMoves = 0;
            allSquares = null;
            allSquares = new Array();
            $(".uiMain").toggleClass('hidden');
        }
    } else return;
}


function restart() {
    var moves = usedSquares.length;
    for ( var mv = 0 ; mv < moves ; ++mv ) {
        moveBack();
    }
    nextId = "";
    currId = "";
    prevId = "";
}




// TODO roadmap - functions to animate>shake invalid squares when clicked
