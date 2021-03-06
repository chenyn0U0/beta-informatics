	// var spaceData;
	// $.get( "loadPlusData.php?mode=getCycleEntrance", function( data ) {
	// 	spaceData=JSON.parse(data);
	// 	for(var i=0;i<spaceData.length;i++)
	// 	{
	// 		console.log(spaceData[i].spaceName);
	// 	}

	// 	});

	// ^(.*)$  search for all


/* 
   STUFF
   ========================================================================== */
function setSectionsWithImagebackgrounds() {
		$('section.imgSection').each(
			function() {
				//console.log('imgSection ' + $(this).attr('id'));
				calculateHeight($(this));
			}
		)
	}

	//caluclates the height of an image given the current screen width
	function calculateHeight(id) {

		imgSrc = $(id).find('.backgroundImage').attr('src');

		var ratio = getRatio(imgSrc);
//		console.log('ratio: ' + ratio);

		var currentWidth = $(window).width();
		var newH = currentWidth / ratio;

		//console.log('ratio. ' + ratio + ' width: ' + currentWidth + ' newHeight:' + newH);
		$(id).height(newH + 'px');
	}

	//gets the width-height ratio of an image given the src
	function getRatio(src)
	{
		var newImg = new Image();
		newImg.src = src;

		var height = newImg.height;
		var width = newImg.width;
		
		//console.log('getRatio:  ' + newImg , 'src: ' + src,  'imgsrc: ' + newImg.src);

		return  width / height;	
	}

	//open up the overlay and the select-box for drawing / uploading
	function showDrawUploadSelect() {
		var screenHeight = $(document).height();
        jQuery("#overlay").css("visibility", "visible").height(screenHeight).animate({ opacity: '0.8' }, "slow");

        $('#uploadDiv').load("upload.php", function(){
        	$("#drawUploadSelect").show();
        })
	}

	//opens up the map 
	function showthetool(mode) {

		$('header').hide();

		 $("#map-container").load("draw-map.html", function(){
		 	 if(mode == 'draw') {
	        	choosedraw();

	        	$("html, body").animate({ scrollTop: 0 }, "slow");
	        }

	        if(mode == 'upload') {
	        	chooseupload();
	        	$("html, body").animate({ scrollTop: 0 }, "slow");
	        }

	        // var freeSpaceH = $(window).height() - $('header').height();
	        var freeSpaceH = $(window).height();
	        var viewportHeigth = freeSpaceH * 0.8;

	        // var paddingTop = freeSpaceH * 0.02;
	        var top = freeSpaceH * 0.05;
	        jQuery("#map-container").css({"visibility": "visible","top": top + "px"});
	        
	        jQuery("#map").hide().css({"visibility":"visible", "height": viewportHeigth + "px"}).show();

	       

	       // jQuery("#incontainer").hide().css({"visibility":"visible", "height": (viewportHeigth+60) + "px"}).show("slow");
		 	
        	// console.log('showthetool: ' + viewportHeigth);
		 }); 


		var screenHeight = $(document).height();
        jQuery("#overlay").css("visibility", "visible").height(screenHeight).animate({ opacity: '0.8' }, "slow");

    }

    function hideAll() {
    	jQuery("#map-container").css("visibility", "hidden");
    	jQuery("#map").hide().css("visibility","hidden");
    	jQuery("#incontainer").hide().css("visibility","hidden");
    	jQuery("#overlay").css("visibility", "hidden");
    	$("#drawUploadSelect").hide();

    	$('header').show();
    	
    }

    function toggleNavi() {
    	$('#header-nav').slideToggle();
    }


    function scrollTo(id){
	    $('html, body').animate({
	        scrollTop: ($('#' + id).offset().top  - 30)
	    }, 500);
	    return false;
	}



/* 
   RESULT MAP
   ========================================================================== */
//****
//this function json from the database as a parameter, goes through all the rows, and returns a geojson-feature collection
// and makes a geojson from it
function createGeoJson(data) {

		// console.log( "Data format from Database: ",  data );
	var features = [];
	
	//for every feature
	for (var i = 0; i < data.length; i++) {
		

		//correctly format the location data
		// data[i].route = data[i].replace(/\n/g,'');
		// data[i] = data[i].replace(/ /g,'');

		var arr = data[i].route.split(";");
		var coordinates = new Array();

		//go through all the coordinate pairs, split them by ',' and put them back into main array
		for (var k = 0; k < arr.length; k++) {
			var x = arr[k].split(",");

		// 	//set individual values to int
			for (var j = 0; j < x.length; j++) {
				x[j] = parseFloat(x[j]);
			};

			coordinates.push(x);
		};
		// console.log(coordinates);

		//build the array for the feature
		features.push({
        	id: data[i].id,
        	type: "Feature",
        	geometry: {
        		type: "LineString",
        		coordinates: coordinates
        	},
        	properties: {
        		gender: data[i].gender,
        		journeyType: data[i].journeyType,
        		weekday: data[i].weekday,
        		comment: data[i].comment,
        		transport: data[i].travelType,
        		distance: data[i].distance,
        		startTime: data[i].startTime,
        		endTime: data[i].endTime,
        		insertTime: data[i].insertTime
        	}
		})	;


	};


	var geojson =   {"type": "FeatureCollection",
		       		"features": features
   				}

	// console.log(geojson);

	return geojson;
}



/*
*	Draws the map using Leaflet and d3js. This needs a featureCollection as input!
*
*/
function drawOutputMap(featureCollection) {
	var filterdistance=0.005;
	var tooltipsheight=20;

	var allCollection = featureCollection;

	var collection = jQuery.extend(true, {}, featureCollection); 

	console.log(featureCollection);

    //second way to do it
    var map = new L.Map("resultMap", {scrollWheelZoom: false, center: [55.960, -3.210], zoom: 14})
	.addLayer(new L.TileLayer("http://{s}.tiles.mapbox.com/v3/lucas-g.jj533h5a/{z}/{x}/{y}.png"));




	resetall();
	var svg;
	var anothersvg;
	var circle;

//
function resetall(circlePoint){

	if(anothersvg)anothersvg.remove();
	anothersvg = d3.select(map.getPanes().overlayPane).append("svg");


	if(svg)svg.remove();
    svg = d3.select(map.getPanes().overlayPane).append("svg"),
		g = svg.append("g").attr("class", "leaflet-zoom-hide");

	//if we want to load data from json:
	// d3.json("datafile/person-01.json", function(collection) {

	  	var transform = d3.geo.transform({point: projectPoint}),
    	path = d3.geo.path().projection(transform);


    	var features = g.selectAll("path")
		    .data(collection.features)
		    .enter().append("path");

		var notPaths = anothersvg.append("g")
			.attr('id','noPaths');

		
		var commentGroups = notPaths.selectAll("g")
		  					.data(collection.features)
		  					.enter()
		  					.append("g")
		  					.attr("class", "commentBox")
		  					.attr("id", function(d,i){
		  						return "commentBox" + i;
		  					})
		  					.attr("display","none");

				 var tooltips = commentGroups.append("rect")
				 					.attr("width", function(d){return d.properties.comment.length*8})
				 					.attr("height", tooltipsheight)
				 					.attr("fill", "#000000")
				 					.attr("opacity",0.7)
				 					.text(function(d){
				 						return "bla";
				 					});

				 	var texts = commentGroups.append("text")
				 				.text("bla")
				 				.attr("fill", "#ffffff")
				 					.text(function(d){
				 						return d.properties.comment;
				 					})
				 				.style("text-anchor", "middle");

		//paint a circle of the selected area, if mouse was clicked
		if (circlePoint){
			console.log('circle is set');
			var c = anothersvg.append('circle')
					.attr('class','juhuu')
					.attr('r',function(d){
						var tempcc=map.latLngToLayerPoint(new L.LatLng(circlePoint.lat,circlePoint.lng+filterdistance+0.002));
						var cc=map.latLngToLayerPoint(circlePoint);

						return tempcc.x-cc.x;})
					.attr('cy', function(d){var cc=map.latLngToLayerPoint(circlePoint); return cc.y;})
					.attr('cx',function(d){var cc=map.latLngToLayerPoint(circlePoint); return cc.x;})
					.attr('fill', '#454549')
					.attr('opacity','0.5');
		}

		map.on("viewreset", reset);
		reset();

		//necessary to redraw the svg when user zooms out
		function reset() {
		  	var bounds = path.bounds(collection),
		    topLeft = bounds[0],
		    bottomRight = bounds[1];

		    svg .attr("width", bottomRight[0] - topLeft[0])
		    .attr("height", bottomRight[1] - topLeft[1])
		    .style("left", topLeft[0] + "px")
		    .style("top", topLeft[1] + "px");
			d3.select("body").selectAll("g").attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
		  	
// <<<<<<< HEAD
// 		    anothersvg.attr("width", 3000)
// 		    .attr("height",3000)
// 		    .style("left", topLeft[0] + "px")
// 		    .style("top", topLeft[1] + "px");

// =======
// >>>>>>> f5a8c566915e2ad61aeb72c3f8c7100dc2b0b7e7

			var w = $('#resultMap').width();
			var h = $('#resultMap').height();
			console.log('width:' + w);

			notPaths
				.attr('transform', 'translate(' + topLeft[0] + "," + topLeft[1] + ')');

				console.log(topLeft[0],topLeft[1]);

		    anothersvg
			    .attr("width", w)
			    .attr("height",h);
			    // .style("left", topLeft[0] + "px")
			    // .style("top", topLeft[1] + "px");


		  	features.attr("d", path)
		  	.attr("class", function(d) { 
		  		if(d.properties.transport == "bike") {
		  			return "journey bike";
		  		}
		  		else if (d.properties.transport == "walk"){
		  			return "journey walk";
		  		}
		  		else if (d.properties.transport == "car"){
		  			return "journey car";
		  		}
		  		else {
		  			return "journey"; 
		  		}
		  	})
		  	.on("mouseover", mouseOverLine)
		  	.on("mouseout", mouseOutLine);

			texts.attr("y", function(d,i) {
	 						// console.log(d.geometry.coordinates[0]);

	 						var bla = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[Math.floor(d.geometry.coordinates.length/2)][1],d.geometry.coordinates[Math.floor(d.geometry.coordinates.length/2)][0]));

	 						// var bla = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[0][1],d.geometry.coordinates[0][0]));


	 						return bla.y+3+(tooltipsheight/2);
	 					})
	 					.attr("x", function(d,i){
	 						var bla = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[Math.floor(d.geometry.coordinates.length/2)][1],d.geometry.coordinates[Math.floor(d.geometry.coordinates.length/2)][0]));
	 						return bla.x+(d.properties.comment.length*8/2);
	 						return bla.x;
	 					})

			tooltips.attr("y", function(d,i) {
	 						console.log(d.geometry.coordinates[0]);
	 						var bla = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[Math.floor(d.geometry.coordinates.length/2)][1],d.geometry.coordinates[Math.floor(d.geometry.coordinates.length/2)][0]));
	 						console.log(bla.y);

	 						// console.log(d.geometry.coordinates[0]);
	 						// var bla = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[0][1],d.geometry.coordinates[0][0]));


	 						return bla.y;
	 					})
	 					.attr("x", function(d,i){
	 						var bla = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[Math.floor(d.geometry.coordinates.length/2)][1],d.geometry.coordinates[Math.floor(d.geometry.coordinates.length/2)][0]));
	 						return bla.x;
	 					})


		}

	// });

		function mouseOverLine(d,i) {
			d3.select(this)
				.transition().duration(100).style('stroke-width',6);

			$(".commentBox").hide();
			$("#commentBox" + i).show();
		}

		function mouseOutLine(d,i) {
			d3.select(this)
				.transition().duration(100).style('stroke-width', 3);
		}

	}

	map.on('click', function (ev) {
        var pointclicked= ev.latlng;

        console.log(pointclicked);

        collection.features.splice(0,collection.features.length);
        for(var i=0;i<allCollection.features.length;i++)
        {
        	var coordinlength=allCollection.features[i].geometry.coordinates.length-1;

        	var distancetoend=((allCollection.features[i].geometry.coordinates[coordinlength][1]-pointclicked.lat)*(allCollection.features[i].geometry.coordinates[coordinlength][1]-pointclicked.lat))+
        			((allCollection.features[i].geometry.coordinates[coordinlength][0]-pointclicked.lng)*(allCollection.features[i].geometry.coordinates[coordinlength][0]-pointclicked.lng));
        	var distancetostart=((allCollection.features[i].geometry.coordinates[0][1]-pointclicked.lat)*(allCollection.features[i].geometry.coordinates[0][1]-pointclicked.lat))+
        			((allCollection.features[i].geometry.coordinates[0][0]-pointclicked.lng)*(allCollection.features[i].geometry.coordinates[0][0]-pointclicked.lng))
        	
        	// var epointinjson= new L.LatLng(allCollection.features[i].geometry.coordinates[coordinlength][1],allCollection.features[i].geometry.coordinates[coordinlength][0]);//end point
        	// var spointinjson= new L.LatLng(allCollection.features[i].geometry.coordinates[0][1],allCollection.features[i].geometry.coordinates[0][0]);//start point
        	if(distancetoend<filterdistance*filterdistance||distancetostart<filterdistance*filterdistance){
        		collection.features[collection.features.length]=allCollection.features[i];
        	}
        }
        console.log(collection);
        circle = true;
        resetall(pointclicked);


    } );


	//necessary to map from d3 to leavelet
	function projectPoint(x, y) {
	  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
	  this.stream.point(point.x, point.y);
	}

	
} //end draw map


/* 
   Comment Map
   ========================================================================== */

function drawCommentOutput(featureCollection) {
	$('#commentOutput').load("commentOutput.html", function(){
		var features = featureCollection.features;

		for(var i = 0; i < features.length; i++) {

			var comment = features[i].properties.comment;
			// console.log(comment);

			if(comment != "" && comment != null) {
				//set the classes for filtering
				var classes = features[i].properties.transport;
				if(features[i].properties.weekday == 1) {
					classes = classes + ' ' + "weekday";
				}

				$('#comment-pane').append("<div class='comment column-4 " + classes + "' onclick='showComment();'><div class='comment-text'><p>" + comment + "</p></div></div>");
			}
		}
	});
}

function filterTransport(elem, mode) {
	console.log(mode);
	$(elem).toggleClass("clicked");
	$('#comment-pane').toggleClass(mode);
}

function showComment(){

	// console.log('showComment was called');
	// $('#overlayComment').show();
	// var screenHeight = $(document).height();
 //        jQuery("#overlay").css("visibility", "visible").height(screenHeight).animate({ opacity: '0.8' }, "slow");
}

