define([ 'utils/enableRules' ], function ( enableRules ) {
  // fake disable rule list until impl
  var disableRules = [ function () {return false;} ];
  
  function enableSearch() {
    console.log('enableSearch');
    $('#search').prop('disabled', false);
  }
  
  function disableSearch () {
    console.log('disableSearch');
    $('#search').prop('disabled', true);
  }
  // check all rules in a list of rules
  function checkRules () {
    var disable = false, enable = false;
    // check disable rules first, one is enough to disable
    disable = _.any(disableRules, function ( rule, key ) {
      var ok = rule();
      console.log('check disable rule ' + key + ': '+ok);
      return ok;
    });
    if (disable) {
      disableSearch();
    } else {
      // no disable rule active, check enable rules
      enable = _.any(enableRules, function ( rule, key ) {
        var ok = rule();
        console.log('check enable rule ' + key + ': '+ok);
        return ok;
      });
      if (enable) {
        // enable
        enableSearch();
      } else {
        disableSearch();
      }
    }
  }

  var SystemSettings = {
    /**
     * check all rules in enableRules file and enable/disable accordingly
     */
    checkAndEnable : function () {
      checkRules();
    }
  };

  return SystemSettings;
});