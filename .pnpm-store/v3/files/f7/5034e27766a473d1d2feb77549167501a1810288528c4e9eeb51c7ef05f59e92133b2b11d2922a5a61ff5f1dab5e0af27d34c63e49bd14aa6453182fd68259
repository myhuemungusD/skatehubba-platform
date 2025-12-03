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
var styled_exports = {};
__export(styled_exports, {
  styled: () => styled
});
module.exports = __toCommonJS(styled_exports);
var import_createComponent = require("./createComponent.cjs"),
  import_mergeVariants = require("./helpers/mergeVariants.cjs"),
  import_setupReactNative = require("./setupReactNative.cjs");
function styled(ComponentIn, options, config) {
  if (process.env.NODE_ENV !== "production" && !ComponentIn) throw new Error("No component given to styled()");
  const parentStaticConfig = ComponentIn.staticConfig,
    isPlainStyledComponent = !!parentStaticConfig && !(parentStaticConfig.isReactNative || parentStaticConfig.isHOC);
  let Component = parentStaticConfig?.isHOC && !parentStaticConfig?.isStyledHOC || isPlainStyledComponent ? ComponentIn : parentStaticConfig?.Component || ComponentIn;
  const reactNativeConfig = parentStaticConfig ? void 0 : (0, import_setupReactNative.getReactNativeConfig)(Component),
    isReactNative = !!(reactNativeConfig || config?.isReactNative || parentStaticConfig?.isReactNative),
    staticConfigProps = (() => {
      let {
          variants,
          name,
          defaultVariants,
          acceptsClassName: acceptsClassNameProp,
          context,
          ...defaultProps
        } = options || {},
        parentDefaultVariants,
        parentDefaultProps;
      if (parentStaticConfig && !(parentStaticConfig.isHOC && !parentStaticConfig.isStyledHOC)) {
        const pdp = parentStaticConfig.defaultProps;
        for (const key in pdp) {
          const val = pdp[key];
          parentStaticConfig.defaultVariants && key in parentStaticConfig.defaultVariants && (!defaultVariants || !(key in defaultVariants)) && (parentDefaultVariants ||= {}, parentDefaultVariants[key] = val), !(key in defaultProps) && (!defaultVariants || !(key in defaultVariants)) && (parentDefaultProps ||= {}, parentDefaultProps[key] = pdp[key]);
        }
        parentStaticConfig.variants && (variants = (0, import_mergeVariants.mergeVariants)(parentStaticConfig.variants, variants));
      }
      (parentDefaultProps || defaultVariants || parentDefaultVariants) && (defaultProps = {
        ...parentDefaultProps,
        ...parentDefaultVariants,
        ...defaultProps,
        ...defaultVariants
      }), parentStaticConfig?.isHOC && name && (defaultProps.componentName = name);
      const isText = !!(config?.isText || parentStaticConfig?.isText),
        acceptsClassName = config?.acceptsClassName ?? acceptsClassNameProp ?? (isPlainStyledComponent || isReactNative || parentStaticConfig?.isHOC && parentStaticConfig?.acceptsClassName),
        conf = {
          ...parentStaticConfig,
          ...config,
          ...(!isPlainStyledComponent && {
            Component
          }),
          // @ts-expect-error
          variants,
          defaultProps,
          defaultVariants,
          componentName: name || parentStaticConfig?.componentName,
          isReactNative,
          isText,
          acceptsClassName,
          context,
          ...reactNativeConfig,
          isStyledHOC: !!parentStaticConfig?.isHOC,
          parentStaticConfig
        };
      return (defaultProps.children || !acceptsClassName || context) && (conf.neverFlatten = !0), conf;
    })(),
    component = (0, import_createComponent.createComponent)(staticConfigProps || {});
  for (const key in ComponentIn) key !== "propTypes" && (key in component || (component[key] = ComponentIn[key]));
  return component;
}