define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/additionalSearchTemplate.html',
  'transition',
  'accordion'
], function( $, _, Backbone, Template ) {
  /**
   * Requires an element id to bind to and a model with an 
   * attribute list "additionalSearches"
   * usage: new AdditionalSearchView({ 
   *  model: settings, 
   *  id: 'fgrpInput' 
   * })
   */
  var AdditionalSearchView = Backbone.View.extend({

    id        : 'additionalSearch',  
//    template  : template,  
    
    initialize : function( options ) {
      console.log('AdditionalSearchView initialize');
      this.template = _.template(Template);
    },

    render : function() {
      var self = this;
      console.log('AdditionalSearchView rendering');
      $("#additionalSearch").append(this.template(this.model));
    }
  });
  
  return AdditionalSearchView;
});
