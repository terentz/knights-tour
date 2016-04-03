/* board.js
 * 
 * Contains all functions necessary to process
 * user's input into the chess board. includes
 * functions involved in defining the initial
 * board restrictions.
 */



function move() {
    nextId = $(event.currentTarget).attr("id");

    // If move is takeback ... 
    if ( nextId == currId ) { 
        moveBack();
        return;
    }

    // If first move... 
    if ( !started ) {

        // start the game  
        started = true;
        moveNum++;

        //  adjust css classes 
        $(event.currentTarget).addClass('current');
        // place the knight 
        $(event.currentTarget).html(knightImgTag);
        $("#moveLogContainer").removeClass('hidden');
        addToLog(nextId);

        // set valid squares
        setValid(nextId);

        // update globals 
        currId = nextId;
        nextId = "";

    // otherwise... 
    } else {

        // forward move... 

        // flags 
        var validMove = false;
        var available = false;

        // test if used or not 
        if ( !$(event.currentTarget).hasClass('used') ) {
            available = true;
        }

        // test for validity
        if ( $(event.currentTarget).hasClass('valid') ) {
        //if ( $("#" + nextId).hasClass('valid') ) {
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
            usedSquares.push(currId);

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
        if ( moveNum == requiredMoves ) {
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
        if ( usedSquares.length > 0 ) {
            //alert('num used: ' + usedSquares.length);

            // set new current square 
            currId = usedSquares.pop();
            $("#" + currId).removeClass('used');
            $("#" + currId).addClass('current');
            $("#" + currId).text("");
            $("#" + currId).html(knightImgTag);
            // set valid squares 
            setValid(currId);
            //alert('num used: ' + usedSquares.length);

        // If current was first move ... 	 
        } else {
            //alert('num used: ' + usedSquares.length);

            // reset first square 
            currId = "";
            $("#" + nextId).removeClass('current');
            $("#" + nextId).html("");
            $("#" + nextId).text("");

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
    //alert('in setValid()');
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

        //alert('before diff test');
        // if values reflect a valid target 
        if ( ( diffY == 1 && diffX == 2 ) || ( diffY == 2 && diffX == 1 ) ) {
            //alert('after diff test');
            $("#" + id).addClass('valid');
        }
    }
}

function addToLog( id ) {
    var log = document.getElementById('moveLogContainer') ;
    // Remove the <br/>
    log.removeChild(log.lastChild);
    // Add the new log entry
    var out = '<div class="logDiv">' + moveNum + '.&nbsp;' + id + '</div><br class="clear"/>' ;
    $("#moveLogContainer").append(out);
}

function deleteFromLog( ) {
    var log = document.getElementById('moveLogContainer') ;
    // Remove the <br/> 
    log.removeChild(log.lastChild);
    // Remove the last log entry
    log.removeChild(log.lastChild);
    // Replace the <br/>
    var out = '<br class="clear"/>' ;
    $("#moveLogContainer").append(out);
}

function clearLog( ) { 
    $("#moveLogContainer").html("");
    $("#moveLogContainer").text("");
}

function reset() {
    var goahead = false;
    var caller = $(event.currentTarget).attr('id');
    switch ( caller ) {
    case "BTN_reconfigureBoardDiv" :
        if ( started ) {
            goahead = confirm('Are you sure you wish to clear and reconfigure the board?');
        } else {
            goahead = true;
        }
        break;
    case "BTN_resetBoardDiv" :
        if ( started ) {
            goahead = confirm('Are you sure you wish to clear the board?');
        }
        break;
    default:
        alert('unreachable code in game.js->reset()!');
        return;
    }
    if ( goahead ) {
        $("#moveLogContainer").addClass('hidden');
        $(".current").removeClass('current');
        $(".used").removeClass('used');
        $(".valid").removeClass('valid');
        $(".square").html("");
        $(".square").text("");
        $(".square").addClass('valid');
        // reset globals 
        started = false;
        usedSquares = new Array(); 
        prevId = "";
        currId = "";
        nextId = "";
        moveNum = 0;
        clearLog();
        if ( caller == "BTN_reconfigureBoardDiv" ) {
            $(".uiMain").toggleClass('hidden');
        }
    }
}



// TODO roadmap - functions to animate>shake invalid squares when clicked
