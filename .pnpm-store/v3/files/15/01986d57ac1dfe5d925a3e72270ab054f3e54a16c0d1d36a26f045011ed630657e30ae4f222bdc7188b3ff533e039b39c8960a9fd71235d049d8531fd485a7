import { getTokenValue } from "@tamagui/web";
const getStackedZIndexProps = propsIn => ({
    stackZIndex: propsIn.stackZIndex,
    zIndex: resolveViewZIndex(propsIn.zIndex)
  }),
  resolveViewZIndex = zIndex => typeof zIndex > "u" || zIndex === "unset" ? void 0 : typeof zIndex == "number" ? zIndex : getTokenValue(zIndex, "zIndex");
export { getStackedZIndexProps, resolveViewZIndex };
//# sourceMappingURL=helpers.mjs.map
