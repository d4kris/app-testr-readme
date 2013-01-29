describe('ServiceCollection', function () {
  var ServiceCollection, ServiceModel;
  
  console.log('running ServiceCollectionTest');
  
  ServiceCollection = testr('collections/serviceCollection');
  ServiceModel = testr('models/serviceModel');
            
  xit('should be a list of ServiceModels', function () {
    var model, collection = new ServiceCollection();
    console.log('running ServiceCollectionTest.1');
    // add raw object to check what type it will be converted to
    collection.add({
      id : 2,
      brand : 'Renault'
    });
    model = collection.get(2);
//    expect(model instanceof ServiceModel).toBeTruthy();
    expect(model.get('brand')).toEqual('Renault');
  });

  xit('should have a url of: services/user.json/models', function () {
    var model, collection = new ServiceCollection();
    expect(collection.url).toContain('services/user.json/models');
    model = new ServiceModel({
      id : 1
    });
    collection.add(model);
    expect(model.url()).toContain('services/user.json/models/1');
  });

  xit('should parse model from response', function () {
    var resp, parsedAttributes, collection = new ServiceCollection();
    // create response
    resp = {
      model : 'Volvo'
    };
    parsedAttributes = collection.parse(resp);
    expect(parsedAttributes).toEqual('Volvo');
  });
});
