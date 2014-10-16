<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>
 
<head> 
    <meta charset=utf-8 />
<title>Draw the route</title>
<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
<script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.css' rel='stylesheet' />
<style>
  body { margin:0; padding:0; }
  #map { position:absolute; top:0; bottom:0; width:100%; }
</style>

    
 <link rel="stylesheet" href="css/style.css" media="screen" type="text/css" />
   
</head> 
 
 
 
<body onload="initialize()">
<div id="container">


  

<div class="sidebar">     <form id="form1" runat="server"> 
   <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
  <h1><i class="fa fa-bars push"></i>Animated <span class="color">Menu</span></h1>
    <ul>
    <li><a href="#"><i class="fa fa-dashboard push"></i>Dashboard<i class="fa fa-angle-right"></i></a><span class="hover"></span>
    </li>
    <li><a href="#"><i class="fa fa-user push"></i>Users<i class="fa fa-angle-right"></i></a><span class="hover"></span>
      <ul class="sub-menu">
         <li><a href="#">Add User<i class="fa fa-angle-right"></i></a><span class="hover"></span></li>
         <li><a href="#">Manage Users<i class="fa fa-angle-right"></i></a><span class="hover"></span></li>
      </ul>
    </li>
    <li><a href="#"><i class="fa fa-cog push"></i>Settings<i class="fa fa-angle-right"></i></a><span class="hover"></span>
     <ul class="sub-menu">
         <li><a href="#">Dashboard Settings<i class="fa fa-angle-right"></i></a><span class="hover"></span></li>
         <li><a href="#">Profile Settings<i class="fa fa-angle-right"></i></a><span class="hover"></span></li>
        <li><a href="#">Manage Menu<i class="fa fa-angle-right"></i></a><span class="hover"></span></li>
       <li><a href="#">User Profiles<i class="fa fa-angle-right"></i></a><span class="hover"></span></li>
      </ul></li>
    <li><a href="#"><i class="fa fa-picture-o push"></i>appearance<i class="fa fa-angle-right"></i></a><span class="hover"></span>
        <ul class="sub-menu">
         <li><a href="#">Change Theme<i class="fa fa-angle-right"></i></a><span class="hover"></span>
          </li>
         <li><a href="#">Theme Options<i class="fa fa-angle-right"></i></a><span class="hover"></span></li>
      </ul>
    </li>
    <li><a href="#"><i class="fa fa-file push"></i>Information<i class="fa fa-angle-right"></i></a><span class="hover"></span>
        <ul class="sub-menu">
         <li><a href="#">Latest News<i class="fa fa-angle-right"></i></a><span class="hover"></span>
          </li>
         <li><a href="#">Recent Articles<i class="fa fa-angle-right"></i></a><span class="hover"></span></li>
      </ul>
    </li>
    <li><a href="#"><i class="fa fa-plane push"></i>Contact<i class="fa fa-angle-right"></i></a><span class="hover"></span></li>
  </ul>
   <script src='js/jquery.js'></script>

  <script src="js/index.js"></script> 
</div>
 

<div class="content">
<div style="width:200px; height:40px; float:left; z-index:9000; border: 10px solid #d00355;">jskldfdskljflkdsjlfjdsljflkdsjlfk</div>
<div  style=" z-index:0;">
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
<pre id='distance' class='ui-distance'>Click to draw your route</pre>

<script>
    L.mapbox.accessToken = 'pk.eyJ1IjoiY2hlbnluIiwiYSI6IkRBU0ZmMzAifQ.1oP7qZOoEwDsY86U5UrB-g';
    var map = L.mapbox.map('map', 'examples.map-i86nkdio')
    .setView([55.964042, -3.21850], 15)
     .addControl(L.mapbox.geocoderControl('mapbox.places-v1')); ;

    //用来控制的全局变量们！ヾ(●ω●)ノ
    var completedornot = false;
    //_(:з」∠)_

    // Create a featureLayer that will hold a marker and linestring.
    var featureLayer = L.mapbox.featureLayer().addTo(map);

    var cdn = new Array();
    var pointGroup = new Array();
    var distance = 0;

    map.on('click', function (ev) {


        pointGroup[pointGroup.length] = ev.latlng;
        cdn[cdn.length] = [pointGroup[pointGroup.length - 1].lng, pointGroup[pointGroup.length - 1].lat];



        var geojson = [
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": cdn[0],
              "title": "Start Point"
          },
          "properties": {
              "marker-color": "#000000"
          }
      },
        /* { "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates":cdn[cdn.length-1]
        },
        "properties": {
        "marker-color": "#ff8888"
        }
        },结束点*/

       {
       "type": "Feature",
       "geometry": {
           "type": "LineString",
           "coordinates": cdn
       },
       "properties": {
           "stroke": "#000",
           "stroke-opacity": 0.5,
           "stroke-width": 4
       }
   }
    ];

        featureLayer.setGeoJSON(geojson);

        if (cdn.length > 1) {
            var container = document.getElementById('distance');
            distance = distance + Number((pointGroup[pointGroup.length - 2].distanceTo(pointGroup[pointGroup.length - 1])).toFixed(0));
            container.innerHTML = 'Total distance:' + distance + 'm';
        }

    });
</script>

</div>
</div>
</div>

</div>
    </form>
</body> 

</html>