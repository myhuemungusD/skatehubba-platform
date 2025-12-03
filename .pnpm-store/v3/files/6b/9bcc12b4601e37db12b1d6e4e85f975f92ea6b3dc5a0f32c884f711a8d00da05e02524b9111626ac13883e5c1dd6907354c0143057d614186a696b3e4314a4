"use strict";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var Label_exports = {};
__export(Label_exports, {
  Label: () => Label,
  LabelFrame: () => LabelFrame,
  useLabelContext: () => useLabelContext
});
module.exports = __toCommonJS(Label_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_compose_refs = require("@tamagui/compose-refs"),
  import_constants = require("@tamagui/constants"),
  import_create_context = require("@tamagui/create-context"),
  import_focusable = require("@tamagui/focusable"),
  import_get_button_sized = require("@tamagui/get-button-sized"),
  import_get_font_sized = require("@tamagui/get-font-sized"),
  import_text = require("@tamagui/text"),
  import_web = require("@tamagui/web"),
  React = __toESM(require("react"), 1),
  NAME = "Label",
  [LabelProvider, useLabelContextImpl] = (0, import_create_context.createContext)(NAME, {
    id: void 0,
    controlRef: {
      current: null
    }
  }),
  LabelFrame = (0, import_web.styled)(import_text.SizableText, {
    name: "Label",
    tag: "label",
    variants: {
      unstyled: {
        false: {
          size: "$true",
          color: "$color",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          userSelect: "none",
          cursor: "default",
          pressStyle: {
            color: "$colorPress"
          }
        }
      },
      size: {
        "...size": function (val, extras) {
          var buttonStyle = (0, import_get_button_sized.getButtonSized)(val, extras),
            buttonHeight = buttonStyle?.height,
            fontStyle = (0, import_get_font_sized.getFontSized)(val, extras);
          return {
            ...fontStyle,
            lineHeight: buttonHeight ? extras.tokens.size[buttonHeight] : void 0
          };
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  LabelComponent = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        htmlFor,
        id: idProp,
        ...labelProps
      } = props,
      controlRef = React.useRef(null),
      ref = React.useRef(null),
      composedRefs = (0, import_compose_refs.useComposedRefs)(forwardedRef, ref),
      backupId = React.useId(),
      id = idProp ?? backupId;
    return import_constants.isWeb && React.useEffect(function () {
      if (htmlFor) {
        var element = document.getElementById(htmlFor),
          label = ref.current;
        if (label && element) {
          var getAriaLabel = function () {
              return element.getAttribute("aria-labelledby");
            },
            ariaLabelledBy = [id, getAriaLabel()].filter(Boolean).join(" ");
          return element.setAttribute("aria-labelledby", ariaLabelledBy), controlRef.current = element, function () {
            var _getAriaLabel;
            if (id) {
              var ariaLabelledBy2 = (_getAriaLabel = getAriaLabel()) === null || _getAriaLabel === void 0 ? void 0 : _getAriaLabel.replace(id, "");
              ariaLabelledBy2 === "" ? element.removeAttribute("aria-labelledby") : ariaLabelledBy2 && element.setAttribute("aria-labelledby", ariaLabelledBy2);
            }
          };
        }
      }
    }, [id, htmlFor]), /* @__PURE__ */(0, import_jsx_runtime.jsx)(LabelProvider, {
      id,
      controlRef,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(LabelFrame, {
        id,
        // @ts-ignore
        htmlFor,
        ...labelProps,
        ref: composedRefs,
        onMouseDown: function (event) {
          var _props_onMouseDown;
          (_props_onMouseDown = props.onMouseDown) === null || _props_onMouseDown === void 0 || _props_onMouseDown.call(props, event), !event.defaultPrevented && event.detail > 1 && event.preventDefault();
        },
        onPress: function (event) {
          var _props_onPress;
          if ((_props_onPress = props.onPress) === null || _props_onPress === void 0 || _props_onPress.call(props, event), import_constants.isWeb) {
            if (htmlFor || !controlRef.current || event.defaultPrevented) return;
            var isClickingControl = controlRef.current.contains(event.target),
              isUserClick = event.isTrusted === !0;
            !isClickingControl && isUserClick && (controlRef.current.click(), controlRef.current.focus());
          } else props.htmlFor && (0, import_focusable.focusFocusable)(props.htmlFor);
        }
      })
    });
  });
LabelComponent.displayName = NAME;
var Label = LabelFrame.extractable((0, import_web.themeable)(LabelComponent)),
  useLabelContext = function (element) {
    var context = useLabelContextImpl("LabelConsumer"),
      {
        controlRef
      } = context;
    return React.useEffect(function () {
      element && (controlRef.current = element);
    }, [element, controlRef]), context.id;
  };
//# sourceMappingURL=Label.native.js.map
