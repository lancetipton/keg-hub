'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var colors = require('./colors-b60a70f0.js');
var React = require('react');
var React__default = _interopDefault(React);
var useClassList = require('./useClassList-2f47489f.js');

var useThemeType = function useThemeType(themeLoc, defClass) {
  return React.useMemo(function () {
    var defClassArr = jsutils.eitherArr(defClass, [defClass]);
    if (!themeLoc) return defClassArr;
    var themeSplit = themeLoc.split('.');
    var surface = themeSplit.pop();
    var typeRef = themeSplit.pop();
    var surfaces = Object.keys(jsutils.get(colors.colors, 'surface', jsutils.noOpObj));
    return typeRef && surfaces.indexOf(surface) ? ["".concat(defClass, "-").concat(typeRef), surface] : surface ? ["".concat(defClass, "-").concat(surface)] : defClassArr;
  }, [themeLoc, defClass]);
};
var useThemeTypeAsClass = function useThemeTypeAsClass() {
  var themeLoc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var defClass = arguments.length > 1 ? arguments[1] : undefined;
  var className = arguments.length > 2 ? arguments[2] : undefined;
  var themeTypeCls = useThemeType(themeLoc, defClass);
  var classList = jsutils.isArr(className) ? className.concat(themeTypeCls) : [].concat(_rollupPluginBabelHelpers._toConsumableArray(themeTypeCls), [className]);
  return useClassList.useClassList(defClass, classList);
};

exports.useThemeTypeAsClass = useThemeTypeAsClass;
//# sourceMappingURL=useThemeTypeAsClass-63974a86.js.map