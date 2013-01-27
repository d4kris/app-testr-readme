define([ 
   'jquery', 
   'underscore', 
   'backbone',
   'text!templates/subtabsTemplate.html' 
], function($, _, Backbone, SubtabsTemplate) {

  // Expose convenience method for showing spinner
  Backbone.View.prototype.showLoading = function(whereSelector) {
    $(whereSelector).
      html('<div><img src="images/ajax-loader-big-circle.gif" alt="Wait" /></div>').
        children().css('margin-left', '50%');
  };
  //Expose convenience method for showing message
  Backbone.View.prototype.showMessage = function( whereSelector, msg ) {
    var msgDiv = this.make('div', {'class':'alert'}, msg); 
    $(whereSelector).
      prepend(msgDiv);
  };

  var SubtabsView = Backbone.Marionette.ItemView.extend({

    id : 'subtabs',
    template : SubtabsTemplate,

    initialize : function() {
      console.log('subtabsView initialize');
      this.bindTo(this.model, 'change', this.render, this);
      this.render();
    }

  });

  return SubtabsView;
});
