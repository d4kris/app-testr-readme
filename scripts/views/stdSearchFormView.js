define([
  'jquery',
  'underscore',
  'backbone',
  'views/searchFormView',
  'text!templates/searchFormTemplate.html',
  'collections/stdPartsCollection',
  'views/dtListView',
  'views/typeaheadView',
  'collections/functionGroups',
  'collections/truckModelCollection'
], function ( $, _, Backbone, SearchFormView, SearchFormTemplate, 
    StdPartsCollection, ListView, TypeaheadView, FunctionGroups, 
    TruckModelCollection ) {

  var StdSearchFormView = SearchFormView.extend({

    // search for standard parts 
    search : function() {
      var partsList, self = this;
      // show spinner 
      this.showLoading('#list');
      partsList = new StdPartsCollection([], { searchForm : this.model });
      partsList.fetch({
        success: function() {
          // show search result in list
          self.showList();
        }
      });
      this.router.searchResults['stpList'] = partsList;
    },
    
    showList : function () {
      if (this.router.searchResults['stpList']) {
        new ListView({
          model: this.router.searchResults['stpList']
        });
      }
    }
  });

  return StdSearchFormView;
});
