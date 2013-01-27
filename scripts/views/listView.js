define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/listHeaderTemplate.html',
    'text!templates/listItemTemplate.html',
    'views/partSectionsView' ], function ( $, _, Backbone, ListHeaderTemplate,
    ListItemTemplate, PartSectionsView ) {

  var ListView = Backbone.View.extend({

    tagName : 'table',
    className : 'table table-bordered',

    initialize : function () {
      console.log('List view initialize');
      this.template = _.template(ListHeaderTemplate);

      this.model.bind('reset', this.render, this);
      this.model.bind('add', this.appendNewPart, this);
      this.render();
    },

    render : function () {
      console.log('List view rendering');
      var headers = this.appendHeader();
      _.each(this.model.models, function ( part ) {
        this.appendNewPart(part);
      }, this);

      // must add to dom before dataTable() call
      $("#list").html(this.el);

      this.$el.dataTable({
        "aoColumns" : headers,
        "iDisplayLength": 25
      });

      return this.el;
    },

    /* Create header columns */
    appendHeader : function () {
      return [ {
        "sTitle" : "Function group",
        "sType" : "numeric",
        "sWidth" : "8em"
      }, {
        "sTitle" : "Title",
        "sType" : "string"
      } ];
    },

    /* Add a row to table */
    appendNewPart : function ( part ) {
      this.$el.append(new ListItemView({
        model : part
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

    initialize : function () {
      this.template = _.template(ListItemTemplate);
      this.model.bind('change', this.render, this);
    },

    render : function ( eventName ) {
      console.log('list item rendering');
      this.$el.html(this.template(this.model.toJSON()));
      this.id = this.model.id;
      return this.el;
    },

    clickRow : function ( event ) {
      console.log('click row id' + this.model.id);
      // open new window with PartSections table
      var view = new PartSectionsView({
        model : this.model.get('sections')
      });
      $('#appModal .modal-body').html(view.el);
      $('#appModal').modal();
    }

  });

  return ListView;
});
