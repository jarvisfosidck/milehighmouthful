<?php

/*
create css grid
*/
//$cols = 16;
//$marg = 1.4;
//for ($i=1;$i<=$cols;$i++) {
//	for ($m=1;$m<=$i;$m++) {
//		$w = ($m/$i)*100;
//		$w = $w-$marg;
//		echo ".col".$m."-".$i."{\r\n";
//		echo "\twidth:$w%;\r\n";
//		echo "\tmargin-left:$marg%;\r\n";
//		echo "\tfloat:left;\r\n}\r\n";
//	}
//}
/*
create html grid
*/
$cols = 4;
$cnt=1;
for ($i=1;$i<=$cols;$i++) {
	echo "<div class='row'>\r\n";
	for ($m=1;$m<=$cols;$m++) {
		
		echo "<span class='col1-$cols'><input type='button' id='sq$i$m' tabindex=\"$cnt\" >&nbsp;</input></span>\r\n";
		$cnt++;
		
	}
	echo "</div>\r\n";
}

?>