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
var idle_exports = {};
__export(idle_exports, {
  idle: () => idle
});
module.exports = __toCommonJS(idle_exports);
var import_errors = require("./errors.native.js"),
  import_sleep = require("./sleep.native.js"),
  idleCb = typeof requestIdleCallback > "u" ? function (cb) {
    return setTimeout(cb, 1);
  } : requestIdleCallback,
  idleAsync = function () {
    return new Promise(function (res) {
      idleCb(res);
    });
  },
  idle = async function (signal, options) {
    var {
        max,
        min,
        fully
      } = options || {},
      idleFn = fully ? fullyIdle : idleAsync;
    if (max && min && min < max ? await Promise.race([Promise.all([idleFn(), (0, import_sleep.sleep)(min)]), (0, import_sleep.sleep)(max)]) : max ? await Promise.race([idleFn(), (0, import_sleep.sleep)(max)]) : min ? await Promise.all([idleFn(), (0, import_sleep.sleep)(min)]) : await idleFn(), signal?.aborted) throw new import_errors.AbortError();
  },
  fullyIdle = async function (signal) {
    for (;;) {
      var startTime = Date.now();
      await idle(signal);
      var endTime = Date.now(),
        duration = endTime - startTime;
      if (duration < 15) break;
      if (signal?.aborted) throw new import_errors.AbortError();
    }
  };
//# sourceMappingURL=idle.native.js.map
