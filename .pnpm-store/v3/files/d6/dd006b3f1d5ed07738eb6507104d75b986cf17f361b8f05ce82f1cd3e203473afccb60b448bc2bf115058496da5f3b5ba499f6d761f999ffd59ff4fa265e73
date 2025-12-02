import { createComponent } from "./createComponent.mjs";
import { mergeVariants } from "./helpers/mergeVariants.mjs";
import { getReactNativeConfig } from "./setupReactNative.mjs";
function styled(ComponentIn, options, config) {
  if (process.env.NODE_ENV !== "production" && !ComponentIn) throw new Error("No component given to styled()");
  const parentStaticConfig = ComponentIn.staticConfig,
    isPlainStyledComponent = !!parentStaticConfig && !(parentStaticConfig.isReactNative || parentStaticConfig.isHOC);
  let Component = parentStaticConfig?.isHOC && !parentStaticConfig?.isStyledHOC || isPlainStyledComponent ? ComponentIn : parentStaticConfig?.Component || ComponentIn;
  const reactNativeConfig = parentStaticConfig ? void 0 : getReactNativeConfig(Component),
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
        parentStaticConfig.variants && (variants = mergeVariants(parentStaticConfig.variants, variants));
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
    component = createComponent(staticConfigProps || {});
  for (const key in ComponentIn) key !== "propTypes" && (key in component || (component[key] = ComponentIn[key]));
  return component;
}
export { styled };
//# sourceMappingURL=styled.mjs.map
