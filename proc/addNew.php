<?php
  if( !isset($_POST,$_POST['submit'],$_POST['inputTitle'],$_POST['inputName'],$_POST['inputTopic']) ){
    header("Location: ../index.html");
    exit();
  }
  /*$title = urlencode($_POST['inputTitle']);
  $user = urlencode($_POST['inputName']);
  $topic = urlencode($_POST['inputTopic']);
  $newTopicPatten = '{"title":"%s" , "user":"%s" , "topic":"%s"}';
  $newTopic = sprintf( $newTopicPatten , $title , $user , $topic );*/
  $title = rtrim( $_POST['inputTitle'] );
  $user = rtrim( $_POST['inputName'] );
  $topic = rtrim( $_POST['inputTopic'] );
  if( $title=="" || $user=="" || $topic=="" ){
    header("Location: ../index.html");
    exit();
  }

  $newTopicArray = array(
    "title" => $title,
	"user" => $user,
	"topic" => $topic
  );
  $newTopic = json_encode( $newTopicArray );

  $addNew = curl_init();
  curl_setopt( $addNew , CURLOPT_URL , "https://api.parse.com/1/classes/topic" );
  curl_setopt( $addNew , CURLOPT_HTTPHEADER , array(
	"X-Parse-Application-Id: ",
	"X-Parse-REST-API-Key: ",
    "Content-Type: application/json"
  ) );
  curl_setopt( $addNew , CURLOPT_SSL_VERIFYPEER , false );
  curl_setopt( $addNew , CURLOPT_RETURNTRANSFER , true );
  curl_setopt( $addNew , CURLOPT_POST , true );
  curl_setopt( $addNew , CURLOPT_POSTFIELDS , $newTopic );
  
  $response = curl_exec( $addNew );
  curl_close( $addNew );  
  
  $data = json_decode( $response );
  $objectId = $data->objectId;
  
  header( "Location: ../lettalk.php?id=".$objectId );
?>
