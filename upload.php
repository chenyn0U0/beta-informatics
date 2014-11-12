

<form id="uploadfile"  enctype="multipart/form-data" >
	<input id="file" name="file" type="file" onchange="selectFile(this)"/> 
	<input id="outfilename" name="outfilename" type="hidden"/>
	<button onClicked="uploadroute()">upload</button>
</form>



<script type="text/javascript">
//传文件至另一个php
function uploadroute()
{
	$('#map').load()
	$.post("draw-map.html", $("#uploadfile").serialize(), function(){
		alert('test');
	});
}

//上传时验证与文件路径获取
//文件后缀名验证
function selectFile(fnUpload) {
	var filename = fnUpload.value; 
	var mime = filename.toLowerCase().substr(filename.lastIndexOf(".")); 
	document.getElementById("outfilename").value="";
	if(mime==".gpx") 
	{ 
	document.getElementById("outfilename").value="gpx";
	// uploadroute();
	}
	else if(mime==".kml")
	{
	document.getElementById("outfilename").value="kml";
	}
	else if(mime==".geojson")
	{
	document.getElementById("outfilename").value="geojson";
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



</script>
