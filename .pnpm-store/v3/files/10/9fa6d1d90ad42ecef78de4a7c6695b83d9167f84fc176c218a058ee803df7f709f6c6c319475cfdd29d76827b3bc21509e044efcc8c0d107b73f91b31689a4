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
var combineMasks_exports = {};
__export(combineMasks_exports, {
  combineMasks: () => combineMasks
});
module.exports = __toCommonJS(combineMasks_exports);
var import_applyMask = require("./applyMask.native.js"),
  import_themeInfo = require("./themeInfo.native.js"),
  combineMasks = function () {
    for (var _len = arguments.length, masks = new Array(_len), _key = 0; _key < _len; _key++) masks[_key] = arguments[_key];
    var mask = {
      name: "combine-mask",
      mask: function (template, opts) {
        var current = (0, import_themeInfo.getThemeInfo)(template, opts.parentName),
          theme,
          _iteratorNormalCompletion = !0,
          _didIteratorError = !1,
          _iteratorError = void 0;
        try {
          for (var _iterator = masks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
            var mask2 = _step.value;
            if (!current) throw new Error(`Nothing returned from mask: ${current}, for template: ${template} and mask: ${mask2.toString()}, given opts ${JSON.stringify(opts, null, 2)}`);
            var next = (0, import_applyMask.applyMaskStateless)(current, mask2, opts);
            current = next, theme = next.theme;
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
        return theme;
      }
    };
    return mask;
  };
//# sourceMappingURL=combineMasks.native.js.map
