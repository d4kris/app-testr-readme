define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone ) {

	var TruckModelModel = Backbone.Model.extend({

    defaults : {
      brand   : '',
      modelId : ''
    }, 
    
    parse : function (response) {
      // needed for _.pluck to work 
      response.id = response.modelId;
      return response;
    }
  });

  return TruckModelModel;
});
