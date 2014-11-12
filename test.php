<!DOCTYPE html>  
<html lang="en">  
<head>
	<meta charset="UTF-8">
	<title>test of file reading</title>
	<script src="js/jquery.js"></script>
</head>
<div id="imadivbutyoucannotseemehahaha" style="visibility: hidden;"/>

<body>
<?php
session_start();
// store session data
$_SESSION['filecontent']="";
?>

<form id="uploadfile"  enctype="multipart/form-data" >
<input id="file" name="file" type="file" onchange="selectFile(this)"/> 
<input id="outfilename" name="outfilename" type="hidden"/>
<button onClicked="uploadroute()">upload</button>

</form>

<?php echo "abc"; ?>
<?php echo $_SESSION['filecontent']; ?>
<p id=""></div>





</body>

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






<script type="text/javascript">
//传文件至另一个php
function uploadroute()
{
	$.post("uploadfile.php", $("#uploadfile").serialize());
}

<script type="text/javascript">
//上传时验证与文件路径获取
//文件后缀名验证
function selectFile(fnUpload) {
var filename = fnUpload.value; 
var mime = filename.toLowerCase().substr(filename.lastIndexOf(".")); 
document.getElementById("outfilename").value="";
if(mime==".gpx") 
{ 
document.getElementById("outfilename").value="gpx";
uploadroute();
}
else if(mime==".kml")
{
document.getElementById("outfilename").value="kml";
uploadroute();
}
else if(mime==".geojson")
{
document.getElementById("outfilename").value="geojson";
uploadroute();
}
else if(mime==".jpg")
{
document.getElementById("outfilename").value="geojson";
document.getElementById('img').value=getFullPath(fnUpload);
}
else
{
alert("Please upload a json or kml or geojson file."); 
document.getElementById("outfilename").value="";
fnUpload.outerHTML=fnUpload.outerHTML; 
}
}

 
function getFullPath(obj) 
{ 
} 


</script>
