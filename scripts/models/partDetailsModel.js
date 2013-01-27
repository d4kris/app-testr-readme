define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone ) {

	var PartDetailsModel = Backbone.Model.extend({
	  
	  urlRoot: '../',
	  
    defaults : {
      id       : '',
      restUrl  : '',
      partRows : [],
      section  : {},
      illustrations : {}
    },
    
    url: function () {
      console.log('fetching part details from '+this.urlRoot + this.get('restUrl'));
      return this.urlRoot + this.get('restUrl');
    },
    
    /* Called when response comes back from server on sync and save */
    parse: function (response) {
      return response;
    }
  });
	
  return PartDetailsModel;
});
