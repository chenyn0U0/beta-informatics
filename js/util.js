


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
	function showthetool() {

		 $("#map-container").load("draw-map.html", function(){

	        var freeSpaceH = $(window).height() - $('header').height();
	        var viewportHeigth = freeSpaceH * 0.7;

	        var paddingTop = freeSpaceH * 0.15;
	        jQuery("#map-container").css({"visibility": "visible","padding-top": paddingTop + "px"});
	        
	        jQuery("#map").hide().css({"visibility":"visible", "height": viewportHeigth + "px"}).show("slow");
		 	
		 }); 


		var screenHeight = $(document).height();
        jQuery("#overlay").css("visibility", "visible").height(screenHeight).animate({ opacity: '0.8' }, "slow");

        console.log('showthetool: ' + viewportHeigth);
    }

    function hideAll() {
    	jQuery("#map-container").css("visibility", "hidden");
    	jQuery("#map").hide().css("visibility","hidden");
    	jQuery("#overlay").css("visibility", "hidden");
    	$("#drawUploadSelect").hide();
    	
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

	var features = [];
	
	//for every feature
	for (var i = 0; i < data.length; i++) {
		

		//correctly format the location data
		// data[i].route = data[i].replace(/\n/g,'');
		// data[i] = data[i].replace(/ /g,'');

		// // console.log( "Load was performed.",  data );
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
        		comment: data[i].comment

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

	var collection = featureCollection;
	console.log(featureCollection);

    //second way to do it
    var map = new L.Map("resultMap", {center: [55.960, -3.210], zoom: 14})
	.addLayer(new L.TileLayer("http://{s}.tiles.mapbox.com/v3/kimrdot.k7jn77op/{z}/{x}/{y}.png"));

    var svg = d3.select(map.getPanes().overlayPane).append("svg"),
		g = svg.append("g").attr("class", "leaflet-zoom-hide");

	//if we want to load data from json:
	// d3.json("datafile/person-01.json", function(collection) {

	  	var transform = d3.geo.transform({point: projectPoint}),
    	path = d3.geo.path().projection(transform);

    	var feature = g.selectAll("path")
		    .data(collection.features)
		  .enter().append("path");


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
			g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
		  	
		  	feature.attr("d", path)
		  	.attr("class", function(d) { return "journey" });
		}

	// });


	//necessary to map from d3 to leavelet
	function projectPoint(x, y) {
	  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
	  this.stream.point(point.x, point.y);
	}

	
}