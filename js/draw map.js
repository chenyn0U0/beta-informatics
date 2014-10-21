﻿
    L.mapbox.accessToken = 'pk.eyJ1IjoiY2hlbnluIiwiYSI6IkRBU0ZmMzAifQ.1oP7qZOoEwDsY86U5UrB-g';
    var map = L.mapbox.map('map', 'examples.map-i86nkdio',{doubleClickZoom: false, attributionControl: true })
    .setView([55.964042, -3.21850], 15)
     .addControl(L.mapbox.geocoderControl('mapbox.places-v1')); ;

    //用来控制的全局变量们！ヾ(●ω●)ノ
    var drawingornot = false;
    var timecompare; //悲惨地用系统时间来防止单击问题QUQ
    var pointshow;//鱼唇地用来在结束的时候划上最后一个点
    //_(:з」∠)_
    var cdn = new Array();
    var pointGroup = new Array();

    //_(:з」∠)_
    var container = document.getElementById('distance');
    //_(:з」∠)_


    map.getContainer().querySelector('#statue').onclick = function () {
        if (this.className != 'active') {
            if(cdn.length==0){
            drawingornot = false;
            undo.className = '';
            finish.className = '';
            cancel.className = '';
            this.className = 'active';
            container.innerHTML = 'Click on the map to draw your point of departure first.';
            }
            else
            { var startconfirm=confirm("You have already done your route. Are you sure you want to clear all the data and do it again?");
            if(startconfirm==true)
            {
            cdn.splice( 0, cdn.length );
            pointGroup.splice(0,pointGroup.length);
            pointshow=null;
            drawingornot = false;
            undo.className = '';
            finish.className = '';
            cancel.className = '';
            this.className = 'active';
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
        statue.className = '';
        undo.className = 'cannotsee';
        finish.className = 'cannotsee';
        cancel.className = 'cannotsee';
        container.innerHTML = 'Click "Start drawing" to draw your route.';
        }
        else{
        if(confirm("You cannot edit your present route again after submitting. Are you sure you want to finish drawing?")==true)
        {
        statue.className = '';
        undo.className = 'cannotsee';
        finish.className = 'cannotsee';
        cancel.className = 'cannotsee';
        pointshow=cdn[cdn.length-1];
        }}

        var myDate = new Date();
        timecompare = myDate.getTime();
    };
    map.getContainer().querySelector('#cancel').onclick = function () {
        if(cdn.length==0)
        {
        statue.className = '';
        undo.className = 'cannotsee';
        finish.className = 'cannotsee';
        cancel.className = 'cannotsee';
        container.innerHTML = 'Click "Start drawing" to draw your route.';
        }
        else{
        if(confirm("Are you sure you want to clear all the data you have drawn?")==true)
        {
        statue.className = '';
        undo.className = 'cannotsee';
        finish.className = 'cannotsee';
        cancel.className = 'cannotsee';
            cdn.splice( 0, cdn.length );
            pointGroup.splice(0,pointGroup.length);
            pointshow=null;
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

            var distances=0;
       if (pointGroup.length > 1) {
       for(var i = 0;i<pointGroup.length-1;i++)
       {distances = distances + Number((pointGroup[i].distanceTo(pointGroup[i+1])).toFixed(0));}
       container.innerHTML = 'Total distance:' + distances + 'm';
        } else {container.innerHTML = 'Click to draw your route';}
        
}


);

