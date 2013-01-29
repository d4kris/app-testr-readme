describe("ServiceIcrView", function() {
  var ServiceIcrView, mockData, 
    ServiceCollection, SearchFormModel, UserSettings;
  
  ServiceCollection = testr('collections/serviceCollection');
  SearchFormModel = testr('models/searchFormModel');
  
  mockData = {
      model : {
        date: "18/06/09",
        desc: "Core plug, replace",
        fileURL: "service/file/url",
        ioid: "124367595",
        notesURL: "service/notes/url",
        toolsNeededURL: "services/tools",
        vsses: Array[8]
      }
  };
  
  // TODO use https://github.com/velesin/jasmine-jquery#json-fixtures
  mockData.userSettings = {
    "email": "kris@test.com",
    "firstName": "Kris",
    "lastName": "Test",
    "loggedIn": "2013-01-29T08:44:34.625+01:00",
    "partnerId": "XI000001",
    "settingsComponents": {
      "additionalSearches": {
        "description": "Serial number",
        "id": "SERIALNO_SEARCH"
      },
      "showInfo": "true",
      "showAdditionalVehicleData": "true"
    },
    "settingsGeneral": {
      "brands": [
        "B",
        "C",
        "D",
        "E",
        "F"
      ],
      "chassisRestriction": "false",
      "dataLanguage1st": "en_GB",
      "fgrpImage": "1",
      "guiBrand": "Common",
      "imageZoomLevel": "1",
      "notesAdminUser": "false",
      "openSearch": "false",
      "serviceCategoryFgrp": "true",
      "serviceCategoryVMRS": "false",
      "showAbbreviations": "true",
      "showBookmarks": "true",
      "showLog": "true",
      "showMySettings": "true",
      "showNavigator": "true",
      "showNotes": "true",
      "showPartNumberNotes": "true",
      "showToolsAdmin": "true",
      "showUserAdmin": "true",
      "startTab": "components",
      "webServerlocationKey": "DEFAULT"
    },
    "settingsICR": {
      "problemTypes": [
        {
          "description": "Illustration/Hotspot",
          "id": "RES.icr.illustrationHotspot"
        },
        {
          "description": "Part Description/Title Misleading",
          "id": "RES.icr.partDescriptionTitle"
        },
        {
          "description": "Incorrect/Missing Information",
          "id": "RES.icr.incorrectMissing"
        },
        {
          "description": "Application Related",
          "id": "RES.icr.applicationRelated"
        },
        {
          "description": "Parts request",
          "id": "RES.icr.interpretationInquiry"
        },
        {
          "description": "Other",
          "id": "RES.icr.other"
        }
      ],
      "vehicleStatuses": [
        {
          "description": "General Question / Feedback",
          "id": "General Question / Feedback"
        },
        {
          "description": "Scheduled visit",
          "id": "Scheduled visit"
        },
        {
          "description": "Unscheduled visit",
          "id": "Unscheduled visit"
        },
        {
          "description": "Stopped (break down)",
          "id": "Stopped (Breakdown)"
        }
      ]
    },
    "settingsMyList": {
      "showInfo": "false",
      "defaultInformation": "currentlist",
      "showGds": "false",
      "showPartsCompass": "false",
      "showPartsOnline": "false"
    },
    "settingsParts": {
      "additionalSearches": [
        {
          "description": "Part No.",
          "id": "partNo"
        },
        {
          "description": "Part description",
          "id": "PART_DESCRIPTION_SEARCH"
        },
        {
          "description": "Supersessions",
          "id": "SUPERCESSION_SEARCH"
        },
        {
          "description": "Identity",
          "id": "IDENTITY_SEARCH"
        },
        {
          "description": "Title",
          "id": "TITLE_SEARCH"
        },
        {
          "description": "Chassis via Identity",
          "id": "BITMAP_SEARCH"
        },
        {
          "description": "TPI Number",
          "id": "TPI_NUMBER_SEARCH"
        },
        {
          "description": "Vendor to OEM Parts",
          "id": "VENDOR_TO_TEST_SEARCH"
        },
        {
          "description": "OEM to Vendor Parts",
          "id": "TEST_TO_VENDOR_SEARCH"
        },
        {
          "description": "Vendor Web Links",
          "id": "VENDOR_INFO_SEARCH"
        }
      ],
      "showInfo": "true",
      "infoTypes": [
        {
          "description": "Parts Catalogue",
          "id": "12_33"
        },
        {
          "description": "Chemicals",
          "id": "20_98"
        },
        {
          "description": "Exchange",
          "id": "12_32"
        },
        {
          "description": "TPI",
          "id": "9_65"
        }
      ],
      "showImageOverview": "false",
      "showPartNo": "true",
      "showRequiredParts": "true",
      "vendorVmrs": "true"
    },
    "settingsService": {
      "additionalSearches": [
        {
          "description": "Titles",
          "id": "ALL_HEADERS_SEARCH"
        },
        {
          "description": "Tool No.",
          "id": "TOOL_NUMBER_SEARCH"
        },
        {
          "description": "Tool description",
          "id": "TOOL_DESCRIPTION_SEARCH"
        },
        {
          "description": "Operation No.",
          "id": "OPERAION_NUMBER_SEARCH"
        },
        {
          "description": "Identity",
          "id": "IDENTITY_SEARCH"
        },
        {
          "description": "Keyword",
          "id": "KEYWORD_SEARCH"
        },
        {
          "description": "Ongoing/Finalized",
          "id": "ONGOING_FINALIZED_SEARCH"
        }
      ],
      "showInfo": "false",
      "defaultInfoType": "ALLSERVICEINFO",
      "infoTypes": [
        {
          "description": "All Service Information",
          "id": "-1_*"
        },
        {
          "description": "Bulletins/Information",
          "id": "9_*"
        },
        {
          "description": "Description, Design and function",
          "id": "2_*"
        },
        {
          "description": "Diagnostics",
          "id": "6_*"
        },
        {
          "description": "Forms",
          "id": "11_*"
        },
        {
          "description": "General information",
          "id": "1_*"
        },
        {
          "description": "Repair",
          "id": "7_*"
        },
        {
          "description": "Schematic diagrams",
          "id": "3_*"
        },
        {
          "description": "Service and maintenance",
          "id": "8_*"
        },
        {
          "description": "Specifications",
          "id": "4_*"
        }
      ]
    },
    "settingsStandardParts": {
      "showInfo": "true"
    },
    "settingsStandardTimes": {
      "additionalSearches": [
        {
          "description": "Operation No.",
          "id": "OPERAION_NUMBER_SEARCH"
        },
        {
          "description": "Operation title",
          "id": "OPERATION_HEADER_SEARCH"
        },
        {
          "description": "New or updated information",
          "id": "OPERATION_DATE_SEARCH"
        },
        {
          "description": "Main part No.",
          "id": "OPERATION_MAIN_PART_SEARCH"
        }
      ],
      "showInfo": "false",
      "partnerVstFormat": "false",
      "partnerVstLevel": "true"
    },
    "userId": "u123"
  };

  mockData.router = { 
    searchResults : {},
    userSettings : new Backbone.Model()
  };
  sinon.stub(mockData.router.userSettings, 'toJSON').returns(mockData.userSettings);
  
  // get module to test, with mock views
  ServiceIcrView = testr('views/ServiceIcrView');
  
  describe("ServiceIcrView init, render", function() {
    var view;
    // TODO use https://github.com/velesin/jasmine-jquery#json-fixtures
    mockData.serviceList1 = new ServiceCollection();
    mockData.serviceList1.add({
      date: "18/06/09",
      functionGroup: "2129",
      hasRequiredParts: "false",
      ihId: "2",
      infoHeaderSerivceURL: "services/infoheader",
      infoHeaderServiceURL: "",
      infoType: "Repair",
      infoTypeId: "7",
      operationId: "2129-03-03-02",
      operationNo: "21231-3",
      singleVss: true,
      title: "Core plug, replace",
      vssHeaders: {}
    });
    mockData.serviceList1.add({
      date: "21/02/06",
      functionGroup: "2125",
      hasRequiredParts: "false",
      ihId: "3",
      infoHeaderSerivceURL: "services/infoheader",
      infoHeaderServiceURL: "",
      infoType: "Repair",
      infoTypeId: "7",
      operationId: "2125-06-03-02",
      operationNo: "21235-3",
      singleVss: true,
      title: "Flywheel housing run-out, check. Clutch removed",
      vssHeaders: {}
    });
    mockData.serviceList1.vehicle = {
      "brand": "B",
      "chassisNo": "595959",
      "chassisSeries": "A",
      "model": "ZZ16",
      "productClass": "04"
    };
    mockData.serviceList1.requestParams = [
      {
        "name": "additionalSearchValue",
        "value": "Blah1"
      },
      {
        "name": "chassisSeries",
        "value": "A"
      },
      {
        "name": "additionalSearchType",
        "value": "Title"
      },
      {
        "name": "chassisNo",
        "value": "595959"
      },
      {
        "name": "fgrp",
        "value": "99"
      }
    ];
    mockData.serviceList1.usedFgrp = "9";
    mockData.serviceList1.searchForm = new SearchFormModel({
      additionalSearch: "Title",
      additionalValue: "Blah1",
      chassisNo: "595959",
      chassisSeries: "A",
      functionGroup: "99",
      infoType: "-1_*",
      model: "",
      vin: ""
    });
    
    console.log('ServiceIcrView test');
    beforeEach(function () {
      mockData.router.searchResults.serviceList = mockData.serviceList1;
      view = new ServiceIcrView({
        router : mockData.router,
        model : mockData.model,
        desc : 'DESC'
      });
    });
    
    it("is a Backbone view", function() {
      expect(typeof(view)).toBe('object');
      expect(view instanceof Object).toBeTruthy();
      expect(view instanceof Backbone.View).toBeTruthy();
    });
  
    it("initialize takes router and desc param", function() {
      expect(view.router).toEqual(mockData.router);
      expect(view.desc).toEqual('DESC');
    });

    it("should populate a form model, ServiceIcrModel", function () {
      //expect(view.sendModel.get('modelId')).toEqual(mockData.serviceList1.searchForm.get('model'));
      expect(view.sendModel.get('modelId')).toBeUndefined();
      expect(view.sendModel.get('brand')).toEqual(mockData.serviceList1.vehicle.brand);
      expect(view.sendModel.get('chassisSeries')).toEqual(mockData.serviceList1.searchForm.get('chassisSeries'));
      expect(view.sendModel.get('chassisNo')).toEqual(mockData.serviceList1.searchForm.get('chassisNo'));
      //expect(view.sendModel.get('vin')).toEqual(mockData.serviceList1.searchForm.get('vin'));
      expect(view.sendModel.get('vin')).toBeUndefined();
      //expect(view.sendModel.get('fgrp')).toEqual(mockData.serviceList1.usedFgrp);
      expect(view.sendModel.get('fgrp')).toEqual(mockData.serviceList1.searchForm.get('functionGroup'));
      expect(view.sendModel.get('ioId')).toEqual(mockData.model.ioId);
      expect(view.sendModel.get('infoTypeCompleteId')).toEqual(mockData.serviceList1.searchForm.get('infoTypeCompleteId'));
      expect(view.sendModel.get('title')).toEqual(mockData.model.desc);
      expect(view.sendModel.get('additionalSearchType')).toEqual(mockData.serviceList1.searchForm.get('additionalSearch'));
      expect(view.sendModel.get('additionalSearchValue')).toEqual(mockData.serviceList1.searchForm.get('additionalValue'));
      expect(view.sendModel.get('vssDesc')).toEqual(mockData.model.desc);
    });

    it("should have correct info from model", function() {
      // Name
      expect(view.$el.find('#collapseIcr label:eq(0)').next()).toContainHtml('Kris Test');
      // Partner id
      expect(view.$el.find('#collapseIcr label:eq(1)').next()).toContainHtml('1');
      // Data language
      expect(view.$el.find('#collapseIcr label:eq(2)').next()).toContainHtml('en_GB');
      // Model
      expect(view.$el.find('#collapseIcr label:eq(3)').next()).toContainHtml('A-595959');
      // FGR, show usedFgrp
      expect(view.$el.find('#collapseIcr label:eq(4)').next()).toContainHtml('99');
      // Identity
      expect(view.$el.find('#collapseIcr label:eq(5)').next()).toContainHtml('124367595');
      // Title
      expect(view.$el.find('#collapseIcr label:eq(6)').next()).toContainHtml('Core plug, replace');
    });
  });

  describe("ServiceIcrView template and send other model", function () {
    console.log('ServiceIcrView test2');
    // TODO use https://github.com/velesin/jasmine-jquery#json-fixtures
    mockData.serviceList2 = new ServiceCollection();
    mockData.serviceList2.add({
      date: "18/06/09",
      functionGroup: "2129",
      hasRequiredParts: "false",
      ihId: "6",
      infoHeaderSerivceURL: "services/infoheader",
      infoHeaderServiceURL: "",
      infoType: "Repair",
      infoTypeId: "7",
      operationId: "2129-03-03-02",
      operationNo: "21231-3",
      singleVss: true,
      title: "Core plug, replace",
      vssHeaders: {}
    });
    mockData.serviceList2.add({
      date: "21/02/06",
      functionGroup: "2125",
      hasRequiredParts: "false",
      ihId: "8",
      infoHeaderSerivceURL: "services/infoheader",
      infoHeaderServiceURL: "",
      infoType: "Repair",
      infoTypeId: "7",
      operationId: "2125-06-03-02",
      operationNo: "2-3",
      singleVss: true,
      title: "Flywheel housing run-out, check. Clutch removed",
      vssHeaders: {}
    });
    mockData.serviceList2.vehicle = {
      "brand": "E",
      "chassisNo": "",
      "chassisSeries": "",
      "model": "ZZ12",
      "productClass": "04"
    };
    mockData.serviceList2.requestParams = [
      {
        "name": "modelId",
        "value": "ZZ12"
      },
      {
        "name": "infoTypeCompleteId",
        "value": "78"
      },
      {
        "name": "fgrp",
        "value": "212"
      }, 
      {
        "name": "vin",
        "value": "123456"
      }
    ];
    mockData.serviceList2.usedFgrp = "21";
    mockData.serviceList2.searchForm = new SearchFormModel({
      additionalSearch: "",
      additionalValue: "",
      chassisNo: "",
      chassisSeries: "",
      functionGroup: "212",
      infoType: "78",
      model: "ZZ12",
      vin: "123456"
    });
    
    beforeEach(function () {
      mockData.router.searchResults.serviceList = mockData.serviceList2;
      view = new ServiceIcrView({
        router : mockData.router,
        model : mockData.model,
        desc : 'DESC'
      });
    });
    
    it("initialize assembles a model for view data", function() {
      expect(view.router).toEqual(mockData.router);
      expect(view.desc).toEqual('DESC');
    });
    
    it("should populate a form model, ServiceIcrModel", function () {
      expect(view.sendModel.get('modelId')).toEqual(mockData.serviceList2.searchForm.get('model'));
      expect(view.sendModel.get('brand')).toEqual(mockData.serviceList2.vehicle.brand);
//      expect(view.sendModel.get('chassisSeries')).toEqual(mockData.serviceList2.searchForm.get('chassisSeries'));
      expect(view.sendModel.get('chassisSeries')).toBeUndefined();
//      expect(view.sendModel.get('chassisNo')).toEqual(mockData.serviceList2.searchForm.get('chassisNo'));
      expect(view.sendModel.get('chassisNo')).toBeUndefined();
      expect(view.sendModel.get('vin')).toEqual(mockData.serviceList2.searchForm.get('vin'));
//      expect(view.sendModel.get('vin')).toBeUndefined();
//      expect(view.sendModel.get('fgrp')).toEqual(mockData.serviceList2.usedFgrp);
      expect(view.sendModel.get('fgrp')).toEqual(mockData.serviceList2.searchForm.get('functionGroup'));
      expect(view.sendModel.get('ioId')).toEqual(mockData.model.ioId);
      expect(view.sendModel.get('infoTypeCompleteId')).toEqual(mockData.serviceList2.searchForm.get('infoType'));
      expect(view.sendModel.get('title')).toEqual(mockData.model.desc);
//      expect(view.sendModel.get('additionalSearchType')).toEqual(mockData.serviceList2.searchForm.get('additionalSearch'));
      expect(view.sendModel.get('additionalSearchType')).toBeUndefined();
//      expect(view.sendModel.get('additionalSearchValue')).toEqual(mockData.serviceList2.searchForm.get('additionalValue'));
      expect(view.sendModel.get('additionalSearchValue')).toBeUndefined();
      expect(view.sendModel.get('vssDesc')).toEqual(mockData.model.desc);
    });
  });
  
  xdescribe("ServiceIcrView handle events", function() {
    console.log('ServiceIcrView test3');
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
          contentRegion : new Backbone.Marionette.Region({el:'#content'})
      };
      sinon.stub(mockData.router.contentRegion, "show");

      view = new ServiceIcrView({
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

      expect(mocks['views/serviceDetailsView']).toHaveBeenCalledOnce();
      expect(mocks['views/serviceDetailsView']).toHaveBeenCalledWith({model: [], router: mocks.router, desc: 'TITLE1'});
    });
    
    it("should call ServiceDetailVssSectionView when click on multiple vssHeaders row", function() {
      var clickSpy = spyOnEvent('#list tbody tr:eq(2)', 'click');
      $('#list tbody tr:eq(2)').click();
      expect('click').toHaveBeenTriggeredOn('#list tbody tr:eq(2)');
      expect(clickSpy).toHaveBeenTriggered();

      expect(mocks.serviceDetailsVssView).toHaveBeenCalledOnce();
      expect(mocks.serviceDetailsVssView).toHaveBeenCalledWith({
        model: mockData.vssHeaders3, 
        router: mockData.router, 
        desc: 'TITLE3'});
    });

  });

});
