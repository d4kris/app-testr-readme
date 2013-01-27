require.config({
  // app entry point
  deps: ['main'],
  baseUrl : '../app/scripts/',

  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim : {
    'underscore' : {
      exports : '_'
    },
    'backbone' : {
      deps : [ 'underscore', 'jquery' ],
      exports : 'Backbone'
    },
    'dataTables' : {
      deps : [ 'jquery' ],
      exports : 'dataTables'
    }
  },

  //Define paths to our dependencies
  paths : {
    'jquery'     : 'vendor/jquery.min',
    'jquery-ui'  : 'vendor/jquery-ui',
    'underscore' : 'vendor/lodash.min',
    'backbone'   : 'vendor/backbone-min',
    'text'       : 'vendor/require/text',
    'typeahead'  : 'vendor/bootstrap/js/bootstrap-typeahead',
    'transition' : 'vendor/bootstrap/js/bootstrap-transition',
    'modal'      : 'vendor/bootstrap/js/bootstrap-modal',
    'accordion'  : 'vendor/bootstrap/js/bootstrap-collapse',
    'dataTables' : 'vendor/datatables/js/jquery.dataTables.min',//.min
    'marionette' : 'vendor/marionette/backbone.marionette.min' //.min
  }
});
