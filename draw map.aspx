﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="draw map.aspx.cs" Inherits="Default3" %>

<!DOCTYPE html>
<html>
<head>
<title>Draw the route</title>
<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
<script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.css' rel='stylesheet' />

 <link rel="stylesheet" href="css/style.css" media="screen" type="text/css" />
<style>
  body { margin:0; padding:0; }
  #map { position:absolute; top:0; bottom:0; width:100%; }
</style>
</head>
<body>
    <form id="form1" runat="server">

<div id='map'>
<nav class='menu-ui'>
  <a href='#' id='statue'>Start Drawing</a>
  <a href='#' id='undo' class = 'cannotsee'>Undo last step</a>
  <a href='#' id='finish' class = 'cannotsee'>Finish Drawing</a>
  <a href='#' id='cancel' class = 'cannotsee'>Cancel</a>
</nav>
    </div>
<pre id='distance' class='ui-distance'>Click to draw your route</pre>

<script>
    L.mapbox.accessToken = 'pk.eyJ1IjoiY2hlbnluIiwiYSI6IkRBU0ZmMzAifQ.1oP7qZOoEwDsY86U5UrB-g';
    var map = L.mapbox.map('map', 'examples.map-i86nkdio',{attributionControl: true })
    .setView([55.964042, -3.21850], 15)
     .addControl(L.mapbox.geocoderControl('mapbox.places-v1')); ;

    //用来控制的全局变量们！ヾ(●ω●)ノ
    var drawingornot = false;
    var timecompare; //悲惨地用系统时间来防止单击问题QUQ
    var pointshow;//鱼唇地用来在结束的时候划上最后一个点
    //_(:з」∠)_
    var cdn = new Array();
    var pointGroup = new Array();
    var distances = 0;
    //_(:з」∠)_


    map.getContainer().querySelector('#statue').onclick = function () {
        if (this.className != 'active') {
            if(cdn.length!=0)
            {
            event.returnValue = confirm("You have already done your route. Are you sure you want to clear all the data and do it again?");
            /*!!!!待添加清除数组以及距离信息
            drawingornot = false;
            undo.className = '';
            finish.className = '';
            cancel.className = '';
            this.className = 'active';*/
            }
            else{
            drawingornot = false;
            undo.className = '';
            finish.className = '';
            cancel.className = '';
            this.className = 'active';
            }
        }
        var myDate = new Date();
        timecompare = myDate.getTime();
    };
    map.getContainer().querySelector('#undo').onclick = function () {
        var myDate = new Date();
        timecompare = myDate.getTime();
    };
    map.getContainer().querySelector('#finish').onclick = function () {
        var myDate = new Date();
        timecompare = myDate.getTime();
        statue.className = '';
        undo.className = 'cannotsee';
        finish.className = 'cannotsee';
        cancel.className = 'cannotsee';
        pointshow=cdn[cdn.length-1];
    };
    map.getContainer().querySelector('#cancel').onclick = function () {
        var myDate = new Date();
        timecompare = myDate.getTime();
    };

    // Create a featureLayer that will hold a marker and linestring.
    var featureLayer = L.mapbox.featureLayer().addTo(map);



    map.on('click', function (ev) {
        var myDate = new Date();
        if (Number(myDate.getTime()) - Number(timecompare) < 10) { }
        else {
            if (statue.className == 'active') {
                pointGroup[pointGroup.length] = ev.latlng;
                cdn[cdn.length] = [pointGroup[pointGroup.length - 1].lng, pointGroup[pointGroup.length - 1].lat];
                pointshow=cdn[0];
            } else;}

                    var geojson = [
                          {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": pointshow
          },
          "properties": {
              "marker-color": "#000000"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": cdn[0]
          },
          "properties": {
              "marker-color": "#333333"
          }
      },


       {
       "type": "Feature",
       "geometry": {
           "type": "LineString",
           "coordinates": cdn,
       },
       "properties": {
           "stroke": "#000",
           "stroke-opacity": 0.5,
           "stroke-width": 4
       }
       }  
    ];
    
        featureLayer.setGeoJSON(geojson);

       if (pointGroup.length > 1) {
            var container = document.getElementById('distance');
            distances = distances + Number((pointGroup[pointGroup.length - 2].distanceTo(pointGroup[pointGroup.length - 1])).toFixed(0));
            container.innerHTML = 'Total distance:' + distances + 'm';
        } else container.innerHTML = 'Click to draw your route';
        
});
</script>
    </form>
</body>
</html>