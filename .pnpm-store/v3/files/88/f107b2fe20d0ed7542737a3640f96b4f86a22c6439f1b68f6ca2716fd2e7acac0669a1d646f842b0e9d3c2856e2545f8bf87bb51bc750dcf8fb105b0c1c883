import { bezier } from "./cubicBezier";
function animate(param) {
  let start = null;
  const easing = param.cubicBezier ? bezier(...param.cubicBezier) : (v) => v, { x: fromX, y: fromY, scaleX: fromScaleX, scaleY: fromScaleY } = param.from, { x: toX, y: toY, scaleX: toScaleX, scaleY: toScaleY } = param.to;
  function frame(timestamp) {
    start || (start = timestamp);
    const progress = timestamp - start, x = toX !== void 0 ? fromX + (toX - fromX) * easing(progress / param.duration) : void 0, y = toY !== void 0 ? fromY + (toY - fromY) * easing(progress / param.duration) : void 0, scaleX = toScaleX !== void 0 ? fromScaleX + (toScaleX - fromScaleX) * easing(progress / param.duration) : void 0, scaleY = toScaleY !== void 0 ? fromScaleY + (toScaleY - fromScaleY) * easing(progress / param.duration) : void 0;
    param.onUpdate({ x, y, scaleX, scaleY }), progress < param.duration && requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
export {
  animate
};
//# sourceMappingURL=index.js.map
