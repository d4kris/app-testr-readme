define([ 'utils/basicRules' ], function ( util ) {

  /* simple checks (reusableElem) */

  /**
   * Check that the active tab is not standard parts
   */
  function searchTypeNotStandardParts () {
    return !util.tabActive({
      'id' : 'stdPartsTab'
    });
  }
  /**
   * Check that the active tab is not components
   */
  function searchTypeNotComponents() {
    return !util.tabActive({
      'id' : 'componentsTab'
    });
  }
  
  /**
   * Check that the operation categories search is not present
   */
  function operationCategoriesSearchNotPresent () {
    return util.isNull({
      'id' : 'operationCategoriesSearch'
    });
  }

  /**
   * Check that the operation categories search is closed
   */
  function operationCategoriesSearchClosed () {
    return util.isClosed({
      'id' : 'operationCategoriesSearch'
    });
  }

  /**
   * Check that the additional search values form is closed
   */
  function additionalSearchClosed () {
    return util.isClosed({
      'id' : 'additionalSearch'
    });
  }

  /**
   * Check that additional search values is displayed and open
   */
  function additionalSearchOpen () {
    return !additionalSearchClosed();
  }

  /**
   * Check that chassis no field is not empty
   */
  function chassisNumberNotEmpty () {
    return util.notEmpty({
      'id' : 'chassi'
    });
  }

  /**
   * Check that chassis series field is not empty
   */
  function chassisSeriesNotEmpty () {
    return util.notEmpty({
      "id" : "chassiSeries"
    });
  }

  /**
   * Check that chassis series field is restricted??
   */
  function chassisRestricted () {
    return true;
  }

  /**
   * Check that input in vin no field has length 17
   */
  function vinNotEmptyAnd17 () {
    return util.valueHasLength({
      "id" : "vin",
      "requiredValue" : "17"
    });
  }

  /**
   * Check that model field is not empty
   */
  function modelNotEmpty () {
    return util.notEmpty({
      "id" : "model"
    });
  }

  /**
   * Check that function group field is displayed
   */
  function functionGroupInputPresent () {
    return util.isNull({
      "id" : "functionGroup"
    });
  }
  /**
   * Check that function group field is not empty
   */
  function functionGroupNotEmpty () {
    return util.notEmpty({
      "id" : "functionGroup"
    });
  }

  // this should be moved to a specific standard parts enable rule script
  /**
   * Check that function group field is not empty for standart parts
   */
  function functionGroupInStandardPartsNotEmpty () {
    return util.notEmpty({
      "id" : "functionGroupSP"
    });
  }

  /* compound checks (reusableCompoundElem) */

  /**
   * Check that the operation categories is not present or is closed
   */
  function operationCategoriesNotPresentOrIsClosed () {
    return util.compoundAny([
        operationCategoriesSearchNotPresent,
        operationCategoriesSearchClosed ]);
  }

  /**
   * Check that chassis no is not empty and that there are no restrictions (?)
   * on chassis
   */
  function chassisNumberNotEmptyAndNoChassisRestriction () {
    return util.compoundAll([ chassisNumberNotEmpty, notChassisRestricted ]);
  }

  /**
   * Check that chassis no and series is not empty and that there are
   * restrictions (?) on chassis
   */
  function chassisNotEmptyAndChassisRestriction () {
    return util.compoundAll([
        chassisNumberNotEmpty,
        chassisSeriesNotEmpty,
        chassisRestricted ]);
  }

  /**
   * check that function group is visible and not empty
   */
  function functionGroupPresentAndNotEmpty () {
    return util
        .compoundAll([ functionGroupInputPresent, functionGroupNotEmpty ]);
  }

  /**
   * Check that at least one of chassis no, vin no, model or function group is
   * entered
   */
  function chassiNumberOrVinOrModelOrFgrpNotEmpty () {
    return util.compoundAny([
        chassisNumberNotEmpty,
        vinNotEmptyAnd17,
        modelNotEmpty,
        functionGroupPresentAndNotEmpty ]);
  }

  /**
   * Check that chassis no or vin no is entered
   */
  function chassiNumberOrVinNotEmpty () {
    return util.compoundAny([ chassisNumberNotEmpty, vinNotEmptyAnd17 ]);
  }

  /*------------------------ end private functions ------------------------- */

  return {

    /* Public rules, */
    /* export the rules as callable methods to other modules */

    /**
     * Enable if searchTypeTab is not standard parts and no operation
     * categories, no additional search and chassi restrictions are met
     * (search_form_enable_rules.xml, row152)
     */
    enableNotStpNoOpcatNoAddChassiNumberRestr : function () {
      return util.compoundAll([
          searchTypeNotStandardParts,
          operationCategoriesNotPresentOrIsClosed,
          additionalSearchClosed,
          chassisNumberNotEmptyAndNoChassisRestriction ]);
    },

    /**
     * Enable if searchTypeTab is not standard parts and no operation categories
     * are shown
     */
    enableNotStpNoOpcat : function () {
      return util.compoundAll([
          searchTypeNotStandardParts,
          operationCategoriesNotPresentOrIsClosed ]);
    },

    /**
     * Enable (search_form_enable_rules.xml, row158)
     */
    enableNotStpNoOpcatNoAddChassiRestr : function () {
      return util.compoundAll([
          searchTypeNotStandardParts,
          operationCategoriesNotPresentOrIsClosed,
          additionalSearchClosed,
          chassisNotEmptyAndChassisRestriction ]);
    },

    /**
     * Enable (search_form_enable_rules.xml, row164)
     */
    enableNotStpAddCloseOpcatCloseNoVin : function () {
      return util.compoundAll([
          searchTypeNotStandardParts,
          additionalSearchClosed,
          operationCategoriesNotPresentOrIsClosed,
          vinNotEmptyAnd17 ]);
    },

    /**
     * Enable (search_form_enable_rules.xml, row171)
     */
    enableNoStpNoCompAddClosedOpcatClosedNoModel : function () {
      return util.compoundAll([
          searchTypeNotStandardParts,
          searchTypeNotComponents,
          additionalSearchClosed,
          operationCategoriesNotPresentOrIsClosed,
          modelNotEmpty ]);
    }

  };
});