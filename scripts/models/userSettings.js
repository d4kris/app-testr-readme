define([
  "jquery",
  "backbone"
], function ($, Backbone) {
  
  var UserSettings = Backbone.Model.extend({
    
    defaults : {
      userId : "",
      startTab : "",
      settingsGeneral : {},
      settingsICR     : {},
      settingsMyList  : {},
      settingsParts   : {},
      settingsService : {},
      settingsStandardParts : {},
      settingsStandardTimes : {}
    }, 
    
    url : "../services/user.json/settings"

  }); 
  
  return UserSettings; 
  
});