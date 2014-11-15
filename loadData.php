

  <?php 
 
$mode=$_GET["mode"];


// $con = mysql_connect("localhost","beta-informatics","crossEdinburgh");
$con = mysql_connect("localhost","root","root");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("beta-informatics", $con);


// debug_to_console('its working');

// $allRowsArr = getAllRows();

// echo $allRowsArr[0][0];


if($mode == "allRows") {
  $result = getAllRows();

  echo $result;
}

if($mode == "oneRow") {

  $id = $_GET["id"];

  $result = getRowByid($id);
  $line = $result['route'];

  //echo json_encode($line, JSON_PRETTY_PRINT);
  echo $line;
}

mysql_close($con);






// #########################  functions  #######################

//gets and returns the row with the given id
//returns null if an error occurs
function getRowByid($id) {
  $sql="SELECT * FROM `journey` WHERE `id` = $id";
  $data = mysql_query($sql);
      // $num_rows = mysql_num_rows($sql);
  $row = null;

  if (!$data)
    {
      debug_to_console('Error occured, data could not be found');
    }
    else {

      debug_to_console("data was loaded");

      $row = mysql_fetch_assoc($data);
      // echo $row['gender'];      

    }

    return $row;
}


//this function gets all the rows from our only existing table
//returns null if error
function getAllRows() {
  $sql="SELECT * FROM `journey`";
  $data = mysql_query($sql);
      // $num_rows = mysql_num_rows($sql);

  $rows = array();

  if (!$data)
    {
      debug_to_console('Error occured, data could not be found');
      $rows = null;
    }
    else {

      debug_to_console("data was loaded");

      $rowsNr = mysql_num_rows($data);
       
      

      while ($row = mysql_fetch_array($data)) {
        
        // debug_to_console($row[0]);
        array_push($rows, $row);;

      }
    }

    return $rows;
}



function debug_to_console( $data ) {

    // if ( is_array( $data ) )
    //     $output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
    // else
    //     $output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";

    // echo $output;
}



?>
