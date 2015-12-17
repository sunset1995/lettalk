<?php
  if( !isset( $_POST,$_POST['find'] ) || $_POST['find']=="" ){
    exit();
  }
  $find = $_POST['find'];
  
  $getTopic = curl_init();
  curl_setopt( $getTopic , CURLOPT_URL , "https://api.parse.com/1/classes/topic/$find" );
  curl_setopt( $getTopic , CURLOPT_HTTPHEADER , array(
	"X-Parse-Application-Id: ",
	"X-Parse-REST-API-Key: ",
    "Content-Type: application/json"
  ) );
  curl_setopt( $getTopic , CURLOPT_CUSTOMREQUEST , "GET" );
  curl_setopt( $getTopic , CURLOPT_SSL_VERIFYPEER , false );
  curl_setopt( $getTopic , CURLOPT_RETURNTRANSFER , true );
  $response = curl_exec( $getTopic );
  curl_close( $getTopic );
  echo $response;
?>
