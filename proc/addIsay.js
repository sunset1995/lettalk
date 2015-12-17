
// Functions for Parse.com

function parseAddIsay( _IsaySet , callBackFunc ){
  
  var ISAY = Parse.Object.extend("chating");
  
  var Isay = new ISAY();
  Isay.set('derive',_IsaySet.derive);
  Isay.set('name',_IsaySet.name);
  Isay.set('saying',_IsaySet.saying);
  Isay.set('expression',_IsaySet.expression);
  Isay.set('plus',0);
  
  Isay.save(null,{
    success: function(saying){
	  callBackFunc();
	},
	error: function(saying,error){
	  console.log(error);
	}
  })
}