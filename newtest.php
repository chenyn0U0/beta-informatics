<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Test php</title>

  	

	<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

	<script type="text/javascript" src="js/jquery-1.7.js"></script>

  	<script src="js/util.js"></script>

</head>
<body style="height:100%">

<script>

var collection;
var jsonData;

	$(document).ready(function() {

		$.get( "loadData.php?mode=allRows&id=45", function( data ) {
		//use underscore.js for transformation?

		jsonData = JSON.parse(data);

		collection = createGeoJson(jsonData);

			console.log("here", collection );




	var roadVisual= d3.select("body")
			.append("svg")
			.attr("width","100%")
			.attr("height","100%");

	var ascale=d3.scale.linear().domain([100, 500]).range([10, 350]);



	roadVisual.selectAll("rect")
		.data(collection.features)
		.enter()
		.append("rect")
		.attr("x",0)
		.attr("y",function(d,i){ return i*100;})
		.attr("width",function(d){return (Number(d.properties.weekday)+1)*100;})
		.attr("height",50)
		.attr("fill",function(d){if(d.properties.gender=="Male") return "#0072bc";else return "#F750E3";});
	roadVisual.selectAll("text")
		.data(collection.features)
		.enter()
		.append("text")
		.attr("x",0)
		.attr("y",function(d,i){ return i*100;})
		.attr("text",function(d){ return d.properties.comment ;})
		.attr("fill","white");


		});
});









</script>


</body>
</html>