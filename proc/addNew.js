
// Functions for Parse.com

function parseAddNew( _newTopic ){
  
  var NEWTOPIC = Parse.Object.extend("topic");
  
  var newTopic = new NEWTOPIC();
  newTopic.set('title',_newTopic.title);
  newTopic.set('user',_newTopic.user);
  newTopic.set('topic',_newTopic.topic);
  
  newTopic.save(null,{
    success: function(addingTopic){
	  location.href = 'lettalk.html?id=' + addingTopic.id;
	},
	error: function(addingTopic,error){
	  location.href = 'lettalk.html?error';
	}
  })
}