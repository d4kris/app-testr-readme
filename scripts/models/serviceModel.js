define([ 
  'jquery', 
  'underscore', 
  'backbone' 
], function($, _, Backbone) {

  var ServiceModel = Backbone.Model.extend({

    /* Called when response comes back from server on sync and save */
    parse : function(response) {
      //picking the date field form the VSS headers as we do not have any in headers
      response.date = response.vssHeaders.date;
      // need to handle multiple vss headers differently in view and template
      response.singleVss = (response.vssHeaders.length < 2);

      return response;
    },

    defaults : {
      functionGroup : '',
      hasRequiredParts : '',
      ihId : '',
      infoHeaderServiceURL: '',
      infoType : '',
      infoTypeId : '',
      operationId : '',
      operationNo : '',
      title : '',
      date : '',
      singleVss : true,
      vssHeaders : []
    }

  });

  return ServiceModel;
});
