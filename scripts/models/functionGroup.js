define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone ) {

	var FunctionGroup = Backbone.Model.extend({
    defaults : {
      'description'  : '',
      'id'    : '',
      'level' : ''
    }, 
    
    parse : function (response) {
      var o = new Object();
      o.description = response.description;
      o.id = response.id;
      o.level = response.level;
      return response;
    }
    
  });

  return FunctionGroup;
});
