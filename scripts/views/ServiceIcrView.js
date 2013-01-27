define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!templates/serviceIcrTemplate.html',
        'models/serviceDetailsModel',
        'models/serviceIcrModel',
        'views/serviceDetailsView',
        'modal' ],
    function ( $, _, Backbone, IcrTemplate, ServiceDetailsModel,
        ServiceIcrModel, ServiceDetailsView ) {

      var ServiceIcrView = Backbone.View
          .extend({

            events : {
              'change' : 'onChange',
              'click #icrsend' : 'beforeSend'
            },
            initialize : function ( options ) {
              console.log('ServiceIcrView initialize');
              this.arr = {};

              this.router = options.router;
              this.desc = options.desc;
              this.template = _.template(IcrTemplate);
              this.requestParams = this.router.searchResults['serviceList'].requestParams;
              this.vehicle = this.router.searchResults['serviceList'];
              this.arr['req'] = _.object(_.pluck(this.requestParams, 'name'), _
                  .pluck(this.requestParams, 'value'));
              // create compound model with all params needed to display form 
              this.model = _.extend(this.model, this.router.userSettings
                  .toJSON(), this.arr,this.vehicle);
              // create a model to save the data to send to server
              this.sendModel = new ServiceIcrModel({
                modelId : this.model.req.modelId,
                brand:this.model.vehicle.brand,
                chassisSeries : this.model.req.chassisSeries,
                chassisNo : this.model.req.chassisNo,
                vin : this.model.req.vin,
                fgrp : this.model.req.fgrp,
                ioId : this.model.ioId,
                infoTypeCompleteId : this.model.req.infoTypeCompleteId,
                title : this.model.desc,
                additionalSearchType : this.model.req.additionalSearchType,
                additionalSearchValue : this.model.req.additionalSearchValue,
                vssDesc : this.model.desc
              });

              this.render();
            },

            render : function () {
              console.log('ServiceIcrView rendering');
              this.$el.html(this.template(this.model));
              return this.el;
            },

            // event handler for change event
            onChange : function ( event ) {
              console.log('ServiceIcrView change');
              // Apply the change to the model
              var inputField = event.target, change = {}, check;
              change[inputField.name] = inputField.value;
              console.log('ServiceIcrView input ' + inputField.value);
              this.sendModel.set(change);
              check = this.sendModel.validateAll();
              console.log('ServiceIcrView b4send chk :' + check.isValid);
              if (check.isValid) {
                $('#icrsend').prop('disabled', false);
              } else{
            	  $('#icrsend').prop('disabled', true);
              }
            },

            beforeSend : function () {
              console.log('ServiceIcrView b4send');
              var self = this, check = this.sendModel.validateAll();
              console.log('ServiceIcrView b4send chk :' + check);
              if (!check.isValid) {
                console.log('ServiceIcrView send fail' + check.isValid);
                self.displayValidationErrors(check.messages);
              } else {
                self.send();
              }
              return false;
            },

            send : function () {
              console.log('ServiceIcrView send');
              var self = this;
              // save the model attributes
              this.sendModel
                  .save(
                      null,
                      {
                        success : function () {
                          console
                              .log('ServiceIcrView send-Ticket has been logged');
                          self.showAlert('Success!!', 'Ticket has been logged',
                              'alert-success');
                        },
                        error : function () {
                          console
                              .log('ServiceIcrView send-error occurred while trying to log the ticket');
                          self
                              .showAlert(
                                  'Error',
                                  'An error occurred while trying to log the ticket.',
                                  'alert-error');
                        }
                      });

            },

            showAlert : function ( title, text, klass ) {
              var $alert = $('.alert');
              $alert
                  .removeClass("alert-error alert-warning alert-success alert-info");
              $alert.addClass(klass);
              $alert.html('<strong>' + title + '</strong> ' + text);
              $alert.show();
            },

            displayValidationErrors : function ( messages ) {
              var self = this, key;
              for (key in messages) {
                if (messages.hasOwnProperty(key)) {
                  self.showAlert('Warning!', messages[key], 'alert-warning');
                }
              }
            }

          });

      return ServiceIcrView;
    });
