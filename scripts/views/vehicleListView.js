define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/chassisHeaderTemplate.html',
    'text!templates/chassisdataTemplate.html',
    'models/searchFormModel',
    'views/searchFormView',
    'modal' ], function ( $, _, Backbone, HeaderTemplate, RowTemplate,
    SearchFormModel, SearchFormView ) {

  var VehicleListView = Backbone.View.extend({

    tagName : 'table',
    className : 'table table-bordered',

    initialize : function ( options ) {
      console.log('VehicleListView initialize');
      this.searchFormModel = options.searchFormModel;
      this.template = _.template(HeaderTemplate);
      this.render();
    },

    render : function () {
      console.log('Vehicle chassis ListView rendering');
      this.appendHeader();
      // loop thu chassisList
      _.each(this.model.models, function ( vehicle ) {
        this.appendNewRow(vehicle);
      }, this);
      return this.el;
    },

    /* Add header row to table */
    appendHeader : function () {
      this.$el.append(this.template());
    },

    /* Add a row to table */
    appendNewRow : function ( vehicle ) {
      this.$el.append(new ChassisView({
        model : vehicle,
        searchFormModel : this.searchFormModel
      }).render());
    }
  });

  /**
   * Inner view displaying a single item in the list
   */
  var ChassisView = Backbone.View.extend({

    tagName : 'tr',

    events : {
      'click' : 'clickRow'
    },

    initialize : function ( options ) {
      this.searchFormModel = options.searchFormModel;
      this.template = _.template(RowTemplate);
    },

    render : function ( eventName ) {
      console.log('list item rendering');
      this.$el.html(this.template(this.model.toJSON()));
      return this.el;
    },

    clickRow : function ( event ) {
      console.log('click row dialog- ' + this.model.get('chassisSeries'));
      this.searchFormModel.set({
        'chassisSeries' : this.model.get('chassisSeries')
      });
      console.log('click row this.searchFormModel- '
          + this.searchFormModel.get('chassisSeries'));
      $('#chassisSeries').val(this.model.get('chassisSeries'));
      $('#chassisModal').modal('hide');

    }

  });

  return VehicleListView;
});
