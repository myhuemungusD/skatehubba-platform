import { applyMaskStateless } from "./applyMask.native.js";
import { getThemeInfo } from "./themeInfo.native.js";
var combineMasks = function () {
  for (var _len = arguments.length, masks = new Array(_len), _key = 0; _key < _len; _key++) masks[_key] = arguments[_key];
  var mask = {
    name: "combine-mask",
    mask: function (template, opts) {
      var current = getThemeInfo(template, opts.parentName),
        theme,
        _iteratorNormalCompletion = !0,
        _didIteratorError = !1,
        _iteratorError = void 0;
      try {
        for (var _iterator = masks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
          var mask2 = _step.value;
          if (!current) throw new Error(`Nothing returned from mask: ${current}, for template: ${template} and mask: ${mask2.toString()}, given opts ${JSON.stringify(opts, null, 2)}`);
          var next = applyMaskStateless(current, mask2, opts);
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
export { combineMasks };
//# sourceMappingURL=combineMasks.native.js.map
