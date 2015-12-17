<?php
  if( !isset($_GET['id']) ){
    header("Location: index.php");
	exit();
  }
  $topicId = str_replace( array("\"","'","\\"),"",$_GET['id'] );
?>

<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
	<title>留言板 | <?php echo $topicId; ?></title>
	<script type="text/javascript" src="include/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="http://www.parsecdn.com/js/parse-1.3.2.min.js"></script>
	
	<link rel="shortcut icon" type="image/icon" href="include/favicon.ico"/>
	<link rel="stylesheet" href="include/main.css"/>
	<link rel="stylesheet" href="lettalk.css"/>
	<script type="text/javascript">
	  topicId = "<?php echo $topicId; ?>";
	</script>
</head>
<body>

  <div id="mainSection">	
    <div  id="topicLoadingGif" style="text-align:center;width:100%;position:fixed;top:1em;z-index:999">
	  <img src="include/loading.gif"/>
	</div>
	<div id="topicSection">
	  <div class="wrap">
	    <header id="topicTitle"></header>
	    <span id="topicUser"></span>
	    <pre id="topic" readonly> </pre>
	  </div>
	</div>
	
    <div id="chatSection">
	  <div id="content" class="wrap"></div>
	  <div class="row wrap" id="chatLoadingGif"></div>
	</div>
	
	<div id="bottom">
	  <div class="wrap">
	    <button class="bottomBtn" id="autoUpdate">自動更新</button>
	    <button class="bottomBtn" id="IwantSay">留言</button>
	    <div class="clear"></div>
	  </div>
	</div>
	<div style="height:2em"></div>
  </div>
  
  <footer id="footer">
    <div id="photoStorage" class="wrap">
	  <strong></strong>
	  <div id="expressionSet">
	    <img src="include/face.jpg"/>
	    <img src="include/face2.jpg"/>
	    <img src="include/face3.jpg"/>
	    <img src="include/face4.jpg"/>
	    <img src="include/face5.jpg"/>
	    <img src="include/face6.jpg"/>
	  </div>
	  <div class="topArrow"></div>
	  <!--
	  <form action="proc/postImage.php" method="post" enctype="multipart/form-data" target="fakeIframe">
	    <span style="padding-right:1em;">或上傳您自己的</span>
		<input type="file" name="photo" id="uploadMyOwnPhoto"/>
		<input type="submit" value="上傳" style="border:1px solid #333;margin-right:.5em"/>
		<input type="hidden" id="photouser" name="photouser"/>
	  </form>
	  <iframe name="fakeIframe" id="fakeIframe" style="display:none;"></iframe>
	  -->
	</div>
	<div id="IsaySection" class="wrap">
	  <div class="row">
		<div class="col-2" style="text-align:right;">
		  <img src="include/face.jpg" id="IsayExpression"/>
		</div>
		<div class="col-8">
		  <input type="text" id="myName" placeholder="YourNameHere"/>
		  <textarea id="Isay"></textarea>
		</div>
	  </div>
	  <button id="postIsay">+</button>
	</div>
	
	<div class="ad">RoomId : <span id="roomId"></span></div>
	<div class="ad">want to add a new topic? view <a href="index.html">lettalk</a></div>
  </footer>
  
  <script type="text/javascript" src="lettalk.js"></script>
</body>
</html>