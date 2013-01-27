define([
  "jquery",
  "backbone"
], function ($, Backbone) {
  
  var UserSettings = Backbone.Model.extend({
    
    defaults : {
      userId : "",
      startTab : "",
      settingsGeneral : {},
      settingsParts   : {},
      settingsService : {}
    }, 
    
    url : "../services/user.json/settings"

  }); 
  
  return UserSettings; 
  
});