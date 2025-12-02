import React from "react";
function createOptimizedView(children, viewProps, baseViews) {
  var _viewProps_style,
    TextAncestor = baseViews.TextAncestor,
    {
      accessibilityElementsHidden,
      accessibilityLabel,
      accessibilityLabelledBy,
      accessibilityLiveRegion,
      accessibilityState,
      accessibilityValue,
      "aria-busy": ariaBusy,
      "aria-checked": ariaChecked,
      "aria-disabled": ariaDisabled,
      "aria-expanded": ariaExpanded,
      "aria-hidden": ariaHidden,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-live": ariaLive,
      "aria-selected": ariaSelected,
      "aria-valuemax": ariaValueMax,
      "aria-valuemin": ariaValueMin,
      "aria-valuenow": ariaValueNow,
      "aria-valuetext": ariaValueText,
      focusable,
      id,
      role,
      tabIndex
    } =
    // ...otherProps
    viewProps,
    _ariaLabelledBy_split,
    _accessibilityLabelledBy = (_ariaLabelledBy_split = ariaLabelledBy?.split(/\s*,\s*/g)) !== null && _ariaLabelledBy_split !== void 0 ? _ariaLabelledBy_split : accessibilityLabelledBy,
    _accessibilityState;
  (accessibilityState != null || ariaBusy != null || ariaChecked != null || ariaDisabled != null || ariaExpanded != null || ariaSelected != null) && (_accessibilityState = {
    busy: ariaBusy ?? accessibilityState?.busy,
    checked: ariaChecked ?? accessibilityState?.checked,
    disabled: ariaDisabled ?? accessibilityState?.disabled,
    expanded: ariaExpanded ?? accessibilityState?.expanded,
    selected: ariaSelected ?? accessibilityState?.selected
  });
  var _accessibilityValue;
  if ((accessibilityValue != null || ariaValueMax != null || ariaValueMin != null || ariaValueNow != null || ariaValueText != null) && (_accessibilityValue = {
    max: ariaValueMax ?? accessibilityValue?.max,
    min: ariaValueMin ?? accessibilityValue?.min,
    now: ariaValueNow ?? accessibilityValue?.now,
    text: ariaValueText ?? accessibilityValue?.text
  }), !((_viewProps_style = viewProps.style) === null || _viewProps_style === void 0) && _viewProps_style.pointerEvents) {
    var _viewProps_style1;
    viewProps.pointerEvents = (_viewProps_style1 = viewProps.style) === null || _viewProps_style1 === void 0 ? void 0 : _viewProps_style1.pointerEvents;
  }
  if (id && (viewProps.nativeID = id), ariaHidden === !0 && (viewProps.importantForAccessibility = "no-hide-descendants"), _accessibilityValue && (viewProps.accessibilityValue = _accessibilityValue), role && (viewProps.accessibilityRole = getAccessibilityRoleFromRole(role)), ariaLive === "off") viewProps.accessibilityLiveRegion = "none";else {
    var alr = ariaLive ?? accessibilityLiveRegion;
    alr && (viewProps.accessibilityLiveRegion = alr);
  }
  var al = ariaLabel ?? accessibilityLabel;
  al && (viewProps.accessibilityLabel = al);
  var f = tabIndex !== void 0 ? !tabIndex : focusable;
  f != null && (viewProps.focusable = f), _accessibilityState != null && (viewProps.accessibilityState = _accessibilityState);
  var ah = ariaHidden ?? accessibilityElementsHidden;
  ah != null && (viewProps.accessibilityElementsHidden = ah), _accessibilityLabelledBy && (viewProps.accessibilityLabelledBy = _accessibilityLabelledBy);
  var isInText = React.useContext(TextAncestor),
    finalElement = /* @__PURE__ */React.createElement("RCTView", viewProps, children);
  return isInText ? /* @__PURE__ */React.createElement(TextAncestor.Provider, {
    value: !1
  }, finalElement) : finalElement;
}
function getAccessibilityRoleFromRole(role) {
  switch (role) {
    case "alert":
      return "alert";
    case "alertdialog":
      return;
    case "application":
      return;
    case "article":
      return;
    case "banner":
      return;
    case "button":
      return "button";
    case "cell":
      return;
    case "checkbox":
      return "checkbox";
    case "columnheader":
      return;
    case "combobox":
      return "combobox";
    case "complementary":
      return;
    case "contentinfo":
      return;
    case "definition":
      return;
    case "dialog":
      return;
    case "directory":
      return;
    case "document":
      return;
    case "feed":
      return;
    case "figure":
      return;
    case "form":
      return;
    case "grid":
      return "grid";
    case "group":
      return;
    case "heading":
      return "header";
    case "img":
      return "image";
    case "link":
      return "link";
    case "list":
      return "list";
    case "listitem":
      return;
    case "log":
      return;
    case "main":
      return;
    case "marquee":
      return;
    case "math":
      return;
    case "menu":
      return "menu";
    case "menubar":
      return "menubar";
    case "menuitem":
      return "menuitem";
    case "meter":
      return;
    case "navigation":
      return;
    case "none":
      return "none";
    case "note":
      return;
    case "option":
      return;
    case "presentation":
      return "none";
    case "progressbar":
      return "progressbar";
    case "radio":
      return "radio";
    case "radiogroup":
      return "radiogroup";
    case "region":
      return;
    case "row":
      return;
    case "rowgroup":
      return;
    case "rowheader":
      return;
    case "scrollbar":
      return "scrollbar";
    case "searchbox":
      return "search";
    case "separator":
      return;
    case "slider":
      return "adjustable";
    case "spinbutton":
      return "spinbutton";
    case "status":
      return;
    case "summary":
      return "summary";
    case "switch":
      return "switch";
    case "tab":
      return "tab";
    case "table":
      return;
    case "tablist":
      return "tablist";
    case "tabpanel":
      return;
    case "term":
      return;
    case "timer":
      return "timer";
    case "toolbar":
      return "toolbar";
    case "tooltip":
      return;
    case "tree":
      return;
    case "treegrid":
      return;
    case "treeitem":
      return;
  }
}
export { createOptimizedView, getAccessibilityRoleFromRole };
//# sourceMappingURL=createOptimizedView.native.js.map
