
// Functions for Parse.com

function parseGetChat( _topicId , _from , callBackFunc ){
  var CHATING = Parse.Object.extend("chating");
  var query = new Parse.Query(CHATING);
  
  query.equalTo("derive", _topicId);
  query.ascending("createdAt");
  if( _from>0 )
    query.skip(_from);
  
  query.find().then( function(results){
    var chatwhat = [];
	for(var i=0;i<results.length;++i){
	  chatwhat[i] = {
	    objectId: results[i].id,
		createdAt: results[i].createdAt,
	    derive: results[i].get('derive'),
		expression: results[i].get('expression'),
		name: results[i].get('name'),
		plus: results[i].get('plus'),
		saying: results[i].get('saying')
	  };
	}
	
	callBackFunc( chatwhat );
  } );
}