import { createComponent } from "./createComponent.native.js";
import { mergeVariants } from "./helpers/mergeVariants.native.js";
import { getReactNativeConfig } from "./setupReactNative.native.js";
function styled(ComponentIn, options, config) {
  if (process.env.NODE_ENV !== "production" && !ComponentIn) throw new Error("No component given to styled()");
  var parentStaticConfig = ComponentIn.staticConfig,
    isPlainStyledComponent = !!parentStaticConfig && !(parentStaticConfig.isReactNative || parentStaticConfig.isHOC),
    isNonStyledHOC = parentStaticConfig?.isHOC && !parentStaticConfig?.isStyledHOC,
    Component = isNonStyledHOC || isPlainStyledComponent ? ComponentIn : parentStaticConfig?.Component || ComponentIn,
    reactNativeConfig = parentStaticConfig ? void 0 : getReactNativeConfig(Component),
    isReactNative = !!(reactNativeConfig || config?.isReactNative || parentStaticConfig?.isReactNative),
    staticConfigProps = function () {
      var {
          variants,
          name,
          defaultVariants,
          acceptsClassName: acceptsClassNameProp,
          context,
          ...defaultProps
        } = options || {},
        parentDefaultVariants,
        parentDefaultProps;
      if (parentStaticConfig) {
        var avoid = parentStaticConfig.isHOC && !parentStaticConfig.isStyledHOC;
        if (!avoid) {
          var pdp = parentStaticConfig.defaultProps;
          for (var key2 in pdp) {
            var val = pdp[key2];
            parentStaticConfig.defaultVariants && key2 in parentStaticConfig.defaultVariants && (!defaultVariants || !(key2 in defaultVariants)) && (parentDefaultVariants || (parentDefaultVariants = {}), parentDefaultVariants[key2] = val), !(key2 in defaultProps) && (!defaultVariants || !(key2 in defaultVariants)) && (parentDefaultProps || (parentDefaultProps = {}), parentDefaultProps[key2] = pdp[key2]);
          }
          parentStaticConfig.variants && (variants = mergeVariants(parentStaticConfig.variants, variants));
        }
      }
      (parentDefaultProps || defaultVariants || parentDefaultVariants) && (defaultProps = {
        ...parentDefaultProps,
        ...parentDefaultVariants,
        ...defaultProps,
        ...defaultVariants
      }), parentStaticConfig?.isHOC && name && (defaultProps.componentName = name);
      var isText = !!(config?.isText || parentStaticConfig?.isText),
        _config_acceptsClassName,
        _ref,
        acceptsClassName = (_ref = (_config_acceptsClassName = config?.acceptsClassName) !== null && _config_acceptsClassName !== void 0 ? _config_acceptsClassName : acceptsClassNameProp) !== null && _ref !== void 0 ? _ref : isPlainStyledComponent || isReactNative || parentStaticConfig?.isHOC && parentStaticConfig?.acceptsClassName,
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
    }(),
    component = createComponent(staticConfigProps || {});
  for (var key in ComponentIn) key !== "propTypes" && (key in component || (component[key] = ComponentIn[key]));
  return component;
}
export { styled };
//# sourceMappingURL=styled.native.js.map
