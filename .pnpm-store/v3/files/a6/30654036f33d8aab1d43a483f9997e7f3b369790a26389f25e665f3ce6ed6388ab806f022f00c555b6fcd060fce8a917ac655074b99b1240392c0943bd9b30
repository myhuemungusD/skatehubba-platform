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
var import_helpers = require("./helpers.cjs"),
  import_isMinusZero = require("./isMinusZero.cjs");
const createMask = createMask2 => typeof createMask2 == "function" ? {
    name: createMask2.name || "unnamed",
    mask: createMask2
  } : createMask2,
  skipMask = {
    name: "skip-mask",
    mask: (template, opts) => {
      const {
        skip
      } = opts;
      return Object.fromEntries(Object.entries(template).filter(([k]) => !skip || !(k in skip)).map(([k, v]) => [k, applyOverrides(k, v, opts)]));
    }
  };
function applyOverrides(key, value, opts) {
  let override,
    strategy = opts.overrideStrategy;
  const overrideSwap = opts.overrideSwap?.[key];
  if (typeof overrideSwap < "u") override = overrideSwap, strategy = "swap";else {
    const overrideShift = opts.overrideShift?.[key];
    if (typeof overrideShift < "u") override = overrideShift, strategy = "shift";else {
      const overrideDefault = opts.override?.[key];
      typeof overrideDefault < "u" && (override = overrideDefault, strategy = opts.overrideStrategy);
    }
  }
  return typeof override > "u" || typeof override == "string" ? value : strategy === "swap" ? override : value;
}
const createIdentityMask = () => ({
    name: "identity-mask",
    mask: (template, opts) => skipMask.mask(template, opts)
  }),
  createInverseMask = () => ({
    name: "inverse-mask",
    mask: (template, opts) => {
      const inversed = (0, import_helpers.objectFromEntries)((0, import_helpers.objectEntries)(template).map(([k, v]) => [k, -v]));
      return skipMask.mask(inversed, opts);
    }
  }),
  createShiftMask = ({
    inverse
  } = {}, defaultOptions) => ({
    name: "shift-mask",
    mask: (template, opts) => {
      const {
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
        out = {};
      for (const [key, value] of values) {
        if (typeof value == "string") continue;
        if (typeof override?.[key] == "number") {
          const overrideVal = override[key];
          out[key] = overrideStrategy === "shift" ? value + overrideVal : overrideVal;
          continue;
        }
        if (typeof override?.[key] == "string") {
          out[key] = override[key];
          continue;
        }
        const isPositive = value === 0 ? !(0, import_isMinusZero.isMinusZero)(value) : value >= 0,
          direction = isPositive ? 1 : -1,
          invert = inverse ? -1 : 1,
          next = value + strength * direction * invert,
          clamped = isPositive ? Math.max(min, Math.min(max, next)) : Math.min(-min, Math.max(-max, next));
        out[key] = clamped;
      }
      return skipMask.mask(out, opts);
    }
  }),
  createWeakenMask = defaultOptions => ({
    name: "soften-mask",
    mask: createShiftMask({}, defaultOptions).mask
  }),
  createSoftenMask = createWeakenMask,
  createStrengthenMask = defaultOptions => ({
    name: "strengthen-mask",
    mask: createShiftMask({
      inverse: !0
    }, defaultOptions).mask
  });