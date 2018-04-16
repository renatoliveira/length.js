/*!
 * length.js v0.0.5 (https://github.com/appalaszynski/length.js)
 * Copyright (c) 2018 appalaszynski (https://github.com/appalaszynski)
 * Licensed under MIT (https://github.com/appalaszynski/length.js/blob/master/LICENSE)
 */
; (function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else {
    global.length = factory();
  }
}(this, function () {

  // Current length.js version.
  var version = "0.0.5";

  /**
   * Currently supported units.
   */

  var standardUnitDependences = {
    cm: 1,
    dm: 10,
    m: 100,
    km: 100000,
    in: 2.54,
    ft: 30.48,
    yd: 91.44,
    mi: 160934.4,
  }

  supportedUnits = Object.keys(standardUnitDependences)

  // Length constructor
  function Length(value, unit) {
    validate(value, unit);

    this.value = value;
    this.unit = unit;
  }

  /**
   * Main length function (available by global.length) which allows to create
   * new Length object by calling simply 'length()' instead of 'new Length()'.
   */
  var length = function (value, unit) {
    return new Length(value, unit)
  }

  /**
   * Function used during new Length object creation.
   * It checks if parameters passed by user are valid.
   */
  function validate(value, unit) {
    if (!value || !unit) {
      throw Error('You have to pass value and unit type!')
    } else if (typeof value !== 'number') {
      throw Error('Value must be a number!')
    } else if (supportedUnits.indexOf(unit) == -1) {
      throw Error('Unsupported unit type! Supported units list:\n' + supportedUnits)
    }
  }

  // Simpler version of validate() function - checks only unit type correctness.
  function validateUnit(unit) {
    if (!unit) {
      throw Error('You have to pass unit type!')
    } else if (supportedUnits.indexOf(unit) == -1) {
      throw Error('Unsupported unit type! Supported units list:\n' + supportedUnits)
    }
  }

  // Converts value to standard unit - centimeter.
  function toStandard(value, unit) {
    switch (unit) {
      case 'cm':
        return value;
      case 'dm':
        return value * standardUnitDependences.dm;
      case 'm':
        return value * standardUnitDependences.m;
      case 'km':
        return value * standardUnitDependences.km;
      case 'in':
        return value * standardUnitDependences.in;
      case 'ft':
        return value * standardUnitDependences.ft;
      case 'yd':
        return value * standardUnitDependences.yd;
      case 'mi':
        return value * standardUnitDependences.mi;
    }
  }

  // Converts standard unit value to unit passed by user.
  function toByUnit(value, standardUnit) {
    switch (standardUnit) {
      case 'cm':
        return value;
      case 'dm':
        return value * (1 / standardUnitDependences.dm);
      case 'm':
        return value * (1 / standardUnitDependences.m);
      case 'km':
        return value * (1 / standardUnitDependences.km)
      case 'in':
        return value * (1 / standardUnitDependences.in)
      case 'ft':
        return value * (1 / standardUnitDependences.ft)
      case 'yd':
        return value * (1 / standardUnitDependences.yd)
      case 'mi':
        return value * (1 / standardUnitDependences.mi)
    }
  }

  function to(unit) {
    // Check unit correctness.
    validateUnit(unit);

    // Get value in standard unit.
    var standardUnitValue = toStandard(this.value, this.unit);

    // Get value converted to unit passed by user.
    var convertedValue = toByUnit(standardUnitValue, unit);

    return length(convertedValue, unit);
  }

  function add(value) {
    if (typeof value !== 'number') {
      throw Error('add() argument must be a number!')
    }

    var newValue = this.value + value;
    
    return length(newValue, this.unit);
  }

  function getValue() {
    return this.value;
  }

  function getUnit() {
    return this.unit;
  }

  function getString() {
    return this.value + this.unit;
  }

  function toPrecision(digits) {
    var value = digits ? this.value.toFixed(digits) : this.value;
    return length(parseFloat(value), this.unit);
  }

  // Initialize Length object prototype.
  var proto = Length.prototype = {};

  // Insert functions into Length object prototype.
  proto.version = version;
  proto.to = to;
  proto.add = add;
  proto.getValue = getValue;
  proto.getUnit = getUnit;
  proto.getString = getString;
  proto.toPrecision = toPrecision;

  // Expose Length prototype if user wants to add new functions.
  length.fn = proto;

  return length;
}));
