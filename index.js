$(function(){
  var titleSwitch = function(){
    var open = true;
	var animating = false;
	var turn = function(){
	  if( animating===true ) return;
	  animating = true;
	  var height = $('#titleSection').height();
	  if( open===false ){
	    $('#titleSection').css('top',-height).animate({'top':'0px'},500,function(){
		  open = true;
		  animating = false;
		});
	  }
	  else{
	    $('#titleSection').animate({'top':-height},500,function(){
		  open = false;
		  animating = false;
		});
	  }
	};
	return turn;
  }();
  var selectSortSwitch = function(){
    var open = false;
	var animating = false;
	var turn = function(){
	  if( animating===true ) return;
	  animating = true;
      var oriHeight = $('#titleSection nav .selectSort').height();
	  var newHeight = oriHeight + 10;
	  
	  if( open===false )
        $('#selectList').css({'opacity':'0','display':'block','top':oriHeight}).animate({
	      'opacity':'1',
	      'top': newHeight
	    },800,function(){
	      open = true;
		  animating = false;
	    });
	  else
        $('#selectList').animate({
	      'opacity':'0',
	      'top': oriHeight
	    },800,function(){
		  $(this).css('display','none');
	      open = false;
		  animating = false;
	    });
	};
	return turn;
  }();
  var listManager = function(){
    var storeRoom = '#listStorage .subject';
    var list = [
	  {'via':'date','type':'string'} ,
	  {'via':'tag','type':'string'} ];
	var nowSortVia = 0;
	var loadingImg = '<div style="text-align:center;padding-top:50px;"><img src="include/loading.gif" style="height: 2em;"/></div>';
	var rearrange = function( storgeList ){
	  $('#chatSection').css('height', $(this).height() ).html('');
	  
	  for(var i=0; i<storgeList.length; ++i){
	    $('#chatSection').append( $( '#listStorage #'+(storgeList[i].sourceId)) );
	  }
	  $('#chatSection').css('height','auto');
	  $('#chatSection .subject').hover(function(){
	    $(this).css('backgroundColor','white').animate({'paddingLeft':'1em'},100);
	  },function(){
	    $(this).css('backgroundColor','transparent').animate({'paddingLeft':'0em'},100);
	  });
	  
	  adjust();
	  
	  var delayTime = 0;
	  $('#chatSection .subject').each(function(){
	    $(this).delay( delayTime ).animate({'opacity':'1'},500);
		if( delayTime < 2000 )
		  delayTime+=100;
	  });
	};
	var getTopic = function(){
	  if( typeof arguments[0] === "string" ){
	    var finding = arguments[0];
	  }
	  // send require to Parse.com
	  // proc/getTopic.js is required
	  parseGetTopic( function( dataset ){
	  
		dataset.sort( function(__a,__b){ return __a.createdAt<__b.createdAt; } );
	    $( '#listStorage' ).html('');
		
		var judging = function( obj ){ return true; };
		if( typeof finding === "string" ){
		  judging = function( obj ){
		    if( obj.title.indexOf(finding)!==-1 ) return true;
			if( obj.topic.indexOf(finding)!==-1 ) return true;
			return false;
		  };
		}
		
		for(var i=0;i<dataset.length;++i){
		  if( judging( formatData(dataset[i]) )===false ){
		    continue;
		  }
		  var nowData = formatData(dataset[i]);
		  $( '#listStorage' ).append( setSubject( nowData ) );
		  $( '#listStorage .subject:last' ).data('date', nowData.createdAt );
		}
	    if( $( storeRoom ).length===0 ){
	      $('#chatSection').html('nothing found~');
		  return;
	    }
		listManager.renewList();
	  } );
	};
	var setSubject = function( data ){
	  var strSpan = '<span>'+data['user']+'</span>';
	  var strStrong = '<strong>'+data['title']+'</strong>';
	  var strNode = '<a href="lettalk.html?id='+data['objectId']+'" class="subject" id="'+data['objectId']+'">'+strSpan+strStrong+'</a>';
	  return strNode;
	};
	
    return {
	  init : function(){
	    // 
		//  update storage
		getTopic();
	  },
	  renewList : function(){
	    var len = list.length;
	    for(var i=0;i<len;++i){
		  list[i].content = [];
		  list[i].asc = true;
		  var now = 0;
		  $( storeRoom ).each(function(){
		    list[i].content[now] = {
			  'via' : $(this).data( list[i].via ),
			  'sourceId' : $(this).attr( 'id' )
			};
			++now;
		  });
		}
		listManager.sorting( 0 );
	  },
	  sorting : function( which ){ 
	    if( nowSortVia===which ){
		  list[which].asc = !list[which].asc;
		}
		nowSortVia = which;
		if( list[which].asc )
		  list[which].content.sort( function(__a,__b){ return __a.via>__b.via; } );
		else
		  list[which].content.sort( function(__a,__b){ return __a.via<__b.via; } );
		// rearrange showing
		rearrange( list[which].content );
	  },
	  showAll : function(){
	    $('#chatSection').html( loadingImg );
	    getTopic();
	  },
	  search : function(){
	    var findTopic = $('#titleSection .searchInputBox').val().trim();
	    if( findTopic==="" ) return;
	    $('#chatSection').html( loadingImg );
	    // send require to Parse.com
		// proc/findTopic.js is required
		parseFindTopic( findTopic , function(re){
		  if( typeof re.id !== "undefined" ){
		    var nowData = formatData( re );
		    $( '#listStorage' ).html('');
		    $( '#listStorage' ).append( setSubject(nowData) );
		    $( '#listStorage .subject:last' ).data('date',nowData.createdAt);
			listManager.renewList();
			return;
		  }
		  getTopic( findTopic );
		} );
	  }
	};
  }();
  
  $('#inputSubmit').click( function(){
    var topicDataSet = {
	  title: $('#inputTitle').val(),
	  topic: $('#inputTopic').val(),
	  user: $('#inputName').val()
	};
    if( topicDataSet.title==="" ){
	  $('#inputTitle').val('RoomNameHere').focus().select();
	  return;
	}
	if( topicDataSet.user==="" ){
	  $('#inputName').val('YourNameHere').focus().select();
	  return;
	}
	if( topicDataSet.topic==="" ){
	  $('#inputName').focus().select();
	  return;
	}
	$('#inputSubmit').unbind('click');
	$('#addNewSection').animate({'opacity':'.5'},500);
	// send require to Parse.com
	// proc/addNew.js is required
	parseAddNew( topicDataSet );
  } );
  $('#titleSection nav .selectSort , #titleSection nav>#selectList .close').click( selectSortSwitch );
  $('#titleSection #selectList .selection').click(function(){
    $('#titleSection #selectList .selection').removeClass('nowSort');
	$(this).addClass('nowSort');
	var sortVia = parseInt( substr( $(this).attr('id') ,4 ) ,10 );
	sorting(sortVia);
  });
  $('#addNewSection input').click( function(){ $(this).select().unbind('click'); } );
  $('#searchBtn').click( listManager.search );
  $('#showAllBtn').click( listManager.showAll );
  
  listManager.init();
  adjust();
  window.onresize = adjust;
  
  setTimeout( function(){
    $('#titleSectionSwitch').click( titleSwitch ).click();
  } , 1000 );
});

function adjust(){
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var navWidth = $('#titleSection nav').width();
  var titleSwitchHeight = $('#titleSectionSwitch').height();
  var titleSwitchWidth = $('#titleSectionSwitch').width();
  
  if( windowWidth<600 )
    $('#titleSection nav').css('paddingLeft',(windowWidth-navWidth)/2);
  else
    $('#titleSection nav').css('paddingLeft','0');
  
  $('#mainSection').css('minHeight',windowHeight);
  $('#titleSectionSwitch').css('left',(windowWidth-titleSwitchWidth)/2);
}


// Functions for Parse.com

function formatData( beforeFormat ){
  return {
	user: beforeFormat.get('user'),
	title: beforeFormat.get('title'),
	topic: beforeFormat.get('topic'),
	objectId: beforeFormat.id,
	createdAt: beforeFormat.createdAt
  };
}