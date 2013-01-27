define([
    'jquery',
    'underscore',
    'backbone',
    'views/searchFormView',
    'text!templates/searchFormTemplate.html',
    'collections/serviceCollection',
    'views/additionalSearchView',
    'views/serviceListView',
    'views/typeaheadView',
    'collections/functionGroups',
    'collections/truckModelCollection' ], function ( $, _, Backbone,
    SearchFormView, SearchFormTemplate, ServiceCollection,
    AdditionalSearchView, ServiceListView, TypeaheadView, FunctionGroups,
    TruckModelCollection ) {

  var ServiceSearchFormView = SearchFormView.extend({

    // send search to server
    search : function () {
      var serviceList, self = this;
      if (this.model.showChassisSeriesDialog()) {
        // show chassis series dialog
        this.showChassisSeriesDialog();
        
      } else {
        this.showLoading('#list');
        serviceList = new ServiceCollection([], {
          searchForm : this.model
        });
        // add the list to the router so we can show it later
        this.router.searchResults['serviceList'] = serviceList;
        serviceList.fetch({
          success : function () {
            // show search result in list
            self.showList();
          }, 
          error : function (list, xhr, options) {
            alert('Failed to fetch services');
          }
        });
      }
    },
    // display search results
    showList : function () {
      if (this.router.searchResults['serviceList']) {
        // hide searchForm on smaller screens
        this.hideSearchForm();
        new ServiceListView({
            router : this.router,
            model: this.router.searchResults['serviceList']
        });
      }
    },
    
    // insert the info types list from user settings
    updateInfoTypes : function ( userSettings ) {
      console.log("Info types update "
          + (userSettings.toJSON().settingsService.infoTypes.length));
      _.each(userSettings.toJSON().settingsService.infoTypes, function (
          infoType ) {
        $(".infoTypes", this.$el).append(
            "<option value='" + infoType.id + "'>" + infoType.description
                + "</option>");
      });
    },

    updateAdditionalSearch : function ( userSettings ) {
      console.log('Additional search on show- service form');
      new AdditionalSearchView({
        model : userSettings.get('settingsService')
      }).render();
    }
  });

  return ServiceSearchFormView;
});
