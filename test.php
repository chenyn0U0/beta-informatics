<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Test php</title>

	<link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.css' rel='stylesheet' />
	<link rel="stylesheet" href="css/inputMap.css" media="screen" type="text/css" />
	<link rel="stylesheet" href="css/main.css" media="screen" type="text/css" />
	<link rel="stylesheet" href="css/visualization.css" media="screen" type="text/css" />
	<link rel="stylesheet" href="css/slider.css">
	<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css" />
	<link rel="stylesheet" href="css/grid.css">
  	

	<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script src="js/jquery.js"></script>
	<script src="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.js"></script> <!-- needs to be before mapbox! -->
	<script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.js'></script>
	<script type="text/javascript" src="js/jquery-1.7.js"></script>
	<script type="text/javascript" src="js/SelectSimu.js"></script>
	<script src="js/responsiveslides.min.js"></script>
  	<script src="js/util.js"></script>
</head>
<body>
	
test bla bla

<script>
	$(document).ready(function() {

	//initialize resultMap
  		// $.get( "loadData.php?mode=oneRow&id=45", function( data ) {
		$.get( "loadData.php?mode=getColumnByName&name=gender", function( data ) {
		//use underscore.js for transformation?

		// var jsonData = JSON.parse(data);

		// var collection = createGeoJson(jsonData);

			console.log("here", data );

			// drawOutputMap(collection);

		});
});
</script>


</body>
</html>