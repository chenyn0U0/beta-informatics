
<?php

$variable1 = $_POST['name']; 


$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "beta-informatics";



// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 




$sql = "INSERT INTO Journey (id,travelType,startTime,endTime,weekday,journeyType,age,
gender,comment,mail,insertTime,userIP,route,distance,startPoint,finishPoint)
VALUES ('4','car','00:00:15','00:00:00','1','','','','','','','','','','','')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();





echo $variable1;

?>