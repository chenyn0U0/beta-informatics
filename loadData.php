
<html>
<body >


  <?php 
 

// $con = mysql_connect("localhost","beta-informatics","crossEdinburgh");
$con = mysql_connect("localhost","root","root");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("beta-informatics", $con);



$sql="SELECT * FROM `journey`";
// $bool = mysql_query($sql,$con);
$data = mysql_query($sql);

if (!$data)
  {
    die('Error: ' . mysql_error());
  }
  else {
    echo "1 record loaded";

    while ($info = mysql_fetch_array($data)) {
      echo "data";
    }
  }

mysql_close($con);



?>
</body>
</html>