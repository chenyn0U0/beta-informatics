

  <?php 
 
$mode=$_GET["mode"];


//$con = mysql_connect("localhost","beta-inf","password");
$con = mysql_connect("localhost","root","root");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("beta-informatics", $con);

//mode
// +++++++++++++++++++++++
if($mode == "getRoad") {
  $result = getRoad();

  echo json_encode($result);
}

// +++++++++++++++++++++++
elseif ($mode == "getCycleEntrance") {


  $result = getCycleEntrance();

  echo json_encode($result);
}

mysql_close($con);






// #########################  functions  #######################


/* 
   By id
   ========================================================================== */
//gets and returns the row with the given id
//returns null if an error occurs
function getRoad() {
  $sql="SELECT * FROM `roads`";
  $data = mysql_query($sql);
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
        array_push($rows, $row);;

      }
    }

    return $rows;
}


/* 
   All Rows
   ========================================================================== */
//this function gets all the rows from our only existing table
//returns null if error
function getCycleEntrance() {
  $sql="SELECT * FROM `cycleentrance`";
  $data = mysql_query($sql);
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
