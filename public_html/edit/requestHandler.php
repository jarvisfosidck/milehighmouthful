<?php

/**
this goes on the page with password;
*/
session_cache_expire(1);

session_start();
/*$_SESSION = array();
session_destroy();
*/
$salt = strtr(openssl_random_pseudo_bytes(64),array());

/*
$_SESSION['knockSalt'] = crypt('q23sq24',$salt);
*/

/**This goes on the AJAX page
 * must start session when on seperate page
*/
//session_start();
if (isset($_POST['cookieCode'])) {
	$_SESSION['knockSalt'] = crypt('q23sq24',$salt);
	
	$pswd = substr($_POST['stringSent'],1);
	if (crypt($pswd,$_SESSION['knockSalt'] == $_SESSION['knockSalt'])) {
			$_SESSION['passwordCorrect'] = 1;
			//echo "correct password response";
	} else {
		//echo "failed login message";
	}	
}
/**This goes on any page that requires the login
 * need to start session
*/
//session_start();
if ($_SESSION['passwordCorrect'] == 1) {
	echo "pass";
	//if correct do stuff
	
} else {
	//var_dump($_SESSION,$pswd);
	//header("Location: ../");
	//do whatever on the password not set;
	echo "failed password";
}




if (isset($_POST['id']) && $_POST['id'] == "updatePostFromAddPostPage") {
	
	$data = json_decode(urldecode(base64_decode($_POST['dataObject'])));
	
	$docURLs=array();
	var_dump($_FILES);
	foreach ($_FILES as $name => $file) {
		$filedata = file_get_contents($_FILES[$name]['tmp_name']);
		if ($file['name'] == "image.jpg" || $file['name'] == "image.jpeg") {
			$filename = uniqid("image");
		} else {
			$filename = $file['name'];
		}
		file_put_contents("../data/images/{$filename}",$filedata);
		$docURLs[] = "data/images/{$filename}";
		
	}
	
	$keys = get_object_vars($data);
	$newData = array();
	//var_dump($data);
	foreach ($data as $k => $v) {
		$newData[$k] = $v;
		$v;
	
	}
	$newData['docURLs'] = $docURLs;

	$str = "\r\n,".json_encode($newData);
	
	$efile = file_get_contents("staging/data.js");
	
	echo $pre = rtrim($efile,"]") . $str;
	
	file_put_contents("staging/data.js",$pre."\r\n\r\n\r\n]");
	
	
	
	
}

if (isset($_POST['id']) && $_POST['id'] == "deletePostFromAddPostPage") {
	
	
	
	$file = new SplFileObject("staging/data.js");
	var_dump($file);
	$cnt = 0;
	$json="[";
	
	while (!$file->eof()) {

		if ($cnt > 10) {
		
			echo $json .= $file->fgets();
			
		} else {
			$file->fgets();
		}
		$cnt++;
	}
	
	//echo $json = rtrim($json,"]");

	$data = json_decode($json);
	
	var_dump($data);
	
	$cut = $_POST['indexToDelete'];
	if (is_object($data[$cut])) {
		unset($data[$cut]);
		
	} else {
		echo "Object Offset not found";
	}

	
	
	$str = json_encode($data);
	
	$str .= '/*
	*
	*Top 10 lines reserved as header for window declaration
	*
	*
*/
window.blogPostEntries = 
/*
	*
	*
*/';
	
	
	file_put_contents("staging/data.js",$str);
	


}





?>