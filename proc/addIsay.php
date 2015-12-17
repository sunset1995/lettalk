<?php
  if( !isset($_POST,$_POST['derive'],$_POST['myName'],$_POST['Isay'],$_POST['expression']) ){
    exit();
  }
  $derive = rtrim( $_POST['derive'] );
  $name = rtrim( $_POST['myName'] );
  $saying = rtrim( $_POST['Isay'] );
  $expression = rtrim( $_POST['expression'] );
  if( $derive=="" || $name=="" || $saying=="" ){
    header("Location: ../index.html");
    exit();
  }
  if( $expression=="" ){
    $expression = "include/face.jpg";
  }

  $IsayArray = array(
    "derive" => $derive,
    "name" => $name,
	"saying" => $saying,
	"expression" => $expression,
	"plus" => 0
  );
  $Isay = json_encode( $IsayArray );

  $addNew = curl_init();
  curl_setopt( $addNew , CURLOPT_URL , "https://api.parse.com/1/classes/chating" );
  curl_setopt( $addNew , CURLOPT_HTTPHEADER , array(
	"X-Parse-Application-Id: ",
	"X-Parse-REST-API-Key: ",
    "Content-Type: application/json"
  ) );
  curl_setopt( $addNew , CURLOPT_SSL_VERIFYPEER , false );
  curl_setopt( $addNew , CURLOPT_RETURNTRANSFER , true );
  curl_setopt( $addNew , CURLOPT_POST , true );
  curl_setopt( $addNew , CURLOPT_POSTFIELDS , $Isay );
  
  $response = curl_exec( $addNew );
  curl_close( $addNew );
?>
