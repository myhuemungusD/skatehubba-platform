import { objectEntries, objectFromEntries } from "./helpers.mjs";
import { isMinusZero } from "./isMinusZero.mjs";
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
      const inversed = objectFromEntries(objectEntries(template).map(([k, v]) => [k, -v]));
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
        const isPositive = value === 0 ? !isMinusZero(value) : value >= 0,
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
export { createIdentityMask, createInverseMask, createMask, createShiftMask, createSoftenMask, createStrengthenMask, createWeakenMask, skipMask };
//# sourceMappingURL=masks.mjs.map
