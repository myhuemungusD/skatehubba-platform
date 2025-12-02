import { pseudoDescriptors } from "./pseudoDescriptors";
const mergeProps = (defaultProps, props) => {
  const out = {};
  for (const key in defaultProps)
    key in props || (out[key] = defaultProps[key]);
  for (const key in props)
    mergeProp(out, defaultProps, props, key);
  return out;
}, mergeComponentProps = (defaultProps, contextProps, props) => {
  let overriddenContext = null;
  if (!defaultProps && !contextProps)
    return [props, overriddenContext];
  if (defaultProps && !contextProps)
    return [mergeProps(defaultProps, props), overriddenContext];
  const out = {};
  for (const key in defaultProps)
    key in props || (out[key] = defaultProps[key]);
  for (const key in contextProps) {
    if (key in props) continue;
    const contextValue = contextProps[key];
    contextValue !== void 0 && (out[key] = contextValue);
  }
  for (const key in props)
    mergeProp(out, defaultProps, props, key), contextProps && key in contextProps && (overriddenContext ||= {}, overriddenContext[key] = props[key]);
  return [out, overriddenContext];
};
function mergeProp(out, defaultProps, props, key) {
  let val = props[key];
  if (defaultProps && key in defaultProps && (key in pseudoDescriptors || key[0] === "$") && val && typeof val == "object") {
    const defaultVal = defaultProps[key];
    defaultVal && typeof defaultVal == "object" && (val = mergeProps(defaultVal, val));
  }
  out[key] = val;
}
export {
  mergeComponentProps,
  mergeProps
};
//# sourceMappingURL=mergeProps.js.map
