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
var index_exports = {};
__export(index_exports, {
  animate: () => animate
});
module.exports = __toCommonJS(index_exports);
var import_cubicBezier = require("./cubicBezier.native.js");
function animate(param) {
  var start = null,
    easing = param.cubicBezier ? (0, import_cubicBezier.bezier)(...param.cubicBezier) : function (v) {
      return v;
    },
    {
      x: fromX,
      y: fromY,
      scaleX: fromScaleX,
      scaleY: fromScaleY
    } = param.from,
    {
      x: toX,
      y: toY,
      scaleX: toScaleX,
      scaleY: toScaleY
    } = param.to;
  function frame(timestamp) {
    start || (start = timestamp);
    var progress = timestamp - start,
      x = toX !== void 0 ? fromX + (toX - fromX) * easing(progress / param.duration) : void 0,
      y = toY !== void 0 ? fromY + (toY - fromY) * easing(progress / param.duration) : void 0,
      scaleX = toScaleX !== void 0 ? fromScaleX + (toScaleX - fromScaleX) * easing(progress / param.duration) : void 0,
      scaleY = toScaleY !== void 0 ? fromScaleY + (toScaleY - fromScaleY) * easing(progress / param.duration) : void 0;
    param.onUpdate({
      x,
      y,
      scaleX,
      scaleY
    }), progress < param.duration && requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
//# sourceMappingURL=index.native.js.map
