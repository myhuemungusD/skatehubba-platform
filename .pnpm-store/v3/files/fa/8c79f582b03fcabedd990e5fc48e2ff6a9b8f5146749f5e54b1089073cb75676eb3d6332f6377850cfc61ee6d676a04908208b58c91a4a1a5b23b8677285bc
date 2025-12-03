import { useIsomorphicLayoutEffect } from "@tamagui/constants";
import React from "react";
import { getConfig } from "../config.native.js";
import { ComponentContext } from "../contexts/ComponentContext.native.js";
import { GroupContext } from "../contexts/GroupContext.native.js";
import { useSplitStyles } from "../helpers/getSplitStyles.native.js";
import { subscribeToContextGroup } from "../helpers/subscribeToContextGroup.native.js";
import { Stack } from "../views/Stack.native.js";
import { useComponentState } from "./useComponentState.native.js";
import { mediaState, useMedia } from "./useMedia.native.js";
import { useThemeWithState } from "./useTheme.native.js";
function useProps(props, opts) {
  var [propsOut, styleOut] = usePropsAndStyle(props, {
    ...opts,
    noExpand: !0,
    noNormalize: !0,
    resolveValues: "none"
  });
  return {
    ...propsOut,
    ...styleOut
  };
}
function useStyle(props, opts) {
  return usePropsAndStyle(props, opts)[1] || {};
}
function usePropsAndStyle(props, opts) {
  var _opts_forComponent,
    _opts_forComponent_staticConfig,
    staticConfig = (_opts_forComponent_staticConfig = opts == null || (_opts_forComponent = opts.forComponent) === null || _opts_forComponent === void 0 ? void 0 : _opts_forComponent.staticConfig) !== null && _opts_forComponent_staticConfig !== void 0 ? _opts_forComponent_staticConfig : Stack.staticConfig,
    [theme, themeState] = useThemeWithState({
      componentName: staticConfig.componentName,
      name: "theme" in props ? props.theme : void 0,
      inverse: "themeInverse" in props ? props.themeInverse : void 0,
      needsUpdate() {
        return !0;
      }
    }),
    componentContext = React.useContext(ComponentContext),
    groupContext = React.useContext(GroupContext),
    {
      state,
      disabled,
      setStateShallow
    } = useComponentState(props, componentContext.animationDriver, staticConfig, getConfig()),
    mediaStateNow = opts?.noMedia ?
    // not safe to use mediaState but really marginal to hit this
    mediaState : useMedia(),
    splitStyles = useSplitStyles(props, staticConfig, theme, themeState?.name || "", state, {
      isAnimated: !1,
      mediaState: mediaStateNow,
      noSkip: !0,
      noMergeStyle: !0,
      noClass: !0,
      resolveValues: "auto",
      ...opts
    }, null, componentContext, groupContext),
    {
      mediaGroups,
      pseudoGroups
    } = splitStyles || {};
  return useIsomorphicLayoutEffect(function () {
    if (!disabled) {
      if (state.unmounted) {
        setStateShallow({
          unmounted: !1
        });
        return;
      }
      if (groupContext) return subscribeToContextGroup({
        groupContext,
        setStateShallow,
        mediaGroups,
        pseudoGroups
      });
    }
  }, [disabled, groupContext, pseudoGroups ? Object.keys([...pseudoGroups]).join("") : 0, mediaGroups ? Object.keys([...mediaGroups]).join("") : 0]), [splitStyles?.viewProps || {}, splitStyles?.style || {}, theme, mediaState];
}
export { useProps, usePropsAndStyle, useStyle };
//# sourceMappingURL=useProps.native.js.map
