define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/partSectionsHeaderTemplate.html',
  'text!templates/partSectionsTemplate.html',
  'models/partDetailsModel',
  'views/partDetailsView',
  'modal' 
], function($, _, Backbone, HeaderTemplate, RowTemplate, 
    PartDetailsModel, PartDetailsView) {

  var PartSectionsView = Backbone.View.extend({

//    id: 'appModal',
    tagName   : 'table',
    className : 'table table-bordered',
    
    initialize : function() {
      console.log('PartSectionsView initialize');
      this.template = _.template(HeaderTemplate);

//      this.model.bind('all', this.render, this);
      this.render();
    },

    render : function() {
      console.log('PartSectionsView rendering');
      this.appendHeader();
      _.each(this.model, function(section) {
        this.appendNewRow(section);
      }, this);
      return this.el;
    },
    
    /* Add header row to table */
    appendHeader : function() {
      this.$el.append(this.template());
    },

    /* Add a row to table */
    appendNewRow : function(section) {
      this.$el.append(new PartSectionView({
        model : section
      }).render());
    }
  });

  /**
   * Inner view displaying a single item in the list
   */
  var PartSectionView = Backbone.View.extend({

    tagName : 'tr',

    events    : {
      'click' : 'clickRow'
    },

    initialize : function() {
      this.template = _.template(RowTemplate);
    },

    render : function(eventName) {
      console.log('list item rendering');
      this.$el.html(this.template(this.model));
      return this.el;
    }, 
    
    clickRow : function (event) {
      console.log('click row '+this.model.url);
      Backbone.history.navigate('#details/'+this.model.url, {trigger:true});
      $('#appModal').modal('hide');
    }

  });

  return PartSectionsView;
});
