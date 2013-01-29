define([
  'jquery', 
  'underscore', 
  'backbone' 
], function($, _, Backbone) {

  var ServiceIcrModel = Backbone.Model.extend({
	 
    url : '../services/concernreport.json/serviceinfo?',   

    defaults : {
      chassisSeries : '',
      chassisNo     : '',
      brand         : '',
      vin           : '',
      fgrp          : '',
      ioId          : '',
      infoTypeCompleteId : '',
      title         : '',
      additionalSearchType:'',
      additionalSearchValue :'',
      vssDesc       :'',
      problemType   : '',
      vehicleStatus : '',
      modelId       : '',
      problemDesc   : ''
    },

    /**
     * Check that we have a brand, problemType and vehicleStatus
     */
    validateAll: function () {

      var messages = {};
      this.validators = {};

      this.validators.brand = function (value) {
        return (value.length > 0) ? {isValid: true} : {isValid: false, message: "You must select a Brand"};
      };

      this.validators.problemType = function (value) {
        return (value.length > 0) ? {isValid: true} : {isValid: false, message: "You must select a Problem Type"};
      };

      this.validators.vehicleStatus = function (value) {
        return (value.length > 0) ? {isValid: true} : {isValid: false, message: "You must select a vehicle Status"};
      };
      for ( var key in this.validators ) {
        if ( this.validators.hasOwnProperty(key) ) {
          var check = this.validators[key](this.get(key));
          if (check.isValid === false) {
            messages[key] = check.message;
          }
        }
      }

      return (_.size(messages) > 0) ? {isValid: false, messages: messages} : {isValid: true};
    }

  });

  return ServiceIcrModel;
});
