<%@ Page Language="C#" AutoEventWireup="true" CodeFile="test2.aspx.cs" Inherits="test2" %>
<!doctype html> 
 
<html> 
 
<head> 
 <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" /> 
 
 
    <title>Google Map V3</title> 


    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"> 
 
    <!-- add google map api --> 
 
    </script> 
 
</head> 
 
 
 
<body onload="initialize()">
 
   <center> <div id="map" style="width: 800px; height: 600px;"> 
 
    </div> 
 
 
<input type="button" value="保存" onclick="return confirm('你确定要保存该地址么？'),save()">
 
<div id="conteng">
 
你选择的经纬度为：<span id="j"></span>
 
</div>
 </center>
</body> 
 
</html> 
 

<script type="text/javascript">
 
 
 
var map;
 
var lanlngs = new google.maps.LatLng(55.962042, -3.21050);
 
var info;
 
var markers=[];
 
function initialize(){
 
var mapOption = {
 
zoom:13,
 
center:lanlngs,
 
mapTypeId: google.maps.MapTypeId.ROADMAP,
 
title :"选为地址",
 
}
 
map = new google.maps.Map(document.getElementById('map'),mapOption);
 
 
google.maps.event.addListener(map, 'click', function(event) {
 
addMarker(event.latLng);
 
});
 
 
}
 
 
 
function addMarker(location) {
 
for(i in markers){
 
markers[i].setMap(null);
 
}
 
marker = new google.maps.Marker({
 
position: location,
 
map: map,
 
});
 
var center = marker.getPosition();
 
markers.push(marker);
 
info = marker.getPosition();
 
 
}
 
function save(){
 
document.getElementById('j').innerHTML=info;
 
}
 
</script>
