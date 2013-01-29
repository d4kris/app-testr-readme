define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/serviceModel' 
], function($, _, Backbone, ServiceModel) {

  var ServiceCollection = Backbone.Collection.extend({

    model : ServiceModel,
    baseUrl : '../services/serviceinfo.json/search?',
    searchForm : {},

    /* constructor to pass in the searchForm param */
    initialize : function(collection, options) {
      this.searchForm = (options && options.searchForm) || {};
    },

    /* define the url where to fetch the parts data */
    url : function() {
      var query = '';
      query += 'modelId=' + this.searchForm.get('model');
      query += '&chassisSeries=' + this.searchForm.get('chassisSeries');
      query += '&chassisNo=' + this.searchForm.get('chassisNo');
      query += '&vin=' + this.searchForm.get('vin');
      query += '&infoTypeCompleteId=' + this.searchForm.get('infoType');
      query += '&fgrp=' + this.searchForm.get('functionGroup');
      query += '&additionalSearchType=' + this.searchForm.get('additionalSearch');
      query += '&additionalSearchValue=' + this.searchForm.get('additionalValue');

      console.log('Fetching services: ' + this.baseUrl + query);
      return this.baseUrl + query;
    },

    parse : function(response) {
      // headings are wrapped in a headers object that BB turns into an
      // array. Store the search parameters in the result too
      this.requestParams = response.requestParams;
      this.vehicle = response.vehicle;
      this.usedFgrp = response.usedFgrp;
      return response.headers;
    }
  });

  return ServiceCollection;
});
