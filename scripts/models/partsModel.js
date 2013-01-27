define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone ) {

	var PartsModel = Backbone.Model.extend({

    /* Called when response comes back from server on sync and save */
    parse : function(response) {
      var s;
      if (response.sections.length > 0) {
      } else {
        // only one section, simple object, wrap in array
        s = new Array();
        s[0] = response.sections;
        response.sections = s;
      }
      response.functionGroup = response.sections[0].fgrp;
      return response;
    },

    defaults : {
      heading  : '',
      sections : [],
      source   : '',
      title    : '',
      type     : ''
    }

  });

  return PartsModel;
});
