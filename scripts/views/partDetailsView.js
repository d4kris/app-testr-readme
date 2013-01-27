define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'models/partDetailsModel', 
  'text!templates/partDetailsTemplate.html',
  'text!templates/listHeaderTemplate.html',
  'text!templates/partRowTemplate.html'
], function($, _, Backbone, PartDetailsModel, DetailsTemplate, TableHeaderTemplate, PartRowTemplate ) {

  /**
   * Display a detailed view of a part, with image and subparts
   */
  var PartDetailsView = Backbone.View.extend({

    id : 'content',
    
    initialize : function( options ) {
      console.log('PartDetailsView initialize');
      // only fetch new models
      if (!this.model || this.model.get('restUrl') != options.url) {
        // fetch model
        this.model = new PartDetailsModel({
          restUrl: options.url
        });
        this.model.fetch({
          success: function(model, response) {
            console.log('OK fetch part details, '+model.cid);
          },
          error: function(model, response) {
            console.log('Failed to fetch part details, '+response);
          }
        });
      }
      this.template = _.template(DetailsTemplate);
      this.model.bind('change', this.render, this);
      this.showLoading('#content');
    },

    render : function() {
      console.log('PartDetailsView rendering');
      // create page structure w 2 cols and table in right
      // TODO drag col width
      $('#content').html(this.$el.html(this.template()));
      // append table 
      $('table', this.el).
        append(new PartRowTbodyView({ model: this.model }).el).
          dataTable({
            'sDom': '<"H"Tlfr>t<"F"ip>',
            'aoColumnDefs': [
               { 'bSortable': false, 'aTargets' : [0] }, // no sorting on first column
               { 'sWidth' : '1%', 'aTargets' : [0,5,7]}
             ],
             'aaSorting': [[1,'asc']], // sort by pos default
             'iDisplayLength': 25
          });
      // append image
      $('#image', this.el).html(new PartImageView({ model: this.model }).el);
      
      return this.$el;
    }

	});
  

  /**
   *  Create an image element
   */
  var PartImageView = Backbone.View.extend({

    tagName   : 'img',
    className : '',
    
    initialize : function() {
      this.render();
    },

    render : function() {
      this.appendImg(this.model.get('illustrations'));
      return this.el;
    },
    
    /* Add img element to el */
    appendImg : function(imageData) {
      if (imageData.notIllustrated=='false' && imageData.url) {
        this.el.src = imageData.url;
      }
    }
  });
  
  /**
   * Create a table element
   */
  var PartRowTbodyView = Backbone.View.extend({

    tagName   : 'tbody',
    
    initialize : function() {
      this.model.bind('reset', this.render, this);
      this.render();
    },

    render : function() {
      _.each(this.model.get('partRows'), function(row) {
        this.appendRow(row);
      }, this);
      return this.el;
    },
    
    /* Add a row to table */
    appendRow : function(row) {
      this.$el.append(new PartRowItemView({
        model : row
      }).render());
    }
  });
  
  /**
   * Inner view displaying a single item in the list
   */
  var PartRowItemView = Backbone.View.extend({

    tagName : 'tr',

    initialize : function() {
      this.template = _.template(PartRowTemplate);
    },

    render : function(eventName) {
      console.log('Part row rendering');
      this.$el.html(this.template(this.model));
      this.id = this.model.partId;
      return this.el;
    }
  });

	return PartDetailsView;
});