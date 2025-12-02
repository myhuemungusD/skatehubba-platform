var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var log_exports = {};
__export(log_exports, {
  log: () => log
});
module.exports = __toCommonJS(log_exports);
var import_useMedia = require("../hooks/useMedia");
function log(...args) {
  if (process.env.NODE_ENV !== "production") {
    (0, import_useMedia._disableMediaTouch)(!0);
    try {
      return console.info(...args);
    } catch (err) {
      console.error(err);
    } finally {
      (0, import_useMedia._disableMediaTouch)(!1);
    }
  }
}
//# sourceMappingURL=log.js.map
