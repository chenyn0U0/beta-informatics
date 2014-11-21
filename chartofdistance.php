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

var rectheight=20;
var theheight=1000;
var lengthofonemin=10;
var maxdistance=6000;
var positionallx=100;
var positionally=50;
//variables ↑


	$(document).ready(function() {
		$.get( "loadData.php?mode=allRows&id=45", function( data ) {
		//use underscore.js for transformation?
		jsonData = JSON.parse(data);
		collection = createGeoJson(jsonData);





	var roadVisual= d3.select("body")
			.append("svg")
			.attr("width","100%")
			.attr("height","100%");

	var distancescale=d3.scale.linear().domain([0, maxdistance]).range([0, theheight]);//translater for distance and coordinrate

	var timescale=d3.scale.linear().domain([0, 10]).range([0,lengthofonemin*10]);//translater for time and length


	var distanceAxis = d3.svg.axis()
	         .scale(distancescale)
	         .orient("left")
	         .ticks(10);

    roadVisual.append("g")//the group of axis
	    .attr("transform", function(d,i){return "translate(" + positionallx + "," + positionally + ")"})
	    .attr("class", "axis")
	    .call(distanceAxis);

    var barArea=roadVisual.append("g")
    		.attr("transform", function(d,i){return "translate(" + positionallx + "," + positionally + ")"});//the group of bar

	var aBar=barArea.selectAll("g")
		.data(collection.features)
		.enter()
		.append("g");



	aBar.append("rect")
		.attr("x",0)
		.attr("y",function(d,i){return distancescale(Number(d.properties.distance));})//from top to bottom, distance of bar are increasing
		.attr("width",function(d){return timescale(gettimeperiod(d.properties.startTime,d.properties.endTime));})
		.attr("height",rectheight)
		.attr("fill",function(d){
			if(d.properties.transport=="car") return "red";
			if(d.properties.transport=="walk") return "blue";
			if(d.properties.transport=="bike") return "green";
		});

	aBar.append("text")
		.attr("x",function(d){return timescale(gettimeperiod(d.properties.startTime,d.properties.endTime))/2;})
		.attr("y",function(d,i){return distancescale(Number(d.properties.distance))+5+(rectheight/2);})
		.text(function(d){ return "distance:"+d.properties.distance+" time:"+gettimeperiod(d.properties.startTime,d.properties.endTime)+"min";})
		.style("text-anchor", "middle")//make the x y mentioned before be the center point of text
		.attr("fill","white")
		.attr("font-size","9px")
		.attr("font-weight","bold")
		.attr("font-family","Arial");
		});
	});



function gettimeperiod(startT,endT){//get the minute for duration of the journey
	var st=[Number(startT.split(":")[0]),Number(startT.split(":")[1])];
	var et=[Number(endT.split(":")[0]),Number(endT.split(":")[1])];
	var stt=st[0]*60+st[1];
	var ett=et[0]*60+et[1];
	return ett-stt;
}




</script>


</body>
</html>