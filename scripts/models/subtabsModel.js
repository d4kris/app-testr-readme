define([ 
   'jquery', 'underscore', 'backbone' 
], function($, _, Backbone) {

  var SubtabsModel = Backbone.Model.extend({
    defaults : {
      menu   : 'parts',
      active : 'search',
      showSearch : true,
      showDetails : false
    }
  });

  return SubtabsModel;
});
