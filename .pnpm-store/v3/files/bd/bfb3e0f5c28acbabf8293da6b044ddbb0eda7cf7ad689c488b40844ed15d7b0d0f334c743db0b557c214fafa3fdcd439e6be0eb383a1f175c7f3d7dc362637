"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var proxyThemeToParents_exports = {};
__export(proxyThemeToParents_exports, {
  proxyThemeToParents: () => proxyThemeToParents,
  proxyThemesToParents: () => proxyThemesToParents
});
module.exports = __toCommonJS(proxyThemeToParents_exports);
var themesRaw = {};
function proxyThemesToParents(dedupedThemes) {
  var _iteratorNormalCompletion = !0,
    _didIteratorError = !1,
    _iteratorError = void 0;
  try {
    for (var _iterator = dedupedThemes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var {
          names,
          theme
        } = _step.value,
        _iteratorNormalCompletion1 = !0,
        _didIteratorError1 = !1,
        _iteratorError1 = void 0;
      try {
        for (var _iterator1 = names[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = !0) {
          var name = _step1.value;
          themesRaw[name] = theme;
        }
      } catch (err) {
        _didIteratorError1 = !0, _iteratorError1 = err;
      } finally {
        try {
          !_iteratorNormalCompletion1 && _iterator1.return != null && _iterator1.return();
        } finally {
          if (_didIteratorError1) throw _iteratorError1;
        }
      }
    }
  } catch (err) {
    _didIteratorError = !0, _iteratorError = err;
  } finally {
    try {
      !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
    } finally {
      if (_didIteratorError) throw _iteratorError;
    }
  }
  var themes = {},
    _iteratorNormalCompletion2 = !0,
    _didIteratorError2 = !1,
    _iteratorError2 = void 0;
  try {
    for (var _iterator2 = dedupedThemes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
      var {
          names: names1,
          theme: theme1
        } = _step2.value,
        _iteratorNormalCompletion3 = !0,
        _didIteratorError3 = !1,
        _iteratorError3 = void 0;
      try {
        for (var _iterator3 = names1[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = !0) {
          var themeName = _step3.value,
            proxiedTheme = proxyThemeToParents(themeName, theme1);
          themes[themeName] = proxiedTheme;
        }
      } catch (err) {
        _didIteratorError3 = !0, _iteratorError3 = err;
      } finally {
        try {
          !_iteratorNormalCompletion3 && _iterator3.return != null && _iterator3.return();
        } finally {
          if (_didIteratorError3) throw _iteratorError3;
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = !0, _iteratorError2 = err;
  } finally {
    try {
      !_iteratorNormalCompletion2 && _iterator2.return != null && _iterator2.return();
    } finally {
      if (_didIteratorError2) throw _iteratorError2;
    }
  }
  return themes;
}
function proxyThemeToParents(themeName, theme) {
  var out = {},
    cur = [],
    parents = themeName.split("_").slice(0, -1).map(function (part) {
      return cur.push(part), cur.join("_");
    }),
    _iteratorNormalCompletion = !0,
    _didIteratorError = !1,
    _iteratorError = void 0;
  try {
    for (var _iterator = parents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var parent = _step.value;
      Object.assign(out, themesRaw[parent]);
    }
  } catch (err) {
    _didIteratorError = !0, _iteratorError = err;
  } finally {
    try {
      !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
    } finally {
      if (_didIteratorError) throw _iteratorError;
    }
  }
  return Object.assign(out, theme), out;
}
//# sourceMappingURL=proxyThemeToParents.native.js.map
