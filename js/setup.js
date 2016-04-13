/* ui.js
 * 
 * Contains all the functionality for transferring visibility and
 * functional focus from the config UI to the board UI... and back
 * again! Also contains form validation functionality.
 * 
 */



/**
 * Get the inner width of the window.
 * @returns {Node.documentElement.clientWidth|Number|document.documentElement.clientWidth|HTMLDocument.documentElement.clientWidth|Node.clientWidth|Window.innerWidth|self.innerWidth|Node.body.clientWidth|Document.body.clientWidth|document.body.clientWidth|HTMLElement.clientWidth}
 */
function getWidth() {
    if (self.innerWidth) 
        return self.innerWidth;
    else if (document.documentElement && document.documentElement.clientWidth) 
        return document.documentElement.clientWidth;
    else if (document.body)
        return document.body.clientWidth;
}
/**
 * Get the inner height of the window.
 * @returns {Node.documentElement.clientHeight|Number|HTMLDocument.documentElement.clientHeight|Node.clientHeight|document.documentElement.clientHeight|Window.innerHeight|self.innerHeight|Node.body.clientHeight|Document.body.clientHeight|HTMLElement.clientHeight|document.body.clientHeight}
 */
function getHeight() {
    if (self.innerHeight)
        return self.innerHeight;
    else if (document.documentElement && document.documentElement.clientHeight)
        return document.documentElement.clientHeight;
    else if (document.body)
        return document.body.clientHeight;
}



/**
 * Toggles between the config UI section DOM node and the game UI section DOM node. 
 */
function showBoard( ) { 
    numCols = $("#NUM_numCols").val();
    numRows = $("#NUM_numRows").val();
    requiredMoves = numCols * numRows ;

    var queryString = "numCols=" + numCols + "&numRows=" + numRows ;

    $.ajax({
        "type":"POST",
        "url":"board.php",
        "data":queryString,
        "dataType":"html",
        "success":function(data) {
            $("#boardTable").html(data);
            $(".uiMain").toggleClass('hidden');
        },
        "complete":function() {
            var squares = $("td.square").get();
            for ( var key in squares ) {
                var id = squares[key].getAttribute('id');
                allSquares.push(id);
            }
            $(".square").bind("click", move);
        },
        "error":function(data) {
            alert("An error occurred in the Ajax call: " + data);
        },
        "statusCode":""
    });
}

/**
 * Validates the input values in the fields associated with desired
 * playing board dimensions.
 */
function validateBoardSideInput( ) {
    // get the firing elements' id 
    var id = $(event.target).attr("id");
    
    // get the current input value 
    var str = $("#" + id).val();
    
    // convert to number object 
    var num = ~~Number(str);

    // get allowed limits 
    var min = minSqPerSide;
    var max = maxSqPerSide;

    // init's 
    var msg = "";
    var valid = true;

    // validate! 
    if ( String(num) !== str ) {
        valid = false;
        msg = "must be a number!";
    } else if ( num % 1.0 !== 0.0 ) {
        valid = false;
        msg = "must be an integer";
    } else if ( num < min || num > max ) {
        valid = false;
        msg = "must be between " + min + " & " + max ;  
    } else {
        msg = "";  
    }

    // get the msg target element 
    var msgNode = $("#" + id + "_msg");  

    // write the message and impose focus if necessary 
    if ( !valid ) { 
        $("#" + id).focus();  
        if ( event.type === "keyup" ) { 
            msgNode.text(msg);	
        } else { 
            alert(msg);   
        } 
        // if last field and blurring 
        if ( id === "NUM_numRows" && event.type === "blur" ) { 
            numRows = min;
            //$("#NUM_numRows").val(min); 
        } 
            $("#" + id).focus();  
    } else { 
        // clear msg's
        msgNode.text("");
        // apply value to board dimension global
        if ( event.type === "blur" ) {
            switch( id ) {
            case "NUM_numCols" : numCols = $(event.target).val();
                break;
            case "NUM_numRows" : numRows = $(event.target).val(); 
                break;
            default:
                alert('this code should not be reachable!');
                break;
            }
        }
    } 
}

/**
 * Queries the browser for its width, assigning it to the hidden 
 * input fields.
 */
$(document).ready(function() { 
    var logPanelWidth = 0;  // TODO automate this value 
    
    // Set browser dimensions..
    browserWidth = getWidth();
    browserHeight = getHeight();
    
    // Set game UI container dimensions..
    gameUiWd = browserWidth - ( 2 * uiMargin );
    gameUiHt = browserHeight - ( 2 * uiMargin );
    $("#gameUi").css("width", gameUiWd + "px");
    $("#gameUi").css("height", gameUiHt + "px");
    
    // Set board dimensions..
    boardContSqLen = browserHeight - 
                            ((	2 * uiMargin ) +
                             (	2 * uiPadding ));
    $("#boardContainer").css("width", boardContSqLen + "px");
    $("#boardContainer").css("height", boardContSqLen + "px");
    $("#opsContainer").css("height", boardContSqLen + "px");
    
    // Set orientation..
    if ( browserWidth > browserHeight ) {
        orientation = "landscape";
    } else {
        orientation = "portrait";
    }
    
    // Test lines...
    //var test = "x:" + browserWidth + " | y:" + browserHeight + " | orientation:" + orientation;
    //alert( test );
});
