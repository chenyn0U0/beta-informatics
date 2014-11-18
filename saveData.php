
<html>
<body >


  <?php 
  $comment=$_POST["comment"];
  $startTime=$_POST["startTime"];
  $endTime=$_POST["endTime"];
  $ip=$_SERVER["REMOTE_ADDR"];
  $insertTime=date('Y-m-d H:i:s',time());
  $route=$_POST["route"];
  $startPoint=$_POST["startPoint"];
  $finishPoint=$_POST["endPoint"];
  $distance=$_POST["distances"];
  $travelType=$_POST["travelType"];
  $journeyType=$_POST["journey"];
  $age=$_POST["age"];
  $gender=$_POST["gender"];
  $weekday=$_POST["weekday"];
  if ($weekday=="on") $weekday=1;
  else $weekday=0;


// $con = mysql_connect("localhost","beta-inf","password");
$con = mysql_connect("localhost","root","root");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("beta-informatics", $con);



$sql="INSERT INTO journey (travelType, startTime, endTime, weekday, journeyType, age, gender, insertTime, userIP, distance, route, startPoint, finishPoint, comment)
VALUES
('$travelType','$startTime','$endTime','$weekday','$journeyType','$age','$gender','$insertTime','$ip','$distance','$route','$startPoint','$finishPoint','$comment')";


if (!mysql_query($sql,$con))
  {
  die('Error: ' . mysql_error());
  }
echo "1 record added";

mysql_close($con);


// ######################################################################

session_start();
$hashCode    =trim($_POST['hashCode']);
if(!isset($_SESSION['ACTION'])||$_SESSION['ACTION']!=$hashCode){
    //新提交数据，入库操作
    $_SESSION['ACTION']    =$hashCode;//标记操作完成
}else{
    echo 'please do not repeat your submit';
    exit();
}
?>
</body>
</html>