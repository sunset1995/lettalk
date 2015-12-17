$(function(){
  var chatManager = function(){
    var nowHave = 0;
	var auto = false;
	var autoManager = null;
	var nowLoading = false;
	var queue = false;
	var createNewNode = function( chatObj ){
	  nowHave += 1;
	  var img = '<img src="'+(chatObj.expression)+'"/>';
	  var header = '<header></header>';
	  var saying = '<pre class="saying"></pre>';
	  var col2 = '<div class="col-2">'+img+'</div>';
	  var col8 = '<div class="col-8">'+header+saying+'</div>';
	  var row = '<div class="row fadeIn">'+col2+col8+'</div>';
	  $('#content').append( row );
	  $('#content header:last')[0].textContent = nowHave+'F '+(chatObj.name);
	  $('#content pre:last')[0].textContent = chatObj.saying;
	};
	return {
	  init : function(){
	    if( typeof topicId === "undefined" ){
		  setTimeout( chatManager.init , 500 );
		  return;
		}
		// send request to Parse.com
		// proc/findTopic.js is required
		parseFindTopic( topicId, function( results ){
		  if( typeof results.id==="undefined" ){
		    $('#topic')[0].textContent = "Sorry, topic not Found.";
			return;
		  }
		  $('#topicLoadingGif').animate({'opacity':'0'},100,function(){ $(this).remove(); });
		  
		  $('#topicTitle').css('color','#333');
		  $('#topicUser').css('color','gray');
		  $('#topic').css('color','#333');
		  
		  var re = formatTopic( results );
		  $('#topicTitle')[0].textContent = re.title;
		  $('#topicUser')[0].textContent = re.user;
		  $('#topic')[0].textContent = re.topic;
		  $('#roomId')[0].textContent = re.objectId;
		  
		  $('#footer').css('display','block');
		  chatManager.renew();
		} );
	  },
	  renew : function(){
	    if( nowLoading===true ){
		  queue = true;
		  return;
		}
	    nowLoading = true;
	    $('#chatLoadingGif').css('opacity','1');
		
		// send request to Parse.com
		// proc/getChat.js is required
		parseGetChat( topicId , nowHave , function(re){
		
		  $('#chatLoadingGif').css('opacity','0');
		  
		  var newChating = re;
		  for(var i=0;i<newChating.length;++i){
		    createNewNode( newChating[i] );
		  }
		  
		  adjust();
		  var delayTime = 0;
		  $('#content .fadeIn').each(function(){
		    $(this).delay(delayTime).animate({'opacity':'1'},{
			  duration: 500,
			  step: function(cur){
			    $(this).css('-o-transform','scale('+cur+','+cur+')');
			    $(this).css('-moz-transform','scale('+cur+','+cur+')');
			    $(this).css('-webkit-transform','scale('+cur+','+cur+')');
			    $(this).css('transform','scale('+cur+','+cur+')');
			  },
			  complete: function(){
			    $(this).removeClass('fadeIn');
			  }
			});
			if( delayTime<2000 )
			  delayTime += 100;
		  });
		  
		  nowLoading = false;
		  if( queue===true ){
		    queue = false;
			chatManager.renew();
		  }
		  
		} );
	  },
	  auto : function(){
	    if( auto===false ){
		  auto = true;
		  $('#autoUpdate').css('color','green');
		  autoManager = setInterval( chatManager.renew , 5000 );
		}
		else{
		  auto = false;
		  $('#autoUpdate').css('color','#333');
		  clearInterval( autoManager );
		}
	  }
	};
  }();
  var myPost = function(){
    var photoPannelOpened = false;
	var pannelShowUp = false;
    return {
	  showPannel : function(){
	    if( pannelShowUp===true ) return;
		pannelShowUp = true;
		
	    $('#IsaySection').css({
		  'opacity':'0',
		  '-o-transform':'scale(0,0)',
		  '-moz-transform':'scale(0,0)',
		  '-webkit-transform':'scale(0,0)',
		  'transform':'scale(0,0)'
		}).css('display','block').animate({'opacity':'1'},{
		  duration: 700,
		  step: function(cur){
		    var scaling = 'scale('+(cur*1.1)+','+(cur*1.1)+')';
		    $(this).css({
		      '-o-transform': scaling,
		      '-moz-transform': scaling,
		      '-webkit-transform': scaling,
		      'transform': scaling
			});
		  },
		  complete: function(){
		    $(this).css('zIndex','110').animate({'zIndex':'100'},{
			  duration: 300,
			  step: function(cur){
			    var scaling = 'scale('+(cur/100)+','+(cur/100)+')';
				$(this).css({
				  '-o-transform': scaling,
				  '-moz-transform': scaling,
				  '-webkit-transform': scaling,
				  'transform': scaling
				});
			  }
			});
		  }
		});
		var scrollYfrom = window.scrollY;
		var scrollYto = $('body').height()-$(window).height();
		$('body').animate({'zIndex':scrollYto-scrollYfrom},{
		  duration: 1000,
		  step: function(cur){
		    console.log(scrollYfrom+cur);
		    scrollTo(0,scrollYfrom+cur);
		  }
		});
	  },
	  postIsay : function(){
	    if( $('#myName').val()==""  ){
		  $('#myName').focus().select();
		  return;
		}
	    if( $('#Isay').val()=="" ){
		  $('#Isay').focus().select();
		  return;
		}
		var chosenPhoto = 'include/face.jpg';
		if(  typeof $('#expressionSet #chosenPhoto').attr('src')!=='undefined' && $('#expressionSet #chosenPhoto').attr('src')!==""  ){
		  chosenPhoto = $('#expressionSet #chosenPhoto').attr('src');
		}
	    $('#postIsay').unbind('click');
		$('#IsaySection').animate({'opacity':'.5'},800);
		
		//  post I say
		var IsaySet = {
		  'derive': topicId,
		  'name': $('#myName').val(),
		  'saying': $('#Isay').val(),
		  'expression' : chosenPhoto
		};
		// send request to Parse.com
		// proc/addIsay.js is required
		parseAddIsay( IsaySet,function(){
		  chatManager.renew();
		  $('#Isay').val('').attr('placeholder','已送出~~').click( function(){
		    $(this).attr('placeholder','').unbind('click');
		  });
		  $('#postIsay').click( myPost.postIsay );
		  $('#IsaySection').animate({'opacity':'1'},800);
		} );
	  },
	  showPhoto : function(){
	    if( photoPannelOpened===true ){
		  $('#photoStorage').hide();
		  photoPannelOpened = false;
		  return;
		}
		
		photoPannelOpened = true;
		/*
	    if( $('#myName').val()==="" ){
		  $('#photoStorage strong').html('請先輸入姓名');
		  $('#photoStorage form').hide();
	      $('#photoStorage').show();
		  $('#myName').focus().select();
		  return;
		}
		*/
		
		//$('#photoStorage #photouser').val( $('#myName').val() );
	    //$('#photoStorage strong').html( $('#myName').val()+'可用' );
		//$('#photoStorage form').show();
	    $('#photoStorage').show();
	  }
	};
  }();
  
  var testStickyBar = function(){
    if( window.pageYOffset>lineForSticky )
	  $('#bottom').css('position','absolute');
	else
	  $('#bottom').css('position','fixed');
  };
  $(window).scroll( testStickyBar );
  $('#IwantSay').click( myPost.showPannel );
  $('#autoUpdate').click( chatManager.auto );
  $('#postIsay').click( myPost.postIsay );
  $('#IsayExpression').click( myPost.showPhoto );
  $('#expressionSet img').click( function(){
    $('#expressionSet img').attr('id','');
	$(this).attr('id','chosenPhoto');
	var choseSrc = $(this).attr('src');
	$('#IsayExpression').attr('src',choseSrc);
	$('#IsayExpression').click();
  } );
  chatManager.init();
  adjust();
  $(window).resize( function(){
    adjust();
	retestStickyBar();
  } );
});

function adjust(){
  var windowHeight = $(window).height();
  var wrapHeight = $('#mainSection').height();
  lineForSticky = wrapHeight-windowHeight;
  pageY = window.pageYOffset || window.scrollY;
  
  if( wrapHeight < windowHeight )
	$('#mainSection').css('minHeight',windowHeight);
  
  var photo = parseInt( $('#content').width() , 10 ) * 0.19;
  if( photo>66 ) photo = 66;
  var photoRadius = photo/2;
  $('#content img , #IsaySection img , #photoStorage img').css({
    'width' : photo,
	'height' : photo,
	'borderRadius' : photoRadius
  });
}


// Functions for Parse.com

function formatTopic( oriObj ){
  return {
	user: oriObj.get('user'),
	title: oriObj.get('title'),
	topic: oriObj.get('topic'),
	objectId: oriObj.id,
	createdAt: oriObj.createdAt
  };
}