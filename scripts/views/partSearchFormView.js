define([
    'jquery',
    'underscore',
    'backbone',
    'views/searchFormView',
    'text!templates/searchFormTemplate.html',
    'collections/partsCollection',
    'views/listView',
    'views/typeaheadView',
    'views/additionalSearchView',
    'collections/functionGroups',
    'collections/truckModelCollection' ],
    function ( $, _, Backbone, SearchFormView, SearchFormTemplate,
        PartsCollection, ListView, TypeaheadView, AdditionalSearchView,
        FunctionGroups, TruckModelCollection ) {

      var PartSearchFormView = SearchFormView.extend({

        search : function () {
          var partsList, self = this;
          this.showLoading('#list');
          partsList = new PartsCollection([], {
            searchForm : this.model
          });
          partsList.fetch({
            success : function () {
              // show search result in list
              self.showList();
            }
          });
          this.router.searchResults['partList'] = partsList;
        },
        
        showList : function () {
          if (this.router.searchResults['partList']) {
            new ListView({
              model: this.router.searchResults['partList']
            });
          }
        },

        // insert the info types list from user settings
        updateInfoTypes : function ( userSettings ) {
          console.log("Info types update "
              + (userSettings.toJSON().settingsParts.infoTypes.length));
          _.each(userSettings.toJSON().settingsParts.infoTypes, function (
              infoType ) {
            $(".infoTypes", this.$el).append(
                "<option value='" + infoType.id + "'>" + infoType.description
                    + "</option>");
          });
        },

        updateAdditionalSearch : function ( userSettings ) {
          console.log('Part search on show');
          new AdditionalSearchView({
            model : userSettings.get('settingsParts')
          }).render();
        }
      });

      return PartSearchFormView;
    });
