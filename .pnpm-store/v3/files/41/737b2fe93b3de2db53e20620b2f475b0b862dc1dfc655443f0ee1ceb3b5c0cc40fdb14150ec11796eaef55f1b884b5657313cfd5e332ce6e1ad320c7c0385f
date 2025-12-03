import { webPropsToSkip } from "./webPropsToSkip.native.js";
var skipProps = {
  untilMeasured: 1,
  animation: 1,
  space: 1,
  animateOnly: 1,
  disableClassName: 1,
  debug: 1,
  componentName: 1,
  disableOptimization: 1,
  tag: 1,
  style: 1,
  // handled after loop so pseudos set usedKeys and override it if necessary
  group: 1,
  themeInverse: 1,
  animatePresence: 1
};
process.env.NODE_ENV === "test" && (skipProps["data-test-renders"] = 1);
Object.assign(skipProps, webPropsToSkip);
export { skipProps };
//# sourceMappingURL=skipProps.native.js.map
