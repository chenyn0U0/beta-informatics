﻿
    L.mapbox.accessToken = 'pk.eyJ1IjoiY2hlbnluIiwiYSI6IkRBU0ZmMzAifQ.1oP7qZOoEwDsY86U5UrB-g';
    var map = L.mapbox.map('map', 'chenyn.jp82gon5',{doubleClickZoom: false, attributionControl: true })
    .setView([55.964042, -3.21850], 15)
     .addControl(L.mapbox.geocoderControl('mapbox.places-v1')); ;

    //用来控制的全局变量们！ヾ(●ω●)ノ
    var drawingornot = false;
    var timecompare; //悲惨地用系统时间来防止单击问题QUQ
    var pointshow;//鱼唇地用来在结束的时候划上最后一个点
    //_(:з」∠)_
    var cdn = new Array();
    var pointGroup = new Array();
    var distances=0;
    //_(:з」∠)_
    var container = document.getElementById('distance');
    //_(:з」∠)_


    map.getContainer().querySelector('#statue').onclick = function () {
        if (this.className != 'active') {
            if(cdn.length==0){
showdrawing();
            container.innerHTML = 'Click on the map to draw your point of departure first.';
            }
            else
            { var startconfirm=confirm("You have already done your route. Are you sure you want to clear all the route and do it again?");
            if(startconfirm==true)
            {
clearallpoints();
showdrawing();
            container.innerHTML = 'Click on the map to draw your point of departure first.';
            }else{};
            }

        }
        var myDate = new Date();
        timecompare = myDate.getTime();
    };
    map.getContainer().querySelector('#undo').onclick = function () {
    
        var myDate = new Date();
        timecompare = myDate.getTime();
        if(cdn.length==1){pointshow=null;container.innerHTML = 'Click on the map to draw your point of departure first.';}else{}
    cdn.splice(cdn.length-1,1);
    pointGroup.splice(pointGroup.length-1,1);

      

    };
    map.getContainer().querySelector('#finish').onclick = function () {
        if(cdn.length==0)
        {
         showonlystart();
        container.innerHTML = 'Click "Start drawing" to draw your route.';
        }
        else{
        if(confirm("You cannot edit your present route again after submitting. Are you sure you want to finish drawing?")==true)
        {
         showonlystart();
        pointshow=cdn[cdn.length-1];
        }}

        var myDate = new Date();
        timecompare = myDate.getTime();
    };
    map.getContainer().querySelector('#cancel').onclick = function () {
        if(cdn.length==0)
        {
 showonlystart();
        container.innerHTML = 'Click "Start drawing" to draw your route.';
        }
        else{
        if(confirm("Are you sure you want to clear all the route you have drawn?")==true)
        {
       showonlystart();
       clearallpoints();
            container.innerHTML = 'Click "Start drawing" to draw your route.';
        }}


        var myDate = new Date();
        timecompare = myDate.getTime();
    };

    // Create a featureLayer that will hold a marker and linestring.
    var featureLayer = L.mapbox.featureLayer().addTo(map);



    map.on('click', function (ev) {
        var myDate = new Date();
        if (Number(myDate.getTime()) - Number(timecompare) > 100) {
            if (statue.className == 'active') {
                pointGroup[pointGroup.length] = ev.latlng;
                cdn[cdn.length] = [pointGroup[pointGroup.length - 1].lng, pointGroup[pointGroup.length - 1].lat];
                pointshow=cdn[0];
            } else{};}

                    var geojson = [
                          {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": pointshow
          },
          "properties": {
          "title": "Your Destination",
              "marker-color": "#E575F6",
              "marker-symbol": "star"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": cdn[0]
          },
          "properties": {
              "title": "Your Start Point",
              "marker-color": "#07B1D0",
              "marker-symbol": "bicycle"
          }
      },


       {
       "type": "Feature",
       "geometry": {
           "type": "LineString",
           "coordinates": cdn,
       },
       "properties": {
           "stroke": "#444444",
           "stroke-opacity": 0.5,
           "stroke-width": 4
       }
       }  
    ];
    
        featureLayer.setGeoJSON(geojson);

  /*

  for(i=0;i<2;i++){
                      var geojson2 = [
                          {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": pointshow
          },
          "properties": {
          "title": "Your Destination",
              "marker-color": "#E575F6",
              "marker-symbol": "star"
          }
      },
      {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": cdn[0]
          },
          "properties": {
              "title": "Your Start Point",
              "marker-color": "#07B1D0",
              "marker-symbol": "bicycle"
          }
      },


       {
       "type": "Feature",
       "geometry": {
           "type": "LineString",
           "coordinates": cdn,
       },
       "properties": {
           "stroke": "#444444",
           "stroke-opacity": 0.1,
           "stroke-width": 4
       }
       }  
    ];

    geojson2[2].properties['stroke'] = '#ff8888';
    L.mapbox.featureLayer(geojson2).addTo(map);

}



  */


       distances=0;
       if (pointGroup.length > 1) {
       for(var i = 0;i<pointGroup.length-1;i++)
       {distances = distances + Number((pointGroup[i].distanceTo(pointGroup[i+1])).toFixed(0));}
       container.innerHTML = 'Total distance:' + distances + 'm';
        } else {container.innerHTML = 'Click to draw your route';}
        
}


);

function showonlystart()
{
        statue.className = '';
        undo.className = 'cannotsee';
        finish.className = 'cannotsee';
        cancel.className = 'cannotsee';
        //infobar.className ='infobar';
            jQuery("#infobar").animate({
            width: '250px'},"slow");
}

function showdrawing()
{
            drawingornot = false;
            undo.className = '';
            finish.className = '';
            cancel.className = '';
            //infobar.className ='cannotsee';
            jQuery("#infobar").animate({
            width: '0px'},"slow");
            
            statue.className = 'active';
}


function clearallpoints()
{
            cdn.splice( 0, cdn.length );
            pointGroup.splice(0,pointGroup.length);
            pointshow=null;
}





//=============================存储数据用===============================
function formCheck()
{
givevalue();
 var nullitems="";
  var startTime = document.getElementById("startTime");
  var endTime=document.getElementById("endTime");
    if(cdn=="") nullitems+="route,";
    if(startTime.value=="") nullitems+="journey start time,";
    if(endTime.value=="") nullitems+="journey end time,";
    if(nullitems=="") return true;
    else return cannotnull(nullitems);

}



function cannotnull(nullitem)
{
  alert("Please enter your "+nullitem+".");
  return false;
}

function givevalue()
{
  var textforstartpoint="";
var textforendpoint="";
var textforroute="";
textforstartpoint="POINT("+cdn[0][0]+" "+cdn[0][1]+")";
textforendpoint="POINT("+cdn[cdn.length-1][0]+" "+cdn[cdn.length-1][1]+")";
for(var i=0;i<cdn.length;i++)
{
if(textforroute=="")textforroute="LineString("+cdn[i][0]+" "+cdn[i][1];
 else textforroute+=", "+cdn[i][0]+" "+cdn[i][1];
}
textforroute+=")";
alert(textforroute+"|"+textforstartpoint+"|"+textforendpoint);


    document.getElementById("distances").value=distances;
    document.getElementById("route").value=textforroute;
    document.getElementById("startPoint").value=textforstartpoint;
    document.getElementById("endPoint").value=textforendpoint;

}



//=============================存储数据用===============================



//=============================好看点用===============================


function bikeclick()
{
alert("bike");
}


function carclick()
{
  alert("car");
}

function walkclick()
{
  alert("walk");
}












//=============================好看点用===============================