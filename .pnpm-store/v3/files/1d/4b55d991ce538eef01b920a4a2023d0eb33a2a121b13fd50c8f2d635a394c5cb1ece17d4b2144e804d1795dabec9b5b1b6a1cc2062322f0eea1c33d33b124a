import { Dimensions } from "react-native";
function getWindowSize() {
  return Dimensions.get("window");
}
var cbs = /* @__PURE__ */new Set();
Dimensions.addEventListener("change", function (param) {
  var {
    window
  } = param;
  cbs.forEach(function (cb) {
    return cb(window);
  });
});
function subscribe(cb) {
  return cbs.add(cb), function () {
    return cbs.delete(cb);
  };
}
export { getWindowSize, subscribe };
//# sourceMappingURL=helpers.native.js.map
