<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-CN" xml:lang="zh-CN"> 
<head> 
<title>选项卡</title> 
<style type="text/css"> 
<!-- 
* { margin:0; padding:0; font-size:12px; font-weight:normal; } 
.jj { font-weight:bolder!important; } 
.box { border-top-color:#c00!important; } 
.pr { color:#060!important; } 
#tab01 { position:relative; width:336px; height:88px; padding-top:15px; margin:50px; overflow:hidden; } 
#tab01 h3 { position:relative; z-index:2; float:left; height:14px; padding:0 7px 0 8px; margin-left:-1px; border-left:solid 1px #ccc; border-right:solid 1px #fff; text-align:center; background:#fff; cursor:pointer; } 
#tab01 h3.up { height:18px; padding:5px 7px 0 7px; margin:-6px 0 0 0; border:solid #ccc; border-width:1px 1px 0; color:#c00; } 
#tab01 div { display:none; position:absolute; left:0; top:32px; z-index:1; width:324px; height:54px; padding:5px; border:solid 1px #ccc; color:#666; } 
#tab01 div.up { display:block; } 
#tab02 { position:relative; width:200px; margin:50px; border:solid #ccc; border-width:0 1px 1px; } 
#tab02 h4 { height:18px; line-height:18px; border:solid #ccc; border-width:1px 0; margin-bottom:-1px; text-align:center; background:#f6f6f6; cursor:pointer; } 
#tab02 h4.up { color:#c00; } 
#tab02 ol { display:none; height:54px; padding:5px; color:#666; } 
#tab02 ol.up { display:block; } 
#tab03 { position:relative; width:100px; margin:50px; } 
#tab03 h3 { position:relative; z-index:1; height:16px; padding-top:4px; margin-bottom:-1px; border:solid #ccc; border-width:1px 0 1px 1px; text-align:center; font-family:宋体; background:#eee; cursor:pointer; } 
#tab03 h3.up { z-index:3; color:#c00; background:#fff; } 
#tab03 div.tab { display:none; position:absolute; left:99px; top:0; z-index:2; width:300px; height:200px; padding:5px; border:solid 1px #ccc; color:#666; } 
#tab03 div.tab.up { display:block; } 
--> 
</style> 
</head> 
<body> 
<div id="tab01"> 
<h3>首页</h3> 
<div class="jj"><p>嘿嘿，无视div原始class值。</p></div> 
<h3 class="pr">测试</h3> 
<div><p>继续无视h3原始class值。</p></div> 
<h3>无聊</h3> 
<div><p>h3没有值也可以～</p></div> 
<h3 class="box">傻蛋</h3> 
<div><p>div没有值一样可以～</p></div> 
</div> 
<div id="tab02"> 
<h4>首页</h4> 
<ol class="pr"><li>嘿嘿，无视容器原始class值。</li></ol> 
<h4 class="box">测试</h4> 
<ol><li>继续无视h3原始class值。</li></ol> 
<h4>无聊</h4> 
<ol><li>h3没有值也可以～</li></ol> 
<h4 class="bb">傻蛋</h4> 
<ol><li>div没有值一样可以～</li></ol> 
</div> 
<div id="tab03"> 
<h3>首页</h3> 
<div class="tab"><p>嘿嘿，无视h3原始class值。</p></div> 
<h3>测试</h3> 
<div class="tab wushi"><p>继续无视div原始class值。</p></div> 
<h3>无聊</h3> 
<div class="tab"><p>h3没有值也可以～</p></div> 
<h3 class="box">傻蛋</h3> 
<div class="tab tab123"><p>class值相似一样也可以～</p><div><p>指定class后，即时再多一个div也行。</p></div></div> 
</div> 
<script type="text/javascript"> 
<!-- 
function Pid(id,tag){ 
if(!tag){ 
return document.getElementById(id); 
} 
else{ 
return document.getElementById(id).getElementsByTagName(tag); 
} 
} 

function tab(id,hx,box,iClass,s,pr){ 
var hxs=Pid(id,hx); 
var boxs=Pid(id,box); 
if(!iClass){ // 如果不指定class，则： 
boxsClass=boxs; // 直接使用box作为容器 
} 
else{ // 如果指定class，则： 
var boxsClass = []; 
for(i=0;i<boxs.length;i++){ 
if(boxs[i].className.match(/\btab\b/)){// 判断容器的class匹配 
boxsClass.push(boxs[i]); 
} 
} 
} 
if(!pr){ // 如果不指定预展开容器，则： 
go_to(0); // 默认展开序列 
yy(); 
} 
else { 
go_to(pr); 
yy(); 
} 
function yy(){ 
for(var i=0;i<hxs.length;i++){ 
hxs[i].temp=i; 
if(!s){// 如果不指定事件，则： 
s="onmouseover"; // 使用默认事件 
hxs[i][s]=function(){ 
go_to(this.temp); 
} 
} 
else{ 
hxs[i][s]=function(){ 
go_to(this.temp); 
} 
} 
} 
} 
function go_to(pr){ 
for(var i=0;i<hxs.length;i++){ 
if(!hxs[i].tmpClass){ 
hxs[i].tmpClass=hxs[i].className+=" "; 
boxsClass[i].tmpClass=boxsClass[i].className+=" "; 
} 
if(pr==i){ 
hxs[i].className+=" up"; // 展开状态：标题 
boxsClass[i].className+=" up"; // 展开状态：容器 
} 
else { 
hxs[i].className=hxs[i].tmpClass; 
boxsClass[i].className=boxsClass[i].tmpClass; 
} 
} 
} 
} 
tab("tab01","h3","div","","onclick",2); tab("tab02","h4","ol");tab("tab03","h3","div","tab"); 
//--> 
</script> 
</body> 
</html>