import { useIsomorphicLayoutEffect } from "@tamagui/constants";
import React from "react";
import { getConfig } from "../config";
import { ComponentContext } from "../contexts/ComponentContext";
import { GroupContext } from "../contexts/GroupContext";
import { useSplitStyles } from "../helpers/getSplitStyles";
import { subscribeToContextGroup } from "../helpers/subscribeToContextGroup";
import { Stack } from "../views/Stack";
import { useComponentState } from "./useComponentState";
import { mediaState, useMedia } from "./useMedia";
import { useThemeWithState } from "./useTheme";
function useProps(props, opts) {
  const [propsOut, styleOut] = usePropsAndStyle(props, {
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
  const staticConfig = opts?.forComponent?.staticConfig ?? Stack.staticConfig, [theme, themeState] = useThemeWithState({
    componentName: staticConfig.componentName,
    name: "theme" in props ? props.theme : void 0,
    inverse: "themeInverse" in props ? props.themeInverse : void 0,
    needsUpdate() {
      return !0;
    }
  }), componentContext = React.useContext(ComponentContext), groupContext = React.useContext(GroupContext), { state, disabled, setStateShallow } = useComponentState(
    props,
    componentContext.animationDriver,
    staticConfig,
    getConfig()
  ), mediaStateNow = opts?.noMedia ? (
    // not safe to use mediaState but really marginal to hit this
    mediaState
  ) : useMedia(), splitStyles = useSplitStyles(
    props,
    staticConfig,
    theme,
    themeState?.name || "",
    state,
    {
      isAnimated: !1,
      mediaState: mediaStateNow,
      noSkip: !0,
      noMergeStyle: !0,
      noClass: !0,
      resolveValues: "auto",
      ...opts
    },
    null,
    componentContext,
    groupContext
  ), { mediaGroups, pseudoGroups } = splitStyles || {};
  return useIsomorphicLayoutEffect(() => {
    if (!disabled) {
      if (state.unmounted) {
        setStateShallow({ unmounted: !1 });
        return;
      }
      if (groupContext)
        return subscribeToContextGroup({
          groupContext,
          setStateShallow,
          mediaGroups,
          pseudoGroups
        });
    }
  }, [
    disabled,
    groupContext,
    pseudoGroups ? Object.keys([...pseudoGroups]).join("") : 0,
    mediaGroups ? Object.keys([...mediaGroups]).join("") : 0
  ]), [
    splitStyles?.viewProps || {},
    splitStyles?.style || {},
    theme,
    mediaState
  ];
}
export {
  useProps,
  usePropsAndStyle,
  useStyle
};
//# sourceMappingURL=useProps.js.map
