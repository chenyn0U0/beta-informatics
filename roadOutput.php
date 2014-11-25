<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Test php</title>

  	
	<link rel="stylesheet" href="css/roadVisual.css">

	<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

	<script type="text/javascript" src="js/jquery-1.7.js"></script>

  	<script src="js/util.js"></script>

	<script src="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.js"></script> <!-- needs to be before mapbox! -->


<script>  




var positionallx=20;
var positionally=100;

var thewidth=15000;
var theheight=450;
var thickofrect=10;
var spacebetweenline=1;

var showstarttime=8.5;
var roadboxwidth=250;

var curve=1;
var junctioncircler=6;
			


<!--  
locate = 0;  
function autoscroll() {
	if (locate !=400 ) {
		locate++;scroll(thewidth/24*showstarttime-roadboxwidth,0);  
		clearTimeout(timer);  
		var timer = setTimeout("autoscroll()",3);timer;
	}  
}  
-->  
</script>   




</head>
<body style="height:100%" onLoad="autoscroll()">
	<div id="roadcontainer"></div>
	<!-- <div id="timeaxiscontainer"></div> -->

<script>

var collection;
var jsonData;
var samepointvalue=0.0003;



$.get( "loadData.php?mode=allRows&id=45", function( data ) {
		//use underscore.js for transformation?
		jsonData = JSON.parse(data);
		collection = createGeoJson(jsonData);


	$.get( "loadPlusData.php?mode=getRoad", function( data ) {//get road information and deal with it and put it in collection
		var roadData=JSON.parse(data);

		for(var i=0;i<collection.features.length;i++){//each route
			var aroute=collection.features[i].geometry.coordinates;
			for(var j=0;j<aroute.length;j++){//each point in a route
				for(var k=0;k<roadData.length;k++){//each road
					var roadarray=new Array();
					roadarray=coordintoarr(roadData[k].coordinates);
					for(var l=0;l<roadarray.length;l++){//each point in a road
						var dist=((roadarray[l][0]-aroute[j][0])*(roadarray[l][0]-aroute[j][0]))+((roadarray[l][1]-aroute[j][1])*(roadarray[l][1]-aroute[j][1]));
						if(dist<samepointvalue*samepointvalue){
							aroute[j][aroute[j].length]=roadData[k].roadName;
							break;
						}
					}
				}
			}
			collection.features[i].properties.road=getroadprop(aroute,i);//put the property "road"(road information of one route) into the collection json file
		}


console.log(collection);
console.log(roadData);

//####################################################################################################### visualization #########################################################################################################3############

//change by us variable↑


//auto variable↓
var interofyaxis=theheight/roadData.length;
var arr=new Array();
arr[0]="other";
for(var la=1;la<roadData.length+1;la++){
	arr[la]=roadData[la-1].roadName;
}

function getroadposition(astring){
	for(var la=0;la<arr.length;la++){
		if(arr[la]==astring) return la*interofyaxis;
	}
}


	var roadVisual= d3.select("body")
			.append("svg")
			.attr("width",thewidth)
			.attr("height",theheight+200);

	var timescale=d3.scale.linear().domain([0, 24]).range([0, thewidth]);






	var eachroute=roadVisual.append("g")
			.attr("transform", function(d,i){return "translate(" + positionallx + "," + positionally + ")"})
			.selectAll("g")
			.data(collection.features)
			.enter()
			.append("g")
			.attr("transform", function(d,i){return "translate(" + 0 + "," + (i*spacebetweenline) + ")"});



	var eachroutepart=eachroute.selectAll("rect")
			.data(function(d){	return d.properties.road;})
			.enter()
			.append("g");

	eachroutepart.append("rect")
			.attr("x",function(d,i){return timescale(d[3][0]+(d[3][1]/60));})
			.attr("y",function(d,i){return getroadposition(d[0][0])+4;})
			.attr("width",function(d,i){return timescale((d[6][0]+(d[6][1]/60))-(d[3][0]+(d[3][1]/60)));})
			.attr("height",thickofrect)
			.attr("class",function(d,i){
				return collection.features[d[8]].properties.transport;
			})
			.attr("style","opicity:0.6")
			.on("mouseover", mouseOverRoutePart)
		  	.on("mouseout", mouseOutRoutePart)
		  	.on("click", showInformationOfRoutePart)





　　//Create X axis
	var timeAxis = d3.svg.axis()
	         .scale(timescale)
	         .orient("bottom")
	         .ticks(24);

   roadVisual.append("g")
    .attr("transform", function(d,i){return "translate(" + positionallx + "," + 0 + ")"})
    .attr("class", "axis")
    .call(timeAxis);
　　//Create X axis


   d3.select("#roadcontainer").append("svg")
   		.attr("width",roadboxwidth)
   		.attr("height",theheight+positionally+500)
   		.append("g")
		.attr("class","roadname")
   		.selectAll("text")
   		.data(arr)
   		.enter()
   		.append("text")
   		.text(function(d){return d;})
   		.attr("x",positionallx)
   		.attr("y",function(d){return positionally+getroadposition(d)+20;})





	var connection=roadVisual.append("g");

	


	for(var heng=0;heng<collection.features.length;heng++){
		var translate=0;
		for(var i=0;i<collection.features[heng].properties.road.length;i++){
			translate=(heng*spacebetweenline);
			if(i!=0){
				var x1=timescale(collection.features[heng].properties.road[i-1][6][0]+(collection.features[heng].properties.road[i-1][6][1]/60))
				var y1=getroadposition(collection.features[heng].properties.road[i-1][0][0]);
				var x2=timescale(collection.features[heng].properties.road[i][3][0]+(collection.features[heng].properties.road[i][3][1]/60));
				var y2=getroadposition(collection.features[heng].properties.road[i][0][0]);
				var connectionline=d3.svg.diagonal().source({x:x1+positionallx-curve,y:positionally+y1+translate+(thickofrect/2)}).target({x:x2+positionallx+curve,y:positionally+y2+translate+(thickofrect/2)});
				connection.append("g")
					.append("path")
					.attr("fill","none")
					.attr("stroke-width",curve*2)
					.attr("class",collection.features[heng].properties.transport+"-conline")
					.attr("d",connectionline)
			}
		}
	}



	eachroutepart.append("text")//Road name and distance
		  	.text(function(d){return d[0][0]+" - "+d[7]+"m";})
   			.attr("x",function(d,i){return timescale(d[3][0]+(d[3][1]/60))+(timescale((d[6][0]+(d[6][1]/60))-(d[3][0]+(d[3][1]/60)))/2);})
			.attr("y",function(d,i){return getroadposition(d[0][0])-3;})
			.attr("font-family","Arial")
			.attr("fill","white")
			.attr("font-size","12")
			.attr("visibility","hidden")
			.style("text-anchor", "middle");

	eachroutepart.append("text")//starttime
	  	.text(function(d){
			var time=""+(d[3][0]+Math.floor(d[3][1]/60))+":";
			if((d[3][1]%60)<10) time+="0"+Math.floor(d[3][1]%60);
			else time+=Math.floor(d[3][1]%60);
			return time;})
		.attr("x",function(d,i){return timescale(d[3][0]+(d[3][1]/60))-20;})
		.attr("y",function(d,i){return getroadposition(d[0][0])+4+thickofrect;})
		.attr("font-family","Arial")
		.attr("fill","white")
		.attr("font-size","9")
		.attr("visibility","hidden")
		.style("text-anchor", "middle");


	eachroutepart.append("text")//endtime
	  	.text(function(d){
			var time=""+(d[6][0]+Math.floor(d[6][1]/60))+":";
			if((d[6][1]%60)<10) time+="0"+Math.floor(d[6][1]%60);
			else time+=Math.floor(d[6][1]%60);
			return time;})
		.attr("x",function(d,i){return timescale(d[6][0]+(d[6][1]/60))+20;})
		.attr("y",function(d,i){return getroadposition(d[0][0])+4+thickofrect;})
		.attr("font-family","Arial")
		.attr("fill","white")
		.attr("font-size","9")
		.attr("visibility","hidden")
		.style("text-anchor", "middle");




	function mouseOverRoutePart(d){
		d3.select(this.parentNode).selectAll("text")
			.transition().duration(100).attr("visibility", "visible");
	}
	function mouseOutRoutePart(d){
		d3.select(this.parentNode).selectAll("text")
			.transition().duration(100).attr("visibility", "hidden");
	}
	function showInformationOfRoutePart(d,i){


		
	}



	});

	// roadVisual.selectAll("rect")
	// 	.data(collection.features)
	// 	.enter()
	// 	.append("rect")

	// 	.attr("y",function(d,i){ return i*100;})
	// 	.attr("width",function(d){return Number(d.properties.distance)/10;})
	// 	.attr("height",50)
	// 	.attr("fill",function(d){if(d.properties.gender=="Male") return "#0072bc";else return "#F750E3";});

	// roadVisual.selectAll("text")
	// 	.data(collection.features)
	// 	.enter()
	// 	.append("text")
	// 	.attr("x",20)
	// 	.attr("y",function(d,i){ return i*100+30;})
	// 	.text(function(d){ return d.properties.comment ;})
	// 	.attr("fill","black")
	// 	.attr("font-size","9px")
	// 	.attr("font-family","Arial");




		});

//##################################################################################### visualization #############################################################################################








function coordintoarr(astring){//get array of coordinates from string

	var array=new Array();
	for(var i=0;i<astring.split(";").length;i++){
		var beforearr=astring.split(";");
		array[i]=beforearr[i].split(",");
		array[i][0]=Number(array[i][0]);
		array[i][1]=Number(array[i][1]);
	}
	return array;
}





function getroadprop(aroute,i){//generate the road property
	var roadinfo=new Array();
	//roadinfo[x][0]-roadname(array); [1]-start index; [2]-start junction info; [3]- start time(array); 
	//[4]-end index; [5]- end junction info;  [6]-end time;
	var doubt=0;
	var lastrouteinfo="";
	var nowrouteinfo="";
	var saverouteinfo="";
	var nowpoint;

	var j=0;

	do{//each point
		if(j==0){//for the first point
			nowpoint=0;
			if(aroute[j].length==2) {
				roadinfo[0]=new Array();
				nowrouteinfo="other";
				roadinfo[0][2]="other";
				roadinfo[0][0]=["other"];
			}
			else if(aroute[j].length>=3){
				for(var x=2;x<aroute[j].length;x++){
					if(x==2){
						nowrouteinfo=aroute[j][x];
						roadinfo[0][2]=aroute[j][x];
						roadinfo[0][0][x-2]=aroute[j][x];
					}
					else{
						nowrouteinfo+=","+aroute[j][x];
						roadinfo[0][2]+=","+aroute[j][x];
						roadinfo[0][0][x-2]=aroute[j][x];
					}
				}
			}
			lastrouteinfo=nowrouteinfo;
			roadinfo[0][3]=[Number(collection.features[i].properties.startTime.split(":")[0]),Number(collection.features[i].properties.startTime.split(":")[1])];
			roadinfo[0][1]=0;


			roadinfo[0][4]=collection.features[i].geometry.coordinates.length-1;
			roadinfo[0][5]=roadinfo[0][2];
			roadinfo[0][6]=[Number(collection.features[i].properties.endTime.split(":")[0]),Number(collection.features[i].properties.endTime.split(":")[1])];
			
			
				// var p1= new L.LatLng(collection.features[i].geometry.coordinates[0][0],collection.features[i].geometry.coordinates[0][1]);
				// var p2= new L.LatLng(collection.features[i].geometry.coordinates[collection.features[i].geometry.coordinates.length-1][0],collection.features[i].geometry.coordinates[collection.features[i].geometry.coordinates.length-1][1]);
				roadinfo[0][7] =  collection.features[i].properties.distance;
				roadinfo[0][8]=i;

		}
		else{//for not first point
			//##########get road information of now point############
			if(aroute[j].length==2) {
				nowrouteinfo="other";
			}
			else if(aroute[j].length>=3){
				for(var x=2;x<aroute[j].length;x++){
					if(x==2){
						nowrouteinfo=aroute[j][x];
					}
					else{
						nowrouteinfo+=","+aroute[j][x];
					}
				}
			}
			//############get road information of now point##########
			

			/*########################### compare this point and now road name ###################################*/
			//get the same road from now point
			var nowarr=nowrouteinfo.split(",");


			var thesameroad="";
			for (var a=0;a<roadinfo[roadinfo.length-1][0].length;a++){
				for(var b=0;b<nowarr.length;b++){
					if(roadinfo[roadinfo.length-1][0][a]==nowarr[b]){
						if(thesameroad==""){thesameroad=roadinfo[roadinfo.length-1][0][a]}
						else{thesameroad+=","+roadinfo[roadinfo.length-1][0][a]}
					}
				}
			}


			if(thesameroad==""){//no road same
				if(doubt==0){
					doubt=1;
					saverouteinfo=lastrouteinfo;
				}
				else{
					//confirm as the end of previours road

					var nowroadindex=roadinfo.length-1;
					roadinfo[nowroadindex+1]=new Array();

					//get time for turn and give the value to both this and next route
					var st=collection.features[i].properties.startTime.split(":");
					var et=collection.features[i].properties.endTime.split(":");
					var alldistance=Number(collection.features[i].properties.distance);
					var thisdistance=0;
					var timeperiod=(Number(et[0])-Number(st[0]))*60+(Number(et[1])-Number(st[1]));
					for(var oh=roadinfo[nowroadindex][1];oh<j-2;oh++){//estimate the distance
						var p1= new L.LatLng(collection.features[i].geometry.coordinates[oh][0],collection.features[i].geometry.coordinates[oh][1]);
						var p2= new L.LatLng(collection.features[i].geometry.coordinates[oh+1][0],collection.features[i].geometry.coordinates[oh+1][1]);
						thisdistance = thisdistance + Number((p1.distanceTo(p2)).toFixed(0));
					}
					var periodofline=thisdistance*timeperiod/alldistance;

					roadinfo[nowroadindex][7]=thisdistance;
					roadinfo[nowroadindex][6]=[roadinfo[nowroadindex][3][0]+Math.floor(periodofline/60),roadinfo[nowroadindex][3][1]+(periodofline%60)];
					roadinfo[nowroadindex+1][3]=roadinfo[nowroadindex][6];



					//give value to start and end index, junction information
					roadinfo[nowroadindex][4]=j-2;
					roadinfo[nowroadindex][5]=saverouteinfo;
					if(nowarr.length!=0){roadinfo[nowroadindex+1][0]=nowarr;}
					else{roadinfo[nowroadindex+1][0]="other";}
					roadinfo[nowroadindex+1][1]=j-2;
					roadinfo[nowroadindex+1][2]=saverouteinfo;



					roadinfo[nowroadindex+1][4]=collection.features[i].geometry.coordinates.length-1;
					roadinfo[nowroadindex+1][5]=roadinfo[0][2];
					roadinfo[nowroadindex+1][6]=[Number(collection.features[i].properties.endTime.split(":")[0]),Number(collection.features[i].properties.endTime.split(":")[1])];
					
					roadinfo[nowroadindex+1][8] =i;
					roadinfo[nowroadindex+1][7] = alldistance;
				for(var bla=0;bla<nowroadindex+1;bla++){
					roadinfo[nowroadindex+1][7] -= roadinfo[bla][7];
				}
					


					doubt=0;
					j=j-2;

				}
			}
			if(thesameroad.length>=1){
				roadinfo[roadinfo.length-1][0]=thesameroad.split(",");
				lastrouteinfo=nowrouteinfo;
				saverouteinfo=nowrouteinfo;
			}
		}	
				j++;			
	}
	while(j<aroute.length);
	return roadinfo;
}



</script>


</body>
</html>