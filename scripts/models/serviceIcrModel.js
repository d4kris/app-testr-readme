define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {

  var serviceIcrModel = Backbone.Model.extend({

	 
	  url : '../services/concernreport.json/serviceinfo?',   

      /* constructor to pass in the param */
      initialize : function(options) {

          this.chassisSeries =options.chassisSeries;
          this.chassisNo =options.chassisNo;
          this.brand=options.brand;
          this.vin =options.vin;
          this.fgrp =options.fgrp;
          this.ioId =options.ioId;
          this.infoTypeCompleteId =options.infoTypeCompleteId;
          this.title =options.desc;
          this.additionalSearchType =options.additionalSearchType;
          this.additionalSearchValue =options.additionalSearchValue;
          this.vssDesc =options.desc;
          
      },
      validateAll: function () {

          var messages = {};
          this.validators = {};

          this.validators.brand = function (value) {
              return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must select a Brand"};
          };

          this.validators.problemType = function (value) {
              return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must select a Problem Type"};
          };

          this.validators.vehicleStatus = function (value) {
              return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must select a vehicle Status"};
          };
          for (var key in this.validators) {
              if(this.validators.hasOwnProperty(key)) {
                  var check = this.validators[key](this.get(key));
                  if (check.isValid === false) {
                      messages[key] = check.message;
                  }
              }
          }

          return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
      },
    defaults : {
    	brand : '',
    	problemType : '',
    	vehicleStatus : '',
    	modelId : '',
    	chassisSeries : '',
    	chassisNo  : '',
    	vin : '',
    	problemDesc : '',
    	fgrp:'',
    	ioId :'',
    	infoTypeCompleteId : '',
    	title : '',
    	additionalSearchType:'',
    	additionalSearchValue :'',
    	vssDesc :''
    }

  });

  return serviceIcrModel;
});
