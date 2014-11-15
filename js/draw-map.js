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

        updateroute();
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

getdistance();

        
}


);



function getdistance()
{
         distances=0;
       if (pointGroup.length > 1) {
       for(var i = 0;i<pointGroup.length-1;i++)
       {distances = distances + Number((pointGroup[i].distanceTo(pointGroup[i+1])).toFixed(0));}
       container.innerHTML = 'Total distance:' + distances + 'm';
        } else {container.innerHTML = 'Click to draw your route';}
}



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
            datainput.outerHTML=datainput.outerHTML; 
}


function updateroute()
{
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

}


//=============================存储数据用===============================
function formCheck()
{

  var nullitems="";
  var startTime = document.getElementById("startTime");
  var endTime=document.getElementById("endTime");
    if(cdn=="") nullitems+=" route.";else;
    if(st1.value==""||st2.value=="") nullitems+=" journey start time.";else;
    if(et1.value==""||et2.value=="") nullitems+=" journey end time.";else;
    if(traveltool=="") nullitems+=" tool for transportation.";else;
    if(nullitems==""&&timecheck()!="")
     {//表单成功开始上传
        givevalue();
        var startconfirm=confirm("COMFIRMATION: Are you sure to submit your data?");
        if(startconfirm==true)
        {
          $.post("saveData.php", $("#formId").serialize());
          alert("Thank you for your cooperation!");
          return true;
        }
        else return false;
      }
    else return cannotnull(nullitems);
     
    }

function cannotnull(nullitem)
{
  if(nullitem!="")  alert("Please complete your"+nullitem);
  else alert("Time input is not allowed.");
  return false;
}

function givevalue()
{
var textforstartpoint="";
var textforendpoint="";
var textforroute="";
textforstartpoint=cdn[0][0]+","+cdn[0][1];
textforendpoint=cdn[cdn.length-1][0]+","+cdn[cdn.length-1][1];
for(var i=0;i<cdn.length;i++)
{
if(textforroute=="")textforroute=cdn[i][0]+","+cdn[i][1];
 else textforroute+=";"+cdn[i][0]+","+cdn[i][1];
}

    document.getElementById("distances").value=distances;
    document.getElementById("route").value=textforroute;
    document.getElementById("startPoint").value=textforstartpoint;
    document.getElementById("endPoint").value=textforendpoint;
    document.getElementById("travelType").value=traveltool;
    document.getElementById("startTime").value=st1.value+":"+st2.value;
    document.getElementById("endTime").value=et1.value+":"+et2.value;
var valuegot= document.getElementsByName("selectInput"); //获得text
document.getElementById("age").value=valuegot[0].value;
if (valuegot[1].value)document.getElementById("gender").value="Female";
else document.getElementById("gender").value="Male";
if(valuegot[2].value==0) document.getElementById("journey").value="Work";
if(valuegot[2].value==1) document.getElementById("journey").value="School";
if(valuegot[2].value==2) document.getElementById("journey").value="Take children to school";
if(valuegot[2].value==3) document.getElementById("journey").value="Other";

}

function timecheck()
{
  if (st1.value<=24&&st1.value>=0&&st2<=60&&st2>=0&&et1.value<=24&&et1.value>=0&&et2<=60&&et2>=0) return "";
  else return "Time input is not allowed.";
}


function hidemap()
{
      jQuery("#map-container").css("visibility", "hidden");
      jQuery("#incontainer").hide().css("visibility","hidden");
      jQuery("#overlay").css("visibility", "hidden");
}


//=============================存储数据用===============================


//==================上传数据用===========================

var datatext="";
var beforecdn=new Array();
var beforestartpoint=new Array();
var beforeendpoint=new Array();

    function datatotext() {
        var oFReader = new FileReader();
        oFReader.readAsText(document.getElementById("datainput").files[0]);
// 读文件时运行
        oFReader.onload = function(data) {
          //存储data内容
        datatext=data.target.result;

//判断文件类型
  var filename = datainput.value; 
  var mime = filename.toLowerCase().substr(filename.lastIndexOf(".")); 

  if(mime==".gpx") 
  { 
  gpxread(datatext);
  }
  else if(mime==".kml")
  {
    kmlread(datatext);
  }
  else if(mime==".json")
  {
    geojsonread(datatext);
  }
  else
  {
  alert("Please upload a gpx or geojson file."); 
  datainput.outerHTML=datainput.outerHTML; 
  }
        };
    };

//GPX
function gpxread(datatext){
  try{
            $("#imadivbutyoucannotseemehahaha").html(datatext);
            var x=$("trkpt").first();
            var beforecdn=new Array();
            var beforestartpoint=[Number(x.attr("lon")),Number(x.attr("lat"))];
            var beforeendpoint;
            var beforpointgroup=new Array();
            while(x.attr("lat"))
            {
                   beforecdn[beforecdn.length]=[Number(x.attr("lon")),Number(x.attr("lat"))];
                   beforpointgroup[beforpointgroup.length]=new L.LatLng(Number(x.attr("lat")),Number(x.attr("lon")));
                   beforeendpoint=[Number(x.attr("lon")),Number(x.attr("lat"))];
                   x=x.next();
            } 
            cdn=beforecdn;
            pointGroup=beforpointgroup;
            pointshow=beforeendpoint;
            updateroute();
            getdistance();
            alert("done");}
  catch(e){alert("Your file is not correct");  datainput.outerHTML=datainput.outerHTML; }
}

function geojsonread(datatext){
  try{
    datatext = datatext.replace(/\n/g,''); 
    datatext = datatext.replace(/\s/g,''); 
datatext=datatext.split("coordinates")[1].split(":[[")[1].split("]]")[0];
var beforebeforecdn=datatext.split("],[");
            var beforecdn=new Array();
            var beforestartpoint=[Number(beforebeforecdn[0].split(",")[0]),Number(beforebeforecdn[0].split(",")[1])];
            var beforeendpoint;
            var beforpointgroup=new Array();
for(var i=0;i<beforebeforecdn.length;i++)
{
  beforecdn[i]=[Number(beforebeforecdn[i].split(",")[0]),Number(beforebeforecdn[i].split(",")[1])];
  beforeendpoint=[Number(beforebeforecdn[i].split(",")[0]),Number(beforebeforecdn[i].split(",")[1])];
  beforpointgroup[i]=new L.LatLng(Number(beforebeforecdn[i].split(",")[0]),Number(beforebeforecdn[i].split(",")[1]));

}
            cdn=beforecdn;
            pointGroup=beforpointgroup;
            pointshow=beforeendpoint;
            updateroute();
            getdistance();
            alert("done");
          }
  catch(e){alert("Your file is not correct");  datainput.outerHTML=datainput.outerHTML;}
}


function kmlread(datatext){
  try{
    datatext = datatext.replace(/\n/g,''); 
datatext=datatext.split("<coordinates>")[1].split("</coordinates>")[0];
var beforebeforecdn=datatext.split(" ");
            var beforecdn=new Array();
            var beforestartpoint=[Number(beforebeforecdn[0].split(",")[0]),Number(beforebeforecdn[0].split(",")[1])];
            var beforeendpoint;
            var beforpointgroup=new Array();
for(var i=0;i<beforebeforecdn.length;i++)
{
  beforecdn[i]=[Number(beforebeforecdn[i].split(",")[0]),Number(beforebeforecdn[i].split(",")[1])];
  beforeendpoint=[Number(beforebeforecdn[i].split(",")[0]),Number(beforebeforecdn[i].split(",")[1])];
  beforpointgroup[i]=new L.LatLng(Number(beforebeforecdn[i].split(",")[0]),Number(beforebeforecdn[i].split(",")[1]));

}
            cdn=beforecdn;
            pointGroup=beforpointgroup;
            pointshow=beforeendpoint;
            updateroute();
            getdistance();
            alert("done");
          }
  catch(e){alert("Your file is not correct");  datainput.outerHTML=datainput.outerHTML;}
}

//==================上传数据用===========================g



//=============================好看点用===============================
//======1.for travel tool============
var traveltool="";

function bikeclick()
{

  jQuery("#bike-btn").toggleClass("clicked");
  jQuery("#car-btn").removeClass("clicked");
  jQuery("#walk-btn").removeClass("clicked");

traveltool="bike";
}


function carclick()
{
jQuery("#bike-btn").removeClass("clicked");
jQuery("#car-btn").toggleClass("clicked");
jQuery("#walk-btn").removeClass("clicked");
  traveltool="car";
}

function walkclick()
{
jQuery("#bike-btn").removeClass("clicked");
jQuery("#car-btn").removeClass("clicked");
jQuery("#walk-btn").toggleClass("clicked");
  traveltool="walk";
}


//======1.for travel tool============









//=============================俩button用===============================
allhideforbutton();
function allhideforbutton()
{      
  statue.className = '';
        undo.className = 'cannotsee';
        finish.className = 'cannotsee';
        cancel.className = 'cannotsee';
clearallpoints();
$("#drawcontroler").hide();
jQuery("#infobar").css({width: '0px'});
$("#datainput").hide();

container.innerHTML = 'Choose one method to draw your route.';
}

$("#route-draw").click(function(){
  allhideforbutton();
  $("#drawcontroler").show("slow");
jQuery("#infobar").animate({
            width: '250px'},"slow");
container.innerHTML = 'Click to draw your route.';

});


$("#route-upload").click(function(){
  allhideforbutton();
  $("#datainput").show();
jQuery("#infobar").animate({
            width: '250px'},"slow");
container.innerHTML = 'Please upload your route in information bar on the right.';
});






