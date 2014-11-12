<?php
if(is_uploaded_file($_FILES['geodata']['tmp_name'])){
	$root_dir ="upload_path/";
	$filename =  $_FILES['filename']['name'];
	$uploadfile = $root_dir . $filename;
	if (move_uploaded_file($_FILES['filename']['tmp_name'], $uploadfile)) {
     		echo "uploaded";
	}  
}


$_SESSION['filecontent']=readfile("gpx.gpx");

?>

