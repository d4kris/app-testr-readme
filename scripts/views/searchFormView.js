define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/searchFormTemplate.html',
    'views/typeaheadView',
    'views/vehicleListView',
    'collections/functionGroups',
    'collections/truckModelCollection',
    'collections/vehicleCollection',
    'models/searchFormModel',
    'models/systemSettings' ], function ( $, _, Backbone, SearchFormTemplate,
    TypeaheadView, VehicleListView, FunctionGroups, TruckModelCollection, VehicleCollection, SearchFormModel,
    systemSettings ) {

  var SearchFormView = Backbone.Marionette.ItemView.extend({

    id : 'searchForm',
    template : SearchFormTemplate,

    events : {
      'change' : 'onChange',
      'click #search' : 'search',
      'click #clear' : 'clear',
      'click #slide' : 'formSlide',
      'submit form' : 'filterEnter'
    },

    // override constructor
    initialize : function ( options ) {
      console.log('searchFormView initialize');

      // get the user settings and update select on any changes to them
      this.userSettings = options.userSettings || {};
      this.router = options.router;
      this.settings = options.settings || {};
      this.bindTo(this.userSettings, 'change', this.updateInfoTypes);
      this.bindTo(this.userSettings, 'change', this.updateAdditionalSearch);
    },

    // called by BM after the view has been rendered first time (on region.show)
    onShow : function () {
      console.log('Search view onShow...');
      if (this.userSettings.get('settingsService').infoTypes) {
        this.updateInfoTypes(this.userSettings);
        this.updateAdditionalSearch(this.userSettings);
      }
      // load autocomplete contents
      this.loadModelTypeahead();
      this.loadFunctionGroupTypeahead();
      // show saved results if there are any
      this.showList();
      // update which buttons should be enabled
      this.disableAndHide();
    },

    // event handler for change event
    onChange : function ( event ) {
    	console.log(' event handler for change event...');  
      // Apply the change to the model
      var inputField = event.target, change = {};
      // assume all values can be uppercased
      change[inputField.name] = inputField.value.toUpperCase();
      this.model.set(change);
      this.disableAndHide(event);
    },
   
    // event handler for form submits
    filterEnter : function ( event ) {
      if (event.type == 'submit') {
        // stop submit event on enter in form,
        // searchParts is called from click event
        event.preventDefault();
      }
    },
   
    // event handler for clear
    clear : function ( event ) {
      console.log('Search view clear...' + event.type);
      this.router.clear();
    },

    // load model autocomplete list
    loadModelTypeahead : function () {
      if (!this.typeaheadModel) {
        this.typeaheadModel = new TypeaheadView({
          el : '#modelTypeahead',
          inputId : 'model',
          displayModel : {
            'value' : this.model.get('model'),
            'placeHolder' : 'Model'
          },
          collection : new TruckModelCollection(),
          filterKeys : [ 'id' ]
        });
      } else {
        this.typeaheadModel.render();
      }
    },

    // load function group autocomplete list
    loadFunctionGroupTypeahead : function () {
      if (!this.typeaheadFunctionGroup) {
        this.typeaheadFunctionGroup = new TypeaheadView({
          el : '#functionGroupTypeahead',
          inputId : 'functionGroup',
          displayModel : {
            'value' : this.model.get('functionGroup'),
            'placeHolder' : 'Group id'
          },
          collection : new FunctionGroups(),
          filterKeys : [ 'id', 'description' ],
          updateLabel : '#functionGroupLabel'
        });
      } else {
        this.typeaheadFunctionGroup.render();
      }
    },

    // check business logic for disabling or hiding form fields
    // called after change events
    disableAndHide : function ( event ) {
      console.log('disableAndHide');
      systemSettings.checkAndEnable();
    },

    hideSearchForm : function () {
      // find an element with class="visible-desktop"
      // if it is hidden bootstrap-responsive.css has hidden it because the screen is too small
      if ($('.visible-desktop').css('display')=='none') { 
        // hide search form
        this.formSlide();
        $('#form').removeClass('in');
      }
    }, 

    // event handler for slide event, show/hide search form
    formSlide : function ( event ) {
      var $searchForm = $('#searchform'), 
        $results = $('#results'), 
        $collapse = $('#collapse'), 
        $slideIcon = $('#slide i');
      
      if ($searchForm.is('.span3')) {
        console.log('formSlide hide');
        
        $searchForm.removeClass('span3');
        $searchForm.addClass('span1');
        $collapse.removeClass('span11');
        $collapse.addClass('span9');
        $results.removeClass('span9');
        $results.addClass('span11');
        $searchForm.removeClass('border-right');
        $slideIcon.removeClass('icon-circle-arrow-left');
        $slideIcon.addClass('icon-circle-arrow-right');

      } else {
    	  $searchForm.removeClass('span1');
    	  $searchForm.addClass('span3');
    	  $collapse.removeClass('span9');
        $collapse.addClass('span11');
    	  $results.removeClass('span11');
    	  $results.addClass('span9');         
        $searchForm.addClass('border-right');
        $slideIcon.removeClass('icon-circle-arrow-right');
        $slideIcon.addClass('icon-circle-arrow-left');
      }
      // reset the table to whatever 100% is after slide
      $results.find('table').css('width','100%');
    },

    // show chassis series chooser dialog 
    showChassisSeriesDialog : function () {
      var self = this, chassisList;
      chassisList = new VehicleCollection([], {
        searchForm : this.model
      });
      chassisList.fetch({
        success : function () {
          // show chassis result in dialog
          var chassisView = new VehicleListView({
            model : chassisList,
            searchFormModel : self.model
          });
          $('#chassisModal .modal-body').html(chassisView.el);
          $('#chassisModal').modal();
        }, 
        error : function () {
          console.log('failed to fetch vehicles for chassis series dialog');
        }
      });
    },
    
    // handle search events
    search : function () {
      // this method needs to be implemented in subclasses
      console.log('need to implement search for this tab');
    },

    // show search result
    showList : function () {
      // this method needs to be implemented in subclasses
      console.log('need to implement showList for this tab');
      // dont forget to hide searchForm on smaller screens
      this.hideSearchForm();
    },

    // display info types drop down
    updateInfoTypes : function ( userSettings ) {
      // this method needs to be implemented in subclasses
      console.log('need to implement updateInfoTypes for this tab');
    },

    // display addiational search values drop down
    updateAdditionalSearch : function ( userSettings ) {
      // this method needs to be implemented in subclasses
      console.log('need to implement updateAdditionalSearch for this tab');
    }
  });

  return SearchFormView;
});
