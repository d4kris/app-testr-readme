define([ 'jquery', 'underscore', 'backbone', 'models/vehicleModel' ], function (
    $, _, Backbone, VehicleModel ) {

  var vehicleCollection = Backbone.Collection.extend({
    model : VehicleModel,
    baseUrl : '../services/user.json/vehicles?',
    searchForm : {},

    /* constructor to pass in the searchForm param */
    initialize : function ( collection, options ) {
      this.searchForm = options.searchForm;
    },

    /* define the url where to fetch the chassis list data */
    url : function () {
      var query = '';
      query += '&chassisNo=' + this.searchForm.get('chassisNo');
      query += '&modelId=' + this.searchForm.get('model');
      query += '&vin=' + this.searchForm.get('vin');

      console.log('Fetching service -: ' + this.baseUrl + query);
      return this.baseUrl + query;
    },

    parse : function ( response ) {
      if (response) {
        return response.vehicle;
      } else { 
        // no result
        return response;
      }
    }
  });

  return vehicleCollection;
});
