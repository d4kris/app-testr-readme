define([ 
  'jquery', 
  'underscore', 
  'backbone' 
], function ( $, _, Backbone ) {

  var SearchFormModel = Backbone.Model.extend({
    defaults : {
      'chassisSeries' : '',
      'chassisNo' : '',
      'vin' : '',
      'model' : '',
      'infoType' : '-1_*',
      'functionGroup' : '',
      'additionalValue' : '',
      'additionalSearch' : ''
    },

    // check whether we need to display a dialog to choose chassis series
    showChassisSeriesDialog : function () {
      return (this.get('chassisSeries') === '' && this.get('chassisNo') !== '');
    }
  });

  return SearchFormModel;
});
