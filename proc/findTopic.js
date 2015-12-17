
// Functions for Parse.com

function parseFindTopic( objId , callBackFunc ){
  var TOPIC = Parse.Object.extend("topic");
  var query = new Parse.Query(TOPIC);
  query.get( objId,{ 
    success: function(results){
      callBackFunc( results );
    },
	error: function(obj,error){
	  callBackFunc( error );
	}
  });
}
