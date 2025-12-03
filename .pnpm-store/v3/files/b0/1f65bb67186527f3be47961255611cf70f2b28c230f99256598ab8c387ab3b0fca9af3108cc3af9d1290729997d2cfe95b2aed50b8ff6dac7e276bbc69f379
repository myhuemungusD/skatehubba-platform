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
var idle_exports = {};
__export(idle_exports, {
  idle: () => idle
});
module.exports = __toCommonJS(idle_exports);
var import_errors = require("./errors.cjs"),
  import_sleep = require("./sleep.cjs");
const idleCb = typeof requestIdleCallback > "u" ? cb => setTimeout(cb, 1) : requestIdleCallback,
  idleAsync = () => new Promise(res => {
    idleCb(res);
  }),
  idle = async (signal, options) => {
    const {
        max,
        min,
        fully
      } = options || {},
      idleFn = fully ? fullyIdle : idleAsync;
    if (max && min && min < max ? await Promise.race([Promise.all([idleFn(), (0, import_sleep.sleep)(min)]), (0, import_sleep.sleep)(max)]) : max ? await Promise.race([idleFn(), (0, import_sleep.sleep)(max)]) : min ? await Promise.all([idleFn(), (0, import_sleep.sleep)(min)]) : await idleFn(), signal?.aborted) throw new import_errors.AbortError();
  },
  fullyIdle = async signal => {
    for (;;) {
      const startTime = Date.now();
      if (await idle(signal), Date.now() - startTime < 15) break;
      if (signal?.aborted) throw new import_errors.AbortError();
    }
  };