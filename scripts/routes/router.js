define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'views/subtabsView',
  'models/subtabsModel',
  'views/partSearchFormView',
  'views/serviceSearchFormView',
  'models/searchFormModel',
  'views/partDetailsView',
  'models/partDetailsModel',
  'views/serviceDetailsView',
  'models/serviceDetailsModel',
  'views/stdSearchFormView' 
], function ( $, _, Backbone, Marionette,
    SubtabsView, SubtabsModel, PartSearchFormView, ServiceSearchFormView,
    SearchFormModel, PartDetailsView, PartDetailsModel, ServiceDetailsView,
    ServiceDetailsModel, StdSearchFormView ) {

  var ImpactRouter = Backbone.Router.extend({

    // all search results
    searchResults : {},

    serviceDetailView : {},

    // search details, should use this with detailsView['service']
    detailsView : {},

    initialize : function ( options ) {
      this.userSettings = options.userSettings;

      // create a region to manage the #content element
      this.contentRegion = new Backbone.Marionette.Region({
        el : '#content'
      });

      // create a region to manage the #subtabs element
      this.subtabsRegion = new Backbone.Marionette.Region({
        el : '#head'
      });
      // populate the subtabs region
      this.subtabsModel = new SubtabsModel();
      this.subtabsView = new SubtabsView({
        model : this.subtabsModel
      });
      this.subtabsRegion.show(this.subtabsView);

      // display parts tab
      this.parts();
    },

    routes : {
      'partsTab' : 'parts',
      'stdPartsTab' : 'stdParts',
      'details/*url' : 'details',
      'parts/search' : 'searchForm',
      'parts/details' : 'partsDetails',
      'stdParts/search' : 'stdSearch',
      'stdParts/details' : 'stdPartsDetails',
      'serviceTab' : 'service',
      'service/search' : 'serviceSearch',
      'service/details' : 'serviceDetails'

    },

    details : function ( url ) {
      switch (this.activeTab) {
      case 'parts':
        return this.partsDetails(url);
      case 'stdParts':
        return this.stdPartsDetails(url);
      case 'service':
        return this.serviceDetails(url);
      }
      console.log('unknown details route');
    },

    clear : function () {
      // clear all search results
      this.searchResults = {};
      // show new search form with empty fields
      this.searchFormModel = new SearchFormModel();
      switch (this.activeTab) {
      case 'parts':
        return this.searchForm();
      case 'stdParts':
        return this.stdSearch();
      case 'service':
        return this.service();
      }
    },

    /* parts tab chosen in menu */
    parts : function () {
      this.updateMenu('parts');
      this.searchForm();
      this.subtabsModel.set('showDetails', false);
    },

    /* show search form, clear list */
    searchForm : function () {
      var searchView;
      console.log('Router: searchForm');
      this.subtabsModel.set({
        active : 'search'
      });
      // reuse the search form data between pages
      if (!this.searchFormModel) {
        this.searchFormModel = new SearchFormModel();
      }
      searchView = new PartSearchFormView({
        model : this.searchFormModel,
        userSettings : this.userSettings,
        router : this
      });

      this.contentRegion.show(searchView);
    },

    /* show details */
    partsDetails : function ( url ) {
      console.log('Router: partsDetails ' + url);
      this.subtabsModel.set({
        showDetails : true,
        active : 'details'
      });
      // if we have a new url, update details view to show
      if (url) {
        this.partDetailsView = new PartDetailsView({
          url : url
        });
      } else if (this.partDetailsView) {
        this.partDetailsView.render();
      } else {
        this.subtabsView.showMessage('#content', 'Failed to show details');
      }
    },

    /* Handle click on main tabs, update and show search */
    stdParts : function () {
      this.updateMenu('stdParts');
      this.stdSearch();
      this.subtabsModel.set('showDetails', false);
    },

    /* show search form, clear list */
    stdSearch : function () {
      var searchView;
      console.log('Router: std searchForm');
      this.subtabsModel.set({
        active : 'search'
      });
      if (!this.searchFormModel) {
        this.searchFormModel = new SearchFormModel();
      }
      searchView = new StdSearchFormView({
        model : this.searchFormModel,
        userSettings : this.userSettings,
        router : this
      });
      this.contentRegion.show(searchView);
    },

    stdPartsDetails : function ( url ) {
      // show details
      console.log('Router: stdPartsDetails ' + url);
      this.subtabsModel.set({
        showDetails : true,
        active : 'details'
      });

      if (url) {
        // if we have a new url, update details view to show
        this.stdPartDetailsView = new PartDetailsView({
          url : url
        });
      } else if (this.stdPartDetailsView) {
        // show old details
        this.stdPartDetailsView.render();
      } else {
        // nothing to show
        this.subtabsView.showMessage('#content', 'Failed to show details');
      }
    },

    /* Handle click on main tabs, update and show search */
    service : function () {
      this.updateMenu('service');
      this.serviceSearch();
      this.subtabsModel.set('showDetails', false);
    },
    /* show new search form */
    serviceSearch : function () {
      var searchView;
      console.log('Router: serviceSearchForm');
      this.subtabsModel.set({
        active : 'search'
      });
      if (!this.searchFormModel) {
        this.searchFormModel = new SearchFormModel();
      }
      searchView = new ServiceSearchFormView({
        model : this.searchFormModel,
        userSettings : this.userSettings,
        router : this
      });
      this.contentRegion.show(searchView);
    },

    serviceDetails : function ( url ) {
      // show details
      console.log('Router: serviceDetails- ' + url);
      this.subtabsModel.set({
        showDetails : true,
        active : 'details'
      });

      if (this.serviceDetailView['detailsView']) {
        // show old details
        var view = this.serviceDetailView['detailsView'];
        view.delegateEvents(view.events);
        this.contentRegion.show(view);
      } else {
        // nothing to show
        this.subtabsView.showMessage('#content', 'Failed to show details');
      }
    },

    /* update the active subtab */
    updateMenu : function ( activeTab ) {
      // this.activeTab holds the old active tab
      $('#' + this.activeTab + 'Tab').removeClass('active');
      $('#' + activeTab + 'Tab').addClass('active');
      this.subtabsModel.set('menu', activeTab);
      this.activeTab = activeTab;
    }

  });

  return ImpactRouter;
});
