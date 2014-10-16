<%@ Page Language="C#" AutoEventWireup="true" CodeFile="test.aspx.cs" Inherits="test" %>


<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8 />
<title>Distance between two markers</title>
<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
<script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.css' rel='stylesheet' />
<style>
  body { margin:0; padding:0; }
  #map { position:absolute; top:0; bottom:0; width:100%; }
</style>
</head>
<body>
    <form id="form1" runat="server">
<style>
pre.ui-distance {
  position:absolute;
  bottom:10px;
  left:10px;
  padding:5px 10px;
  background:rgba(0,0,0,0.5);
  color:#fff;
  font-size:11px;
  line-height:18px;
  border-radius:3px;
  }
</style>
<div id='map'>
   
    </div>
<pre id='distance' class='ui-distance'>Click to place a marker</pre>

<script>
    L.mapbox.accessToken = 'pk.eyJ1IjoiY2hlbnluIiwiYSI6IkRBU0ZmMzAifQ.1oP7qZOoEwDsY86U5UrB-g';
    var map = L.mapbox.map('map', 'examples.map-i86nkdio')
    .setView([55.964042, -3.21850], 15);

    // Start with a fixed marker.
    var fixedMarker = L.marker(new L.LatLng(55.964042, -3.218500), {
        icon: L.mapbox.marker.icon({
            'marker-color': 'ff8888'
        })
    }).bindPopup('Mapbox DC').addTo(map);

    // Store the fixedMarker coordinates in a variable.
    var fc = fixedMarker.getLatLng();

    // Create a featureLayer that will hold a marker and linestring.
    var featureLayer = L.mapbox.featureLayer().addTo(map);

    //哟!
    var markergroup= new Array();
    //哟!

    // When a user clicks on the map we want to
    // create a new L.featureGroup that will contain a
    // marker placed where the user selected the map and
    // a linestring that draws itself between the fixedMarkers
    // coordinates and the newly placed marker.
    map.on('click', function (ev) {
        // ev.latlng gives us the coordinates of
        // the spot clicked on the map.
        //  var c = ev.latlng;

        //哟!
        alert(markergroup.length);
        markergroup[markergroup.length] = ev.latlng;
        alert(markergroup.length);
        //哟!
        for (i = 0; i < markergroup.length; i++) {
            var geojson = [
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [markergroup[i].lng, markergroup[i].lat]
          },
          "properties": {
              "marker-color": "#ff8888"
          }
      }, {
          "type": "Feature",
          "geometry": {
              "type": "LineString",
              "coordinates": [
            [fc.lng, fc.lat],
            [markergroup[i].lng, markergroup[i].lat]
          ]
          },
          "properties": {
              "stroke": "#000",
              "stroke-opacity": 0.5,
              "stroke-width": 4
          }
      }
    ];

            featureLayer.setGeoJSON(geojson);
        }
        // Finally, print the distance between these two points
        // on the screen using distanceTo().

        // var container = document.getElementById('distance');
        // container.innerHTML = (fc.distanceTo(c)).toFixed(0) + 'm';
    });
</script>
    </form>
</body>
</html>