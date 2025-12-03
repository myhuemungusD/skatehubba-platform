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
var masks_exports = {};
__export(masks_exports, {
  createIdentityMask: () => createIdentityMask,
  createInverseMask: () => createInverseMask,
  createMask: () => createMask,
  createShiftMask: () => createShiftMask,
  createSoftenMask: () => createSoftenMask,
  createStrengthenMask: () => createStrengthenMask,
  createWeakenMask: () => createWeakenMask,
  skipMask: () => skipMask
});
module.exports = __toCommonJS(masks_exports);
var import_helpers = require("./helpers.native.js"),
  import_isMinusZero = require("./isMinusZero.native.js"),
  createMask = function (createMask2) {
    return typeof createMask2 == "function" ? {
      name: createMask2.name || "unnamed",
      mask: createMask2
    } : createMask2;
  },
  skipMask = {
    name: "skip-mask",
    mask: function (template, opts) {
      var {
          skip
        } = opts,
        result = Object.fromEntries(Object.entries(template).filter(function (param) {
          var [k] = param;
          return !skip || !(k in skip);
        }).map(function (param) {
          var [k, v] = param;
          return [k, applyOverrides(k, v, opts)];
        }));
      return result;
    }
  };
function applyOverrides(key, value, opts) {
  var _opts_overrideSwap,
    override,
    strategy = opts.overrideStrategy,
    overrideSwap = (_opts_overrideSwap = opts.overrideSwap) === null || _opts_overrideSwap === void 0 ? void 0 : _opts_overrideSwap[key];
  if (typeof overrideSwap < "u") override = overrideSwap, strategy = "swap";else {
    var _opts_overrideShift,
      overrideShift = (_opts_overrideShift = opts.overrideShift) === null || _opts_overrideShift === void 0 ? void 0 : _opts_overrideShift[key];
    if (typeof overrideShift < "u") override = overrideShift, strategy = "shift";else {
      var _opts_override,
        overrideDefault = (_opts_override = opts.override) === null || _opts_override === void 0 ? void 0 : _opts_override[key];
      typeof overrideDefault < "u" && (override = overrideDefault, strategy = opts.overrideStrategy);
    }
  }
  return typeof override > "u" || typeof override == "string" ? value : strategy === "swap" ? override : value;
}
var createIdentityMask = function () {
    return {
      name: "identity-mask",
      mask: function (template, opts) {
        return skipMask.mask(template, opts);
      }
    };
  },
  createInverseMask = function () {
    var mask = {
      name: "inverse-mask",
      mask: function (template, opts) {
        var inversed = (0, import_helpers.objectFromEntries)((0, import_helpers.objectEntries)(template).map(function (param) {
          var [k, v] = param;
          return [k, -v];
        }));
        return skipMask.mask(inversed, opts);
      }
    };
    return mask;
  },
  createShiftMask = function () {
    var {
        inverse
      } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      defaultOptions = arguments.length > 1 ? arguments[1] : void 0,
      mask = {
        name: "shift-mask",
        mask: function (template, opts) {
          var {
              override,
              overrideStrategy = "shift",
              max: maxIn,
              palette,
              min = 0,
              strength = 1
            } = {
              ...defaultOptions,
              ...opts
            },
            values = Object.entries(template),
            max = maxIn ?? (palette ? Object.values(palette).length - 1 : Number.POSITIVE_INFINITY),
            out = {},
            _iteratorNormalCompletion = !0,
            _didIteratorError = !1,
            _iteratorError = void 0;
          try {
            for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
              var [key, value] = _step.value;
              if (typeof value != "string") {
                if (typeof override?.[key] == "number") {
                  var overrideVal = override[key];
                  out[key] = overrideStrategy === "shift" ? value + overrideVal : overrideVal;
                  continue;
                }
                if (typeof override?.[key] == "string") {
                  out[key] = override[key];
                  continue;
                }
                var isPositive = value === 0 ? !(0, import_isMinusZero.isMinusZero)(value) : value >= 0,
                  direction = isPositive ? 1 : -1,
                  invert = inverse ? -1 : 1,
                  next = value + strength * direction * invert,
                  clamped = isPositive ? Math.max(min, Math.min(max, next)) : Math.min(-min, Math.max(-max, next));
                out[key] = clamped;
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
          var skipped = skipMask.mask(out, opts);
          return skipped;
        }
      };
    return mask;
  },
  createWeakenMask = function (defaultOptions) {
    return {
      name: "soften-mask",
      mask: createShiftMask({}, defaultOptions).mask
    };
  },
  createSoftenMask = createWeakenMask,
  createStrengthenMask = function (defaultOptions) {
    return {
      name: "strengthen-mask",
      mask: createShiftMask({
        inverse: !0
      }, defaultOptions).mask
    };
  };
//# sourceMappingURL=masks.native.js.map
