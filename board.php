<?php

$html = "";
#$var_allIds = "var allIds = { ";
#$html .= "$(\"#testData\").text(\"$var_allIds\");";
// get post data
$numCols = $_POST['numCols'] + 0;
$numRows = $_POST['numRows'] + 0;

// declare and init file and rank for first iteration
$asciiOffset = 96;
$rank = $numRows;
$oddRows = ($numRows%2==1);

for ( $rank = $numRows ; $rank > 0 ; $rank-- ) { 
	$html .= "<tr id=\"rank$rank\"><td class=\"tableHeading rankHeading\">$rank</td>";
	for ( $file = ord('a') ; $file < ( ord('a') + $numCols ) ; $file++ ) {
		// set colour
		$colour = ( ( ( $file + $rank ) % 2 == $oddRows ) ? "white" : "black" );
		// set file char
		$fileCh = chr($file);
		// write td 
		$html .= "<td id=\"$fileCh$rank\" class=\"square $colour valid\"></td>";
		// append to allIds
#		$var_allIds .= ( ( $file == ( $asciiOffset + $numCols ) && $rank == 1 ) ? "$fileCh$rank };" : "$fileCh$rank, " );
#		$var_allIds .= ( ( $file == ( $asciiOffset + $numCols ) && $rank == 1 ) ? ('"'."$fileCh$rank".'" };') : ('"'."$fileCh$rank".'", ' ) );
// 		if ( ( $file == ( $asciiOffset + $numCols ) ) && ( $rank == 1 ) ) {
// 			echo "in if...<br/> ";
// 			$var_allIds .= "\"" ;
// 			#$var_allIds .= "$fileCh$rank" ;
// 			$var_allIds .= $fileCh.$rank ;
// 			$var_allIds .= "\"" ;
// 			$var_allIds .= " };" ;
// 		} else {
// 			echo "in else...<br/> ";
// 			$var_allIds .= "\"" ;
// 			#$var_allIds .= "$fileCh$rank" ;
// 			$var_allIds .= $fileCh.$rank ;
// 			$var_allIds .= "\"" ;
// 			$var_allIds .= ", " ;
// 		}
	}
	$html .= "</tr>";
}

$html .= "<td></td>";
for ( $file = ord('a') ; $file < ( ord('a') + $numCols ) ; $file++ ) {
	$html .= "<td class=\"tableHeading fileHeading\">".chr($file)."</td>";
}


#$html .= '<script>$(".square").bind("click", move); '.$var_allIds.'</script>';
#$html .= '<script>$(".square").bind("click", move); </script>';

#var_dump($html);
echo $html;



?>