define([ 'jquery', 'underscore' ], function ( $, _ ) {

  return {
    /**
     * Check if ANY checks in the specified list return true
     */
    compoundAny : function ( checks ) {
      var checkOk = _.any(checks, function ( check ) {
        // call the check function
        return check();
      });
      // all of the checks returned true
      return checkOk;
    },

    /**
     * Check if ALL checks in the specified list return true
     */
    compoundAll : function ( checks ) {
      var checkOk = _.all(checks, function ( check ) {
        // call the check function
        return check();
      });
      return checkOk;
    },

    /* generic checks, building blocks for reusable elems */

    /**
     * Check if the element specified by options.id is not present
     */
    isNull : function ( options ) {
      return !(document.getElementById('#' + options.id));
    },

    /**
     * Check if the element specified by options.id is not present
     */
    notEmpty : function ( options ) {
      return $('#' + options.id).val() != '';
    },

    /**
     * Check if the element specified by options.id is selected (active)
     */
    tabActive : function ( options ) {
      return $('#' + options.id).hasClass('active');
    },

    /**
     * Check if the element specified by options.id is not present
     */
    isClosed : function ( options ) {
      var elem = $('#' + options.id);
      return elem.hasClass('closed') || elem.find('a').hasClass('collapsed');
    },

    /**
     * Check if the value specified by options.id is not equal to
     * options.requiredValue
     */
    valueNotEqualToRequired : function ( options ) {
      return $('#' + options.id).val() != options.requiredValue;
    },

    /**
     * Check if the value specified by options.id has a length of
     * options.requiredValue
     */
    valueHasLength : function ( options ) {
      return $('#' + options.id).val().length == options.requiredValue;
    }
  };
});