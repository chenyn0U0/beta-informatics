<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Test Page for Database</title>
</head>
<body>
	
	TEST TEST



		<?php
			$servername = "localhost";
			$username = "root";
			$password = "";
			$dbname = "beta-informatics";

			// Create connection
			$conn = new mysqli($servername, $username, $password, $dbname);
			// Check connection
			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			} 

			$sql = "SELECT * FROM Journey";
			$result = $conn->query($sql);

			if ($result->num_rows > 0) {
			    // output data of each row
			    while($row = $result->fetch_assoc()) {
			        echo "<br> id: ". $row["id"]. " - Name: ". $row["travelType"]. " " . $row["startTime"];
			        
			    }
			} else {
			    echo "0 results";
			}
			$conn->close();
			?>
</body>
</html>