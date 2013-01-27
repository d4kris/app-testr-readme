require([
  // Load our app module and pass it to our definition function
  'app' 
//  ,'utils/localStore' // uncomment to use mock data locally

// Some plugins have to be loaded in order due to their non AMD compliance
  // Because these scripts are not 'modules' they do not pass any values to the
  // definition function below. Fail in IE8
//  'order!scripts/vendor/jquery.min',
//  'order!scripts/vendor/lodash.min',
//  'order!scripts/vendor/backbone-min'
], function( ImpactApp ) {

  // handle no console on IE
  if (!this.console) {
    alert('fix IE');
    console = {
      log : function() {}
    };
  }

  ImpactApp.initialize();

});
