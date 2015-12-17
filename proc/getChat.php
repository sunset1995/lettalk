<?php
  if( !isset($_POST,$_POST['topicId'],$_POST['from']) ){
	exit();
  }
  $derive = trim($_POST['topicId']);
  $from = trim($_POST['from']);
  if( $derive=="" || $from=="" ){
	exit();
  }
  
  $order = "order=createdAt";
  $where = 'where={"derive":"'.$derive.'"}';
  $skip = "skip=$from";
  $query = $order . "&" . $where . "&" . $skip;
  
  $getChat = curl_init();
  curl_setopt( $getChat , CURLOPT_URL , "https://api.parse.com/1/classes/chating?$query" );
  curl_setopt( $getChat , CURLOPT_HTTPHEADER , array(
	"X-Parse-Application-Id: ",
	"X-Parse-REST-API-Key: ",
    "Content-Type: application/json"
  ) );
  curl_setopt( $getChat , CURLOPT_CUSTOMREQUEST , "GET" );
  curl_setopt( $getChat , CURLOPT_SSL_VERIFYPEER , false );
  curl_setopt( $getChat , CURLOPT_RETURNTRANSFER , true );
  $response = curl_exec( $getChat );
  curl_close( $getChat );  

  echo $response;
?>
