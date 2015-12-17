<?php
  if( !isset($_GET['topicId']) ){
    header("Location: ../index.html");
	exit();
  }
  $topicId = str_replace( array("\"","'","\\"),"",$_GET['topicId'] );
  if( $topicId=="" ){
    header("Location: ../index.html");
	exit();
  }
  
  $loadTopic = curl_init();
  curl_setopt( $loadTopic , CURLOPT_URL , "https://api.parse.com/1/classes/topic/$topicId" );
  curl_setopt( $loadTopic , CURLOPT_HTTPHEADER , array(
	"X-Parse-Application-Id: ",
	"X-Parse-REST-API-Key: ",
    "Content-Type: application/json"
  ) );
  curl_setopt( $loadTopic , CURLOPT_RETURNTRANSFER , true );
  curl_setopt( $loadTopic , CURLOPT_CUSTOMREQUEST , "GET" );
  curl_setopt( $loadTopic , CURLOPT_SSL_VERIFYPEER , false );
  $response = curl_exec( $loadTopic );
  curl_close( $loadTopic );  
  
  echo $response;
?>
