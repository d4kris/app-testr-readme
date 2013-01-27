define([ 
 'jquery', 
 'underscore', 
 'backbone', 
 'marionette',
 'dataTables',
 'routes/router',
 'models/userSettings'
], function($, _, Backbone, Marionette, DataTables, Router, UserSettings) {

  /* Handle external templates using require.text */
  Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
    // Marionette expects "templateId" to be the ID of a DOM element.
    // But with RequireJS, templateId is actually the full text of the template.
    var template = templateId;

    // Make sure we have a template before trying to compile it
    if (!template || template.length === 0){
        var msg = "Could not find template: '" + templateId + "'";
        var err = new Error(msg);
        err.name = "NoTemplateError";
        throw err;
    }

    return template;
  };
  
  /* override DataTables sort column class */
  $.extend($.fn.dataTableExt.oStdClasses, {
    'sSortColumn' : '' // no class for sorted column
  });

	var initialize = function() {
		// get user settings
	  var settings = new UserSettings();
	  settings.fetch({
	    success : function () {
	      console.log("Fetched user settings");
	    },
	    error : function () {
	      alert("Failed to fetch user settings");
	    }
	  });
	  

    	  // Pass in our Router module and call it's initialize function
    new Router({
      "userSettings" : settings
    });
    Backbone.history.start({
      pushState : false,
      root : "/impact/application/app/"
    });
	};

	return {
		initialize : initialize
	};
});