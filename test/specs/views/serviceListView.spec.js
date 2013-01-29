//require(['views/serviceListView'], function(ServiceListView) {
describe("ServiceListView", function() {
  var ServiceListView, mocks, mockData;
  mockData = {
      router : sinon.stub(),
      model : sinon.stub(),
      vssView : sinon.stub(),
      detailsView : sinon.stub(),
      detailsViewObject : sinon.stub()
  };
  //mock defined modules
  mocks = {
      'views/ServiceDetailVssSectionView' : mockData.vssView,
      'views/serviceDetailsView' : mockData.detailsView
  };
  // the mock for serviceDetailsView returns a mock object 
  mockData.detailsView.returns(mockData.detailsViewObject);
  
  // get module to test, with mock views
  ServiceListView = testr('views/serviceListView', mocks);
  
  describe("ServiceListView init empty", function() {
    console.log('ServiceListView test');
    var view;
    
    beforeEach(function () {
      setFixtures('<div id="list"></div>');
      view = new ServiceListView({
        router : mockData.router,
        model : mockData.model
      });
    });
    
    it("is a Backbone view", function() {
      expect(typeof(view)).toBe('object');
      expect(view instanceof Object).toBeTruthy();
      expect(view instanceof Backbone.View).toBeTruthy();
    });
  
    it("initialize takes router param", function() {
      console.log('Running ServiceListView.test2');
      expect(view.router).toEqual(mockData.router);
    });
    
    it("should create a table element with correct classes", function() {
      expect(view.el.nodeName).toEqual("TABLE");
      expect(view.$el).toHaveClass("table-bordered");
      // should have dataTables table 
      expect($('#list')).toContain('.dataTables_wrapper');
    });
  
    it("should have correct table headers", function() {
      expect($('#list th:eq(1)')).toHaveText('Fgrp');
      expect($('#list th:eq(2)')).toHaveText('Title');
      expect($('#list th:eq(3)')).toHaveText('Info type');
      expect($('#list th:eq(4)')).toHaveText('Operation');
      expect($('#list th:eq(5)')).toHaveText('Date');
    });
  });

  describe("ServiceListView render table with content", function() {
    console.log('ServiceListView test2');
    var view;
    
    beforeEach(function () {
      // need a real module to create test data
      var ServiceCollection = testr('collections/serviceCollection');
      mockData.list = new ServiceCollection();
      // first one without vssHeaders
      mockData.list.add({
        functionGroup : 'FG1',
        hasRequiredParts : 'true',
        ihId : '1',
        infoHeaderServiceURL : 'serviceURL1',
        infoType : 'A',
        infoTypeId : '11',
        operationId : 'OID1',
        operationNo : 'ONO1',
        title : 'TITLE1',
        date : '2012-12-11',
        singleVss : true,
        vssHeaders : []
      });
      // second with one vssHeader
      mockData.list.add({
        functionGroup : 'FG2',
        hasRequiredParts : 'true',
        ihId : '2',
        infoHeaderServiceURL : 'serviceURL2',
        infoType : 'B',
        infoTypeId : '12',
        operationId : 'OID2',
        operationNo : 'ONO2',
        title : 'TITLE2',
        type : 'TYPE2',
        date : '2012-12-12',
        singleVss : true,
        vssHeaders : [{
          date: '21/02/06',
          fileURL : 'fileURL21',
          ioid: 123,
          neededToolsUrl: 'toolsUrl21',
          vsses : [{
            vssCompany: 'VO',
            vssDescription: 'Desc21',
            vssNo: 'vss21'
          }]
        }]
      });
      // third with two vssHeaders
      mockData.vssHeaders3 = [{
        date: '31/03/06',
        fileURL : 'fileURL31',
        ioid: 123,
        neededToolsUrl: 'toolsUrl31',
        vsses : [{
          vssCompany: 'VO',
          vssDescription: 'Desc311',
          vssNo: 'vss311'
        }, 
        {
          vssCompany: 'VO',
          vssDescription: 'Desc312',
          vssNo: 'vss312'
        }]
      }, 
      {
        date: '31/03/06',
        fileURL : 'fileURL32',
        ioid: 124,
        neededToolsUrl: 'toolsUrl32',
        vsses : [{
          vssCompany: 'VO',
          vssDescription: 'Desc321',
          vssNo: 'vss321'
        },
        {
          vssCompany: 'VO',
          vssDescription: 'Desc322',
          vssNo: 'vss322'
        }]
      }];
      mockData.list.add({
        functionGroup : 'FG3',
        hasRequiredParts : 'true',
        ihId : '3',
        infoHeaderServiceURL : 'serviceURL3',
        infoType : 'C',
        infoTypeId : '13',
        operationId : 'OID3',
        operationNo : 'ONO3',
        title : 'TITLE3',
        type : 'TYPE3',
        date : '2012-12-13',
        singleVss : false,
        vssHeaders : mockData.vssHeaders3
      });
      
      mockData.router = {    
          searchResults : {},
          serviceDetailView : {},
          detailsView : {},
          subtabsModel : new Backbone.Model(),
          contentRegion : {}
      };
      mockData.router.contentRegion.show = function () {};
      mocks.routerContentRegionShow = sinon.stub(mockData.router.contentRegion, "show");

      setFixtures('<div id="list"></div>');
      
      view = new ServiceListView({
        router : mockData.router,
        model : mockData.list
      });
    });
    
    it("should render a table with 3 rows", function() {
      expect($('#list tbody tr').length).toEqual(3);
      expect($('#list tbody tr:eq(0)')).toContainHtml('ONO1');
      expect($('#list tbody tr:eq(1)')).toContainHtml('FG2');
      expect($('#list tbody tr:eq(2)')).toContainHtml('TITLE3');
    });
  
    it("should have checkbox only when zero or one vssHeaders", function() {
      expect($('#list tbody tr:eq(0) td')).toContainHtml('<input type="checkbox" name="serviceChk" value="chk">');
      expect($('#list tbody tr:eq(1) td')).toContainHtml('<input type="checkbox" name="serviceChk" value="chk">');
      expect($('#list tbody tr:eq(2) td')).not.toContainHtml('<input type="checkbox" name="serviceChk" value="chk">');
    });

    it("should call ServiceDetailView when click on zero or one vssHeaders row", function() {
      var clickSpy = spyOnEvent('#list tbody tr:eq(0)', 'click');
      $('#list tbody tr:eq(0)').click();
      expect('click').toHaveBeenTriggeredOn('#list tbody tr:eq(0)');
      expect(clickSpy).toHaveBeenTriggered();

      expect(mockData.detailsView).toHaveBeenCalledOnce();
      expect(mockData.detailsView).toHaveBeenCalledWith({
        model: [], 
        router: mockData.router, 
        desc: 'TITLE1'
      });
      expect(mocks.routerContentRegionShow).toHaveBeenCalledOnce();
      expect(mocks.routerContentRegionShow).toHaveBeenCalledWith(mockData.detailsViewObject);
    });
    
    it("should call ServiceDetailVssSectionView when click on multiple vssHeaders row", function() {
      var clickSpy = spyOnEvent('#list tbody tr:eq(2)', 'click');
      $('#list tbody tr:eq(2)').click();
      expect('click').toHaveBeenTriggeredOn('#list tbody tr:eq(2)');
      expect(clickSpy).toHaveBeenTriggered();

      expect(mockData.vssView).toHaveBeenCalledOnce();
      expect(mockData.vssView).toHaveBeenCalledWith({
        model: mockData.vssHeaders3, 
        router: mockData.router, 
        desc : 'TITLE3'
      });
    });

  });

});
//});
