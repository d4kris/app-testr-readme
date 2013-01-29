define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!templates/notesHeaderTemplate.html',      
        'text!templates/notesListTemplate.html',  
        'views/servicenotesFormView',
        'models/serviceNotesModel',
        'modal' ],
    function ( $, _, Backbone, NotesheaderTemplate,NotesListTemplate,
    						   ServicenotesFormView,ServiceNotesModel) {

      var ServiceNotesView = Backbone.View.extend({
    	      
    		
      		tagName : 'table',
    	    className : 'table table-bordered tabletextwrap tablepointer',
      
            initialize : function ( options ) {
              console.log('ServiceNotesView initialize');  
              this.ioid = options.ioid;
              this.brand = options.brand;
              
              this.template = _.template(NotesheaderTemplate);
              this.model.on('sync', this.fetchList, this);
              this.fetchList();
            },
            
            fetchList:function(){
            	var self=this;            
            	
                this.model.fetch({
                    success : function () {
                     console.log('ServiceNotesView fetchList success');  
                      self.render();
                     }, 
                    error : function () {
                      console.log('failed to fetch notes for service details identity');
                    }
                  });
            },

            render : function () {
              console.log('ServiceNotesView rendering');
              this.$el.empty();
              if(this.model.models.length > 0){
              $('#notesList').show();
              this.appendHeader();
              // loop thu notes list
              _.each(this.model.models, function ( notes ) {
            	notes.set("ioid",this.ioid);
            	notes.set("brand",this.brand);
                this.appendNewRow(notes);
              }, this);
              }else{
            	  $('#notesList').hide();
              }
            return this.el;
            },
           
          /* Add header row to table */
          appendHeader : function () {
            this.$el.append(_.template(NotesheaderTemplate));
          },

          /* Add a row to table */
          appendNewRow : function ( note ) {
            this.$el.append(new noteListView({
              model : note,             
              collection:this.model
              
            }).render());
          }
      });

      /**
       * Inner view displaying a single item in the list
       */
      var noteListView = Backbone.View.extend({

        tagName : 'tr',

        events : {
          'click #noteTxt' : 'clickRow',
          'click #date' : 'clickRow',
          'click #userid' : 'clickRow',
          'click #publicnote' : 'clickRow',
          'click #deletenote' : 'deleteNote'
        },

        initialize : function ( options ) {
           this.template = _.template(NotesListTemplate);
        },

        render : function ( eventName ) {
          console.log('list item rendering');
          this.$el.html(this.template(this.model.toJSON()));
          return this.el;
        },

        clickRow : function ( event ) {
          console.log('click row Notes dialog- ' + this.model.get('Notes'));
         
          newNotesView = new ServicenotesFormView({
              model : this.model,
              collection : this.collection
            });
          
          						
        },
        deleteNote : function ( event ) {
            console.log('ServiceNotesView delete');
            var self = this;
            
            // delete the model after server responds
            self.model
                .destroy({wait:true});  
            self.model.collection.trigger('sync');
          }

      });

      return ServiceNotesView;
    });
