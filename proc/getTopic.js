
// Functions for Parse.com

function parseGetTopic( callBackFunc ){
  var TOPIC = Parse.Object.extend("topic");
  var query = new Parse.Query(TOPIC);
  query.descending("createdAt");
  query.find().then( function(results){
    callBackFunc(results);
  } );
}
