define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {

  var vehicleModel = Backbone.Model.extend({

    /* Called when response comes back from server on sync and save */
    parse : function(response) {
      return response;
    },

    defaults : {
    	chassisNo : '',
    	chassisSeries : '',
    	model : '',
    	productClass : '',
    	vin : ''
     
    }

  });

  return vehicleModel;
});
