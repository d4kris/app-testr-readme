require(['models/truckModelModel'], function (TruckModel) {

  // There is something deeply magical about this file...
  // if its included everything works, even if it contains the same 
  // code as truckModelModelTest, regardless of name
  
  describe('TruckModel', function() {
    it('is an object', function () {
      var truckModel = new TruckModel();
    	console.log('test 4 of 5 run');
//      expect(typeof(truckModel)).toBe('object');
//      expect(truckModel instanceof Object).toBeTruthy();
//      expect(truckModel instanceof Backbone.Model).toBeTruthy();
    });
    it('should have defaults set', function () {
      var model = new TruckModel();
      console.log('running TruckModelTest.1');
      expect(model.get('id')).toEqual('');
      expect(model.get('brand')).toEqual('');
      expect(model.get('modelId')).toEqual('');
    });
  });
});
