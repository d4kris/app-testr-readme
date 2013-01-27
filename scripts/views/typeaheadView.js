define([
    'jquery',
    'jquery-ui',
    'underscore',
    'backbone',
    'typeahead',
    'text!templates/typeaheadTemplate.html' ], function ( $,$ui, _, Backbone,
    typeahead, template ) {
  /**
   * Requires an element id to bind to and a model to fetch data from usage: new
   * TypeaheadView({ model: functionGroups, id: 'fgrpInput' })
   */
  var TypeaheadView = Backbone.View.extend({

    inputId : '',
    displayModel : {}, // any values needed to display the view
    collection : {}, // the list populating the typeahead
    filterKeys : '',

    events : {
      'click .showAll' : 'showAll'
    },

    initialize : function ( options ) {
      var self = this;
      this.inputId = options.inputId;
      this.displayModel = options.displayModel;
      // add inputId to displayModel so we can access it in the template
      this.displayModel.inputId = this.inputId;
      this.collection = options.collection;
      this.filterKeys = options.filterKeys;
      this.updateLabel = options.updateLabel;
      this.open = false;
      if (options.updateLabel) {
        // register onchange listener to be able to update label on all changes
        // (even when not with the typeahead functionality)
//        this.delegateEvents(
            _.extend(this.events,{"change" : "setLabel"});
//            );
      }
      this.template = _.template(template);
      console.log('TypeaheadView initialize id:' + this.inputId);
      // fetch the list directly
      this.collection.fetch({
        success : function ( data ) {
          console.log('fetched typeahead data ' + self.inputId);
          // need to format all items in the list
          self.flatModel = _.map(self.collection.models, function ( item ) {
            // append all values mapped to filterKeys (eg. id, desc) for this
            // item
            return _.reduce(self.filterKeys, function ( memo, key ) {
              if (memo.length > 0) {
                return memo + ', ' + item.get(key);
              } else {
                return item.get(key);
              }
            }, '', item);
          });
          // now we have the list, initialize typeahead functionality
          self.initTypeahead();
        },
        error : function ( msg ) {
          console.log('failed to fetch typeahead data' + self.inputId);
        }
      });
      this.render();
    },

    render : function () {
      // render the input field first
      console.log('TypeaheadView rendering ' + this.inputId);
      this.$el.html(this.template(this.displayModel));
      // shortcut to jquery input field
      this.$typeaheadInput = $('#' + this.inputId);
      return this.el;
    },

    initTypeahead : function () {
      console.log('showAll cal' + this.inputId);
      var self = this;
      
      $('#' + this.inputId).autocomplete({
          minLength: 0,
          source: self.flatModel,
          focus: function( event, ui ) {               	  
           return false;
          },
          select: function( event, ui ) {           
            // user has picked an item in the list
            var arr = ui.item.value.split(', ');        
            $( '#' + self.inputId).val(arr[0]);          
            // remove the current input
            arr.splice(0,1);
            // possibly update a label with whatever is after the comma
            $(self.updateLabel).html(arr.join( ", " )); 
            self.open = false;  
            self.value=arr[0]; 
            $('#' + self.inputId).trigger('change');             
            return false;
           
          }
        })
        .data( "autocomplete" )._renderItem = function( ul, item ) {
          return $( "<li>" )
            .data( "item.autocomplete", item.value  )
            .append( "<a>" + item.value + "</a>" )
            .appendTo( ul );
        };
      this.$typeaheadInput.keyup(function ( event ) {
        event.target.value = event.target.value.toUpperCase();
      });
    },

    showAll : function () {
      console.log('showAll this.open-' + this.open);     
      $('#' + this.inputId).focus();
      if (this.open) {
    	   $("#dialog").dialog({
      	    close: function() {
      	    	$('#' + this.inputId).autocomplete('close');
      	    }
      	}); 
      
      this.open = false;
      } else {      
    	  $('#' + this.inputId).autocomplete( "search", "" );
          $('#' + this.inputId).focus();
          this.open = true;
      } 
    }, 
    // update the label specified by updateLabel
    setLabel : function (event) {
      var label;
      label = this.collection.find(function (item) {
        return item.id == event.target.value;
      });
      if (label) {
        $(this.updateLabel).html(label.get('description'));
      }
    }
  });

  return TypeaheadView;
});
