import { useDidFinishSSR } from "@tamagui/use-did-finish-ssr";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { getThemeState } from "../hooks/useThemeState.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
let node;
function ThemeDebug({
  themeState,
  themeProps,
  children
}) {
  if (process.env.NODE_ENV === "development") {
    const isHydrated = useDidFinishSSR();
    if (process.env.NODE_ENV === "development" && typeof document < "u" && (node || (node = document.createElement("div"), node.style.height = "200px", node.style.overflowY = "scroll", node.style.position = "fixed", node.style.zIndex = 1e7, node.style.bottom = "30px", node.style.left = "30px", node.style.right = "30px", node.style.display = "flex", node.style.border = "1px solid #888", node.style.flexDirection = "row", node.style.background = "var(--background)")), useEffect(() => {
      document.body.appendChild(node);
    }, []), themeProps["disable-child-theme"] || !isHydrated) return children;
    const parentState = themeState.parentId ? getThemeState(themeState.parentId) : null;
    return /* @__PURE__ */jsxs(Fragment, {
      children: [createPortal(/* @__PURE__ */jsxs("code", {
        style: {
          whiteSpace: "pre",
          maxWidth: 250,
          overflow: "auto",
          padding: 5
        },
        children: ["<Theme ", themeState.id, " />\xA0", JSON.stringify({
          name: themeState.name,
          color1: themeState.theme.color1.val,
          parentId: themeState.parentId,
          inverses: themeState.inverses,
          isNew: themeState.isNew,
          themeProps: {
            name: themeProps.name,
            componentName: themeProps.componentName,
            reset: themeProps.reset,
            inverse: themeProps.inverse
          },
          parentState: {
            name: parentState?.name,
            isNew: parentState?.isNew
          }
        }, null, 2)]
      }), node), /* @__PURE__ */jsx("div", {
        style: {
          color: "red"
        },
        children: themeState.id
      }), children]
    });
  }
  return children;
}
ThemeDebug.displayName = "ThemeDebug";
export { ThemeDebug };
//# sourceMappingURL=ThemeDebug.mjs.map
