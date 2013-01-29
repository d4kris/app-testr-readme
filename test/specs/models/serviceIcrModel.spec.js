describe('ServiceIcrModel', function () {
  var Model = testr('models/serviceIcrModel');

  console.log('running ServiceIcrModel test...');

  it('should have defaults set', function () {
    var model = new Model();
    console.log('running ServiceIcrModelTest.1');
    expect(model.get('chassisSeries')).toEqual('');
    expect(model.get('chassisNo')).toEqual('');
    expect(model.get('brand')).toEqual('');
    expect(model.get('vin')).toEqual('');
    expect(model.get('fgrp')).toEqual('');
    expect(model.get('ioId')).toEqual('');
    expect(model.get('infoTypeCompleteId')).toEqual('');
    expect(model.get('title')).toEqual('');
    expect(model.get('additionalSearchType')).toEqual('');
    expect(model.get('additionalSearchValue')).toEqual('');
    expect(model.get('vssDesc')).toEqual('');
    expect(model.get('problemType')).toEqual('');
    expect(model.get('vehicleStatus')).toEqual('');
    expect(model.get('modelId')).toEqual('');
    expect(model.get('problemDesc')).toEqual('');
  });

  it('should not define id on new', function () {
    var model = new Model();
    console.log('running ModelTest.1');
    expect(model.get('id')).toBeUndefined();
    expect(model.isNew()).toBeTruthy();
  });

  it('should set some values from constructor options', function () {
    var model = new Model({
      chassisSeries : "Test-chassisSeries", 
      chassisNo : "Test-chassisNo", 
      brand : "Test-brand", 
      vin : "Test-vin", 
      fgrp : "Test-fgrp", 
      ioId : "Test-ioId", 
      infoTypeCompleteId : "Test-infoTypeCompleteId", 
      title : "Test-desc",
      vssDesc : "Test-vssDesc",
      additionalSearchType : "Test-additionalSearchType", 
      additionalSearchValue : "Test-additionalSearchValue"
    });
    expect(model.get('chassisSeries')).toEqual('Test-chassisSeries');
    expect(model.get('chassisNo')).toEqual('Test-chassisNo');
    expect(model.get('brand')).toEqual('Test-brand');
    expect(model.get('vin')).toEqual('Test-vin');
    expect(model.get('fgrp')).toEqual('Test-fgrp');
    expect(model.get('ioId')).toEqual('Test-ioId');
    expect(model.get('infoTypeCompleteId')).toEqual('Test-infoTypeCompleteId');
    expect(model.get('title')).toEqual('Test-desc');
    expect(model.get('additionalSearchType')).toEqual('Test-additionalSearchType');
    expect(model.get('additionalSearchValue')).toEqual('Test-additionalSearchValue');
    expect(model.get('vssDesc')).toEqual('Test-vssDesc');
    expect(model.get('problemType')).toEqual('');
    expect(model.get('vehicleStatus')).toEqual('');
    expect(model.get('modelId')).toEqual('');
    expect(model.get('problemDesc')).toEqual('');
  });
});