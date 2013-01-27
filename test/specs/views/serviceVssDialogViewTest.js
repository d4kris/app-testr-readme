describe("ServiceVssDialogView", function() {

  var ServiceDetailVssSectionView, mocks;
  // mock defined modules
  mocks = {
      'views/serviceDetailsView' : sinon.stub(),
      router : sinon.stub(),
      model : sinon.stub()
  };
  
  // get module to test, with mock views
  ServiceDetailVssSectionView = testr('views/ServiceDetailVssSectionView', mocks);

  describe("ServiceVssDialogView init empty", function() {

    var view, mockData = {
        vssHeaders : [],
        desc : 'Description'
    };
    
    beforeEach(function () {
      setFixtures('<div id="appModal"><div class="modal-body"></div></div>');
      view = new ServiceVssDialogView({
        router : mocks.router,
        model : mockData.vssHeaders,
        desc : mockData.desc
      });
      $('#appModal .modal-body').html(view.el);
    });
    
    it("is a Backbone view", function() {
      expect(typeof(view)).toBe('object');
      expect(view instanceof Object).toBeTruthy();
      expect(view instanceof Backbone.View).toBeTruthy();
    });
  
    it("initialize takes router, model and desc params", function() {
      expect(view.router).toEqual(mocks.router);
      expect(view.model).toEqual(mockData.vssHeaders);
      expect(view.desc).toEqual(mockData.desc);
    });
    
    it("should create a table element with correct classes", function() {
      expect(view.el.nodeName).toEqual("TABLE");
      expect(view.$el).toHaveClass("table-bordered");
    });
  
    it("should have correct table headers", function() {
      expect($('#appModal th:eq(1)')).toHaveText('Description');
      expect($('.modal-body th:eq(2)')).toHaveText('Date');
    });
  });

  describe("ServiceListView render table with content", function() {

    var view, mockData = {};
    
    beforeEach(function () {
      
      mockData.vssHeaders = [{
        date: '21/02/06',
        fileURL : 'fileURL21',
        ioid: 123,
        neededToolsUrl: 'toolsUrl21',
        vsses : {
          vssCompany: 'VO',
          vssDescription: 'Desc21',
          vssNo: 'vss21'
        }//TODO not an array when 1??
      }, 
      {
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
        date: '30/04/06',
        fileURL : 'fileURL32',
        ioid: 124,
        neededToolsUrl: 'toolsUrl32',
        vsses : {
          vssCompany: 'VO',
          vssDescription: 'Desc321',
          vssNo: 'vss321'
        }// no array?
      }, 
      {
        date: '30/05/06',
        fileURL : 'fileURL41',
        ioid: 125,
        neededToolsUrl: 'toolsUrl31',
        vsses : []
      }];
      
      mocks.router = {    
          searchResults : {},
          serviceDetailView : {},
          detailsView : {},
          subtabsModel : new Backbone.Model(),
          contentRegion : new Backbone.Marionette.Region({el:'#content'})
      };
      
      sinon.stub(mocks.router.contentRegion, "show");

      setFixtures('<div id="appModal"><div class="modal-body"></div></div>');
      view = new ServiceVssDialogView({
        router : mocks.router,
        model : mockData.vssHeaders,
        desc : 'DESC2'
      });
      $('#appModal .modal-body').html(view.el);
    });
    
    it("should render a table with 4 rows", function() {
      expect($('#appModal tbody tr').length).toEqual(4);
      expect($('#appModal tbody tr:eq(0)')).toContainHtml('21/02/06');
      expect($('#appModal tbody tr:eq(1)')).toContainHtml('31/03/06');
      expect($('#appModal tbody tr:eq(2)')).toContainHtml('30/04/06');
      expect($('#appModal tbody tr:eq(3)')).toContainHtml('30/05/06');
    });
  
    it("should have list of vssHeaders", function() {
      expect($('#appModal tbody tr:eq(0) td:eq(1)')).toContainHtml('Desc21');
      expect($('#appModal tbody tr:eq(1) td:eq(1)')).toContainHtml('Desc311');
      expect($('#appModal tbody tr:eq(1) td:eq(1)')).toContainHtml('Desc312');
      expect($('#appModal tbody tr:eq(2) td:eq(1)')).toContainHtml('Desc321');
      expect($('#appModal tbody tr:eq(3) td:eq(1)')).toContainHtml('<li></li>');
    });

    xit("should call ServiceDetailView when click on zero or one vssHeaders row", function() {
      var clickSpy = spyOnEvent('#appModal tbody tr:eq(0)', 'click');
      $('#appModal tbody tr:eq(0)').click();
      expect('click').toHaveBeenTriggeredOn('#appModal tbody tr:eq(0)');
      expect(clickSpy).toHaveBeenTriggered();

      expect(mocks.serviceDetailsView).toHaveBeenCalledOnce();
      expect(mocks.serviceDetailsView).toHaveBeenCalledWith({model: [], router: mocks.router, desc: 'TITLE1'});
    });
    
    xit("should call ServiceDetailVssSectionView when click on multiple vssHeaders row", function() {
      var clickSpy = spyOnEvent('#appModal tbody tr:eq(2)', 'click');
      $('#appModal tbody tr:eq(2)').click();
      expect('click').toHaveBeenTriggeredOn('#appModal tbody tr:eq(2)');
      expect(clickSpy).toHaveBeenTriggered();

      expect(mocks.serviceDetailsVssView).toHaveBeenCalledOnce();
      expect(mocks.serviceDetailsVssView).toHaveBeenCalledWith({
        model: mockData.vssHeaders3, 
        router: mocks.router, 
        desc: 'TITLE3'});
    });

  });

});
});
