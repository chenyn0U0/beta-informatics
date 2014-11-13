<img id="uploadPreview" style="width: 100px; height: 100px;" />
<head>
<script src="js/jquery.js"></script>
</head>
<body>
<input id="uploadImage" type="file" name="myPhoto" onchange="PreviewImage();" />
<div id="div1"></div>
<script type="text/javascript">

    function PreviewImage() {
        var oFReader = new FileReader();
        oFReader.readAsText(document.getElementById("uploadImage").files[0]);

        oFReader.onload = function (data) {
           // document.getElementById("uploadPreview").src = oFREvent.target.result;
           
           // jQuery("#div1").load(oFREvent.target.result);

           alert(data.target.result);


        };
    };

</script>


</body>