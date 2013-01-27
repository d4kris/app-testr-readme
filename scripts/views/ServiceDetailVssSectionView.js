define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/serviceVssSectionHeaderTemplate.html',
  'text!templates/serviceVssSectionTemplate.html',
  'models/serviceDetailsModel',
  'views/serviceDetailsView',
  'dataTables',
  'modal' 
], function($, _, Backbone, HeaderTemplate, RowTemplate, 
    ServiceDetailsModel, ServiceDetailView) {

  var ServiceDetailVssSectionView = Backbone.View.extend({

    tagName   : 'table',
    className : 'table table-bordered',
    
    initialize : function(options) {
      console.log('ServiceDetailVssSectionsView initialize');
      this.router=options.router;
      this.desc=options.desc;
      
      this.template = _.template(HeaderTemplate);
      this.render();
    },

    render : function() {
      console.log('ServiceDetailVssSectionsView rendering');
      this.appendHeader();
      _.each(this.model, function(vssHeaders) {
        this.appendNewRow(vssHeaders);
      }, this);
      return this.el;
    },
    
    /* Add header row to table */
    appendHeader : function() {
      this.$el.append(this.template());
    },

    /* Add a row to table */
    appendNewRow : function(vssHeaders) {
      this.$el.append(new VssView({
        model : vssHeaders,        
        router : this.router,
        desc	: this.desc
      }).render());
    }
  });

  /**
   * Inner view displaying a single item in the list
   */
  var VssView = Backbone.View.extend({

    tagName : 'tr',

    events    : {
      'click' : 'clickRow'
    },

    initialize : function(options) {
        this.desc = options.desc;
        this.model = options.model;
        this.router = options.router;
        this.template = _.template(RowTemplate);
    },

    render : function(eventName) {
      console.log('list item rendering');        
      this.$el.html(this.template(this.model));
      return this.el;
    }, 
    
    clickRow : function (event) {
      console.log('click row '+this.model.fileURL);
      var detailsView = new ServiceDetailView({
        model : this.model,
        desc : this.desc,
        router : this.router
      });
      this.router.serviceDetailView['detailsView'] = detailsView;
      this.router.subtabsModel.set({
        showDetails : true,
        active : 'details'
      });
      this.router.contentRegion.show(detailsView);      
      $('#appModal').modal('hide');
    }

  });

  return ServiceDetailVssSectionView;
});
