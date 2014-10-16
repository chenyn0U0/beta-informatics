<%@ Page Language="C#" AutoEventWireup="true" CodeFile="for fun.aspx.cs" Inherits="_Default" %>

<!doctype html> 
 
<html> 
 
<head> 
 <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" /> 
 
 
    <title>Google Map V3</title> 


    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"> 
 
    <!-- add google map api --> 
 
    </script> 
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
  </ul></form>
   <script src='js/jquery.js'></script>

  <script src="js/index.js"></script> 
</div>
 

<div class="content">


    <iframe width='100%' height='100%' frameBorder='0' 
    src='https://a.tiles.mapbox.com/v4/wangs2718.j4jfg6ml/attribution,zoompan,zoomwheel,geocoder,share.html?access_token=pk.eyJ1Ijoid2FuZ3MyNzE4IiwiYSI6IkliNFlxVnMifQ.neE8x-q88vUI78m_IU0l4w'>
</iframe>
</div>

</div>

</div>
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
