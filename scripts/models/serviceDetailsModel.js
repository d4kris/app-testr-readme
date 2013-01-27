define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone ) {

	var ServiceDetailsModel = Backbone.Model.extend({
	  
	  urlRoot: '/',
	  
    defaults : {
      
      fileURL  : ''
    },
    
    url: function () {
      console.log('fetching service details from '+this.urlRoot + this.model.get('fileURL'));
      return this.urlRoot + this.model.get('fileURL');
    },
    
    /* Called when response comes back from server on sync and save */
    parse: function (response) {
      return response;
    }
  });
	
  return ServiceDetailsModel;
});
