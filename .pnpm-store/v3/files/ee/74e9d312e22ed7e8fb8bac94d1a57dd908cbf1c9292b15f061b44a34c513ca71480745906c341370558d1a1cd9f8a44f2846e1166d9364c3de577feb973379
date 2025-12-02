var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var ThemeDebug_exports = {};
__export(ThemeDebug_exports, {
  ThemeDebug: () => ThemeDebug
});
module.exports = __toCommonJS(ThemeDebug_exports);
var import_use_did_finish_ssr = require("@tamagui/use-did-finish-ssr"), import_react = require("react"), import_react_dom = require("react-dom"), import_useThemeState = require("../hooks/useThemeState"), import_jsx_runtime = require("react/jsx-runtime");
let node;
function ThemeDebug({
  themeState,
  themeProps,
  children
}) {
  if (process.env.NODE_ENV === "development") {
    const isHydrated = (0, import_use_did_finish_ssr.useDidFinishSSR)();
    if (process.env.NODE_ENV === "development" && typeof document < "u" && (node || (node = document.createElement("div"), node.style.height = "200px", node.style.overflowY = "scroll", node.style.position = "fixed", node.style.zIndex = 1e7, node.style.bottom = "30px", node.style.left = "30px", node.style.right = "30px", node.style.display = "flex", node.style.border = "1px solid #888", node.style.flexDirection = "row", node.style.background = "var(--background)")), (0, import_react.useEffect)(() => {
      document.body.appendChild(node);
    }, []), themeProps["disable-child-theme"] || !isHydrated)
      return children;
    const parentState = themeState.parentId ? (0, import_useThemeState.getThemeState)(themeState.parentId) : null;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      (0, import_react_dom.createPortal)(
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "code",
          {
            style: {
              whiteSpace: "pre",
              maxWidth: 250,
              overflow: "auto",
              padding: 5
            },
            children: [
              "<Theme ",
              themeState.id,
              " />\xA0",
              JSON.stringify(
                {
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
                },
                null,
                2
              )
            ]
          }
        ),
        node
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { color: "red" }, children: themeState.id }),
      children
    ] });
  }
  return children;
}
ThemeDebug.displayName = "ThemeDebug";
//# sourceMappingURL=ThemeDebug.js.map
