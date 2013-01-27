describe('TruckModelModel', function () {
	var TruckModelModel = testr('models/truckModelModel');

	console.log('running TruckModelModelTest...');

	it('should have defaults set', function () {
	  var model = new TruckModelModel();
	  console.log('running TruckModelModelTest.1');
	  expect(model.get('id')).toEqual('');
	  expect(model.get('brand')).toEqual('');
	  expect(model.get('modelId')).toEqual('');
	});

	it('should parse modelId to id', function () {
	  var resp, parsedAttributes, model = new TruckModelModel();
	  // create response
	  resp = {
		brand : 'Volvo',
		modelId : '123'
	  };
	  parsedAttributes = model.parse(resp);
	  expect(parsedAttributes.id).toEqual('123');
	  expect(parsedAttributes.brand).toEqual('Volvo');
	  expect(parsedAttributes.modelId).toEqual('123');
	});
});
