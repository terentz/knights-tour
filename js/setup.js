/* ui.js
 * 
 * Contains all the functionality for transferring visibility and
 * functional focus from the config UI to the board UI... and back
 * again! Also contains form validation functionality.
 * 
 */




function getWidth() {
	if (self.innerWidth) 
		return self.innerWidth;
	else if (document.documentElement && document.documentElement.clientWidth) 
		return document.documentElement.clientWidth;
	else if (document.body)
		return document.body.clientWidth;
}

function getHeight() {
	if (self.innerHeight)
		return self.innerHeight;
	else if (document.documentElement && document.documentElement.clientHeight)
		return document.documentElement.clientHeight;
	else if (document.body)
		return document.body.clientHeight;
}



/**
 * Toggles between the config UI section DOM node and the board UI 
 * section DOM node. 
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
			//$("#testData").html(data);
			$("#boardTable").html(data);
			$(".uiMain").toggleClass('hidden');
		},
		"complete":function() {
			var squares = $("td.square").get();
			//alert('got squares');
			for ( var key in squares ) {
				var id = squares[key].getAttribute('id');
				//alert('got id');
				allSquares.push(id);
				//alert('id pushed');
			}
			$(".square").bind("click", move);
			//alert('done!');
		},
		"error":function(data) {
			$("#testData").text("An error occurred in the Ajax call: " + data);
		},
		"statusCode":""
	});
}



/**
 * Validates the input values in the fields associated with desired
 * playing board dimensions.
 */
function validateBoardSizeField( ) {
 	// get the firing elements' id 
	var id = $(event.target).attr("id");
 	// test line 
 	//alert("inId:" + id + "|outId:" + msgNode.attr("id"));
 	
 	// get the current input value 
	var str = $("#" + id).val();
 	// test line 
 	//alert("str:" + str) 
 	
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
	} else if ( num % 1.0 != 0.0 ) {
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
		if ( event.type == "keyup" ) { 
			msgNode.text(msg);	
		} else { 
			alert(msg);   
		} 
		// if last field and blurring 
		if ( id == "NUM_numRows" && event.type == "blur" ) { 
			numRows = min;
			//$("#NUM_numRows").val(min); 
		} 
		$("#" + id).focus();  
	} else { 
		// clear msg's
		msgNode.text("");
		// apply value to board dimension global
		if ( event.type == "blur" ) {
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
 * 
 * TODO take account of the height as well, seeking to produce a 
 * nice, consistently scroll-free user interface.
 */
//$(document).ready(function() { 
//	var logPanelWidth = 0;  // TODO automate this value 
//	browserWidth = getWidth();
//	browserHeight = getHeight();
//	if ( browserWidth < browserHeight ) {
//		orientation = "portrait";
//	} else {
//		orientation = "landscape";
//	}
//	var test = "x:" + browserWidth + " | y:" + browserHeight + " | orientation:" + orientation;
//	//alert( test );
//	
//});

//$(document).ready(function() { 
//	var logPanelWidth = 0;  // TODO automate this value 
//	// Set browser dimensions
//	browserWidth = getWidth() - scrollOverlap;
//	browserHeight = getHeight() - scrollOverlap;
//	//alert('browser(x,y):(' + browserWidth + ',' + browserHeight + ')');
//	// Set game UI container dimensions
//	gameUiWd = browserWidth - ( 2 * uiMargin );
//	gameUiHt = browserHeight - ( 2 * uiMargin );
//	$("#gameUi").css("width", gameUiWd + "px");
//	$("#gameUi").css("height", gameUiHt + "px");
//	// Set board dimensions
//	boardContSqLen = browserHeight - 
//				((	2 * uiMargin ) +
//				 (	2 * uiPadding ));
//	$("#boardContainer").css("width", boardContSqLen + "px");
//	$("#boardContainer").css("height", boardContSqLen + "px");
//	$("#opsContainer").css("height", boardContSqLen + "px");
//	//alert('function complete');
//	if ( browserWidth < browserHeight ) {
//		orientation = "portrait";
//	} else {
//		orientation = "landscape";
//	}
//	var test = "x:" + browserWidth + " | y:" + browserHeight + " | orientation:" + orientation;
//	//alert( test );
//	
//});
