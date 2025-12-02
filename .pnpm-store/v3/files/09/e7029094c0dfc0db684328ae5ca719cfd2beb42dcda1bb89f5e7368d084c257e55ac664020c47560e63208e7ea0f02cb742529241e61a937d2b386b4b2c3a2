var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var SelectItem_exports = {};
__export(SelectItem_exports, {
  SelectItem: () => SelectItem,
  SelectItemContextProvider: () => SelectItemContextProvider,
  useSelectItemContext: () => useSelectItemContext
});
module.exports = __toCommonJS(SelectItem_exports);
var import_compose_refs = require("@tamagui/compose-refs"), import_constants = require("@tamagui/constants"), import_list_item = require("@tamagui/list-item"), import_core = require("@tamagui/core"), React = __toESM(require("react"), 1), import_context = require("./context"), import_jsx_runtime = require("react/jsx-runtime");
const ITEM_NAME = "SelectItem", {
  Provider: SelectItemContextProvider,
  useStyledContext: useSelectItemContext
} = (0, import_core.createStyledContext)(null, ITEM_NAME), SelectItem = import_list_item.ListItemFrame.styleable(
  function(props, forwardedRef) {
    const {
      scope,
      value,
      disabled = !1,
      textValue: textValueProp,
      index,
      ...restProps
    } = props, { props: listItemProps } = (0, import_list_item.useListItem)({
      ...!props.unstyled && {
        ellipse: !0
      },
      ...restProps
    }), context = (0, import_context.useSelectItemParentContext)(scope), {
      setSelectedIndex,
      listRef,
      setOpen,
      onChange,
      activeIndexSubscribe,
      valueSubscribe,
      allowMouseUpRef,
      allowSelectRef,
      setValueAtIndex,
      selectTimeoutRef,
      dataRef,
      interactions,
      shouldRenderWebNative,
      size,
      onActiveChange,
      initialValue
    } = context, [isSelected, setSelected] = React.useState(initialValue === value);
    React.useEffect(() => activeIndexSubscribe((i) => {
      index === i && (onActiveChange(value, index), listRef?.current[index]?.focus());
    }), [index]), React.useEffect(() => valueSubscribe((val) => {
      setSelected(val === value);
    }), [value]);
    const textId = React.useId(), refCallback = React.useCallback((node) => {
      import_constants.isWeb && node instanceof HTMLElement && listRef && (listRef.current[index] = node);
    }, []), composedRefs = (0, import_compose_refs.useComposedRefs)(forwardedRef, refCallback);
    (0, import_constants.useIsomorphicLayoutEffect)(() => {
      setValueAtIndex(index, value);
    }, [index, setValueAtIndex, value]);
    function handleSelect() {
      setSelectedIndex(index), onChange(value), setOpen(!1);
    }
    const selectItemProps = React.useMemo(() => interactions ? interactions.getItemProps({
      onTouchMove() {
        allowSelectRef.current = !0, allowMouseUpRef.current = !1;
      },
      onTouchEnd() {
        allowSelectRef.current = !1, allowMouseUpRef.current = !0;
      },
      onKeyDown(event) {
        event.key === "Enter" || event.key === " " && !dataRef?.current.typing ? (event.preventDefault(), handleSelect()) : allowSelectRef.current = !0;
      },
      onClick() {
        allowSelectRef.current && handleSelect();
      },
      onMouseUp() {
        allowMouseUpRef.current && (allowSelectRef.current && handleSelect(), clearTimeout(selectTimeoutRef.current), selectTimeoutRef.current = setTimeout(() => {
          allowSelectRef.current = !0;
        }));
      }
    }) : {
      onPress: handleSelect
    }, [handleSelect]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      SelectItemContextProvider,
      {
        scope,
        value,
        textId: textId || "",
        isSelected,
        children: shouldRenderWebNative ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value, children: props.children }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_list_item.ListItemFrame,
          {
            tag: "div",
            componentName: ITEM_NAME,
            ref: composedRefs,
            "aria-labelledby": textId,
            "aria-selected": isSelected,
            "data-state": isSelected ? "active" : "inactive",
            "aria-disabled": disabled || void 0,
            "data-disabled": disabled ? "" : void 0,
            tabIndex: disabled ? void 0 : -1,
            ...!props.unstyled && {
              backgrounded: !0,
              pressTheme: !0,
              hoverTheme: !0,
              focusTheme: !0,
              cursor: "default",
              size,
              outlineOffset: -0.5,
              focusVisibleStyle: {
                outlineColor: "$outlineColor",
                outlineWidth: 1,
                outlineStyle: "solid"
              }
            },
            ...listItemProps,
            ...selectItemProps
          }
        )
      }
    );
  },
  {
    disableTheme: !0
  }
);
//# sourceMappingURL=SelectItem.js.map
