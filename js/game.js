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

        // forward move... 

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
//            usedSquares.push(currId);
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

            //alert('num used: ' + usedSquares.length);
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
    //alert('x:' + x + ' | y:' + y);
    //alert('typeof allSquares : ' + (typeof allSquares));
    // iterate thru allSquares 
    for ( var square in allSquares ) {
        id = allSquares[square] ;

        // if square has class 'used' 
        if ( $("#" + allSquares[square]).hasClass('used') ) {
            // discard it 
            continue;
        }

        // get the square's x,y values 
        var currX = id.charCodeAt(0) - asciiDiff ;
        var currY = ~~Number(id.substring(1));
        // get xDiff,yDiff 
        var diffX = Math.abs(x-currX);
        var diffY = Math.abs(y-currY);

        // if values reflect a valid target 
        if ( ( diffY === 1 && diffX === 2 ) || ( diffY === 2 && diffX === 1 ) ) {
            //alert('after diff test');
            $("#" + id).addClass('valid');
        }
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
    var len = usedSquares.length;
//    for ( var c = 0 ; c <= len ; ++c ) {
    for ( var sq = 0 ; sq <= len ; ++sq ) {
        moveBack();
    }
    nextId = "";
    currId = "";
    prevId = "";
}




// TODO roadmap - functions to animate>shake invalid squares when clicked
