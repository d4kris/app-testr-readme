define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!templates/serviceNotesTemplate.html',
        'models/serviceNotesModel',
        'modal' ],
    function ( $, _, Backbone, NotesTemplate,ServiceNotesModel) {

      var ServicenotesFormView = Backbone.View.extend({
    	    
            events : { 
            	'change' : 'onChange',
            	'click #saveNotes' : 'saveNotes',
            	'click #clearNotes' : 'clearForm'
            },
            
            initialize : function ( options ) {
              console.log('ServicenotesFormView initialize');
              this.ioid = this.model.get('ioid');
              this.brand = this.model.get('brand');
              this.template = _.template(NotesTemplate);
              this.render();
            },

            render : function () {
              console.log('ServicenotesFormView rendering');
              this.$el.html(this.template(this.model.toJSON()));
              $('#notesModal .modal-body #notesform').html(this.el); 
              $('#notesModal').modal({ backdrop : 'static' });
            },
            
            // event handler for change event
            onChange : function ( event ) {
              console.log('ServiceNotesformView change');
              // Apply the change to the model
              var inputField = event.target, change = {}, check;
              change[inputField.name] = inputField.value;
              this.model.set(change);
              
              
              if($('input[name=publicNote]').is(':checked')){
          	 	this.model.set("publicNote","true");
          	 }else{
          		 this.model.set("publicNote","false");	 
          	 }
             console.log('ServiceNotesformView input ' + inputField.value);

            },
            saveNotes : function () {
              console.log('ServicenotesFormView save');
              var self = this;
              //create model in collection after  server responds 200 OK status
              self.collection.create(self.model,{
                  wait: true,
                  success : function(){
                	   console
                       .log('ServicenotesFormView -Notes has been Saved');
                   self.showAlert('Success!!', 'Notes has been Saved',
                       'alert-success');
                   //To be deleted after upgrade of BB version
                   self.collection.trigger('sync');
                   self.clearForm();
                   
                  },
                  error : function( title, text, klass){
                	  console
                      .log('ServicenotesFormView send-error occurred while trying to save the notes');
                  self
                      .showAlert(
                          'Error',
                          'An error occurred while trying to save the Notes.',
                          'alert-error');
                  }
              });

            },
            
            clearForm:function(){
            	console.log('ServicenotesFormView clearForm');
            // create a model to clear the data to reset form
              sendModel = new ServiceNotesModel({
            	  	ioid : this.ioid,
                    brand : this.brand          
                });
            	
              this.model=sendModel;
              this.render();
              this.delegateEvents(this.events);
              return this;
            	
            },
            showAlert : function ( title, text, klass ) {
              var $alert = $('.alert');
              $alert
                  .removeClass("alert-error alert-warning alert-success alert-info");
              $alert.addClass(klass);
              $alert.html('<strong>' + title + '</strong> ' + text);
              $alert.show();
            }

          });

      return ServicenotesFormView;
    });
