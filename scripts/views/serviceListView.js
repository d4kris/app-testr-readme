define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/serviceSearchTemplate.html',
    'views/ServiceDetailVssSectionView',
    'views/serviceDetailsView',
    'dataTables',
    'modal'
], function ( $, _, Backbone, ServiceSearchTemplate,
    ServiceDetailVssSectionView, ServiceDetailsView ) {

  var ListView = Backbone.View.extend({

    tagName : 'table',
    className : 'table table-bordered',

    initialize : function ( options ) {
      console.log('service List view initialize');
      this.router = options.router || {};
      this.render();
    },

    render : function () {
      console.log('service List view rendering');
      var headers = this.appendHeader();
      _.each(this.model.models, function ( part ) {
        this.appendNewPart(part);
      }, this);

      // must add to dom before dataTable() call
      $("#list").html(this.el);

      this.$el.dataTable({
        "aoColumns" : headers,
        "aaSorting" : []
      });

      return this.el;
    },

    /* Create header columns */
    appendHeader : function () {
      return [ {
        "sTitle" : " ",
        "sType" : "string",
        "sWidth" : ".5em"
      }, {
        "sTitle" : "Fgrp",
        "sType" : "numeric",
        "sWidth" : "4em"
      }, {
        "sTitle" : "Title",
        "sType" : "string",
        "sWidth" : "16em"
      }, {
        "sTitle" : "Info type",
        "sType" : "string",
        "sWidth" : "8em"
      }, {
        "sTitle" : "Operation",
        "sType" : "numeric",
        "sWidth" : "4em"
      }, {
        "sTitle" : "Date",
        "sType" : "date",
        "sWidth" : "4em"
      } ];
    },

    /* Add a row to table */
    appendNewPart : function ( part ) {
      this.$el.append(new ListItemView({
        model : part,
        router : this.router
      }).render());
    }
  });

  /**
   * Inner view displaying a single item in the list
   */
  var ListItemView = Backbone.View.extend({

    tagName : 'tr',

    events : {
      'click' : 'clickRow'
    },

    initialize : function ( options ) {
      this.template = _.template(ServiceSearchTemplate);
      this.router = options.router;
    },

    render : function ( eventName ) {
      console.log('list item rendering');
      this.$el.html(this.template(this.model.toJSON()));
      this.id = this.model.id;
      return this.el;
    },

    clickRow : function ( event ) {
      console.log('click row, details service vssHeaders: ' + 
          this.model.toJSON().vssHeaders);

      if (this.model.get('singleVss')) {
        // open details window with ServiceDetailsView
        var detailsView = new ServiceDetailsView({
          model : this.model.get('vssHeaders'),
          router : this.router,
          desc : this.model.get('title')
        });
        this.router.serviceDetailView['detailsView'] = detailsView;
        this.router.subtabsModel.set({
          showDetails : true,
          active : 'details'
        });
        this.router.contentRegion.show(detailsView);
        
      } else {
        // open new window with ServiceDetailVssSectionView table
        var view = new ServiceDetailVssSectionView({
          model : this.model.get('vssHeaders'),
          router : this.router,
          desc : this.model.get('title')

        });
        $('#appModal .modal-body').html(view.el);
        $('#appModal').modal();
      }
    }

  });

  return ListView;
});
