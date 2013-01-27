define([
  'jquery',
  'underscore',
  'backbone',
  'models/truckModelModel'
], function ( $, _, Backbone, TruckModelModel ) {

  /**
   * Typeahead models for search form
   */
	var TruckModelCollection = Backbone.Collection.extend({
      model : TruckModelModel, 
      url   : '../services/user.json/models', 
      
      parse : function (response) {
        return response.model;
      }
  });

  return TruckModelCollection;
});
