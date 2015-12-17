<?php
  exit();
  if( !isset($_POST['photouser'],$_FILES['photo']['tmp_name']) || $_POST['photouser']=="" || $_FILES['photo']['tmp_name']=="" ){
    echo "empty";
    exit();
  }
  $user = urlencode($_POST['photouser']);
  $photo = '@/'.$_FILES['photo']['tmp_name'];
  $myPhotoArray = array(
    "user" => $user,
	"photo" => array(
	  "name" => $photo,
	  "__type" => "File"
	)
  );
  $myPhoto = json_encode( $myPhotoArray );
  
  // upload photo
  $addNew = curl_init();
  curl_setopt( $addNew , CURLOPT_URL , "https://api.parse.com/1/files/$user" );
  curl_setopt( $addNew , CURLOPT_HTTPHEADER , array(
	"X-Parse-Application-Id: ",
	"X-Parse-REST-API-Key: ",
    "Content-Type: image/jpg"
  ) );
  curl_setopt( $addNew , CURLOPT_SSL_VERIFYPEER , false );
  curl_setopt( $addNew , CURLOPT_RETURNTRANSFER , true );
  curl_setopt( $addNew , CURLOPT_POST , true );
  curl_setopt( $addNew , CURLOPT_POSTFIELDS , $myPhoto );
  
  $response = curl_exec( $addNew );
  curl_close( $addNew );
  echo $response;
  
  //relation the photo
  $addNew = curl_init();
  curl_setopt( $addNew , CURLOPT_URL , "https://api.parse.com/1/classes/photo" );
  curl_setopt( $addNew , CURLOPT_HTTPHEADER , array(
	"X-Parse-Application-Id: ",
	"X-Parse-REST-API-Key: ",
    "Content-Type: image/jpg"
  ) );
  curl_setopt( $addNew , CURLOPT_SSL_VERIFYPEER , false );
  curl_setopt( $addNew , CURLOPT_RETURNTRANSFER , true );
  curl_setopt( $addNew , CURLOPT_POST , true );
  curl_setopt( $addNew , CURLOPT_POSTFIELDS , $myPhoto );
  
  $response = curl_exec( $addNew );
  curl_close( $addNew );
  echo $response;
?>
