define([
    'jquery',
    'underscore',
    'backbone',
    'models/serviceDetailsModel',
    'views/ServiceIcrView',
    'text!templates/serviceDetailsTemplate.html'
], function ( $, _, Backbone, ServiceDetailsModel, ServiceIcrView,
    DetailsTemplate ) {
  
  /**
   * Display a detailed view of a service
   */
  var ServiceDetailsView = Backbone.View.extend({

    id : 'content',
    template : DetailsTemplate,

    events : {
      'click #icr' : 'icr',
      'click #notes' : 'notes',
      'click #arrow' : 'arrowClick'
    },
    
    initialize : function ( options ) {
      console.log('ServiceDetailsView initialize, fileURL: ' + this.model.fileURL);
      this.router = options.router;
      this.model.desc = options.desc;
      this.template = _.template(DetailsTemplate);
      this.showLoading('#content');
    },

    render : function () {
      console.log('ServiceDetailsView rendering' + this.model);
      this.$el.html(this.template(this.model));
      return this.$el;
    },

    arrowClick : function ( event ) {
      console.log('click arrowClick in details');
      $arrowIcon = $('#arrow a i');
      
      if ($arrowIcon.is('.icon-circle-arrow-up')) {
        console.log('icon-circle-arrow-up hide');     
        $arrowIcon.removeClass('icon-circle-arrow-up');
        $arrowIcon.addClass('icon-circle-arrow-down');

      } else {
    	  $arrowIcon.removeClass('icon-circle-arrow-down');
    	  $arrowIcon.addClass('icon-circle-arrow-up');
      }
    },
    
    icr : function ( event ) {
      var view, $icrModal;
      console.log('click icr in details :');
      // open new window with ServiceIcrView dialog
      view = new ServiceIcrView({
        model : this.model,
        router : this.router
      });

      $icrModal = $('#icrModal');
      $icrModal.append(view.el);
      $icrModal.modal({ backdrop : 'static' });
      // hide iframe div since it is displayed on top of modal in ie...
      $('#one').addClass('hideIframe');      
      $icrModal.on('hide', function ( e ) {          
          if(e.target===icrModal){
          $('#one').toggleClass('hideIframe');
          view.remove();}
        });
    },

    notes : function ( event ) {
      console.log('click notes in details :');

      $('#icrModal .modal-body').html(view.el);
      $('#icrModal').modal({ backdrop : 'static' });
    }
  });

  return ServiceDetailsView;
});