import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getFontSize } from "@tamagui/font-size";
import { getFontSized } from "@tamagui/get-font-sized";
import { getSize, getSpace } from "@tamagui/get-token";
import { withStaticProperties } from "@tamagui/helpers";
import { useGetThemedIcon } from "@tamagui/helpers-tamagui";
import { ThemeableStack, YStack } from "@tamagui/stacks";
import { SizableText, wrapChildrenInText } from "@tamagui/text";
import { Spacer, getTokens, getVariableValue, styled, useProps } from "@tamagui/web";
var NAME = "ListItem",
  ListItemFrame = styled(ThemeableStack, {
    name: NAME,
    tag: "li",
    variants: {
      unstyled: {
        false: {
          size: "$true",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          width: "100%",
          borderColor: "$borderColor",
          maxWidth: "100%",
          overflow: "hidden",
          flexDirection: "row",
          backgroundColor: "$background",
          cursor: "default"
        }
      },
      size: {
        "...size": function (val, param) {
          var {
            tokens
          } = param;
          return {
            minHeight: tokens.size[val],
            paddingHorizontal: tokens.space[val],
            paddingVertical: getSpace(tokens.space[val], {
              shift: -4
            })
          };
        }
      },
      active: {
        true: {
          hoverStyle: {
            backgroundColor: "$background"
          }
        }
      },
      disabled: {
        true: {
          opacity: 0.5,
          // TODO breaking types
          pointerEvents: "none"
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  ListItemText = styled(SizableText, {
    name: "ListItemText",
    variants: {
      unstyled: {
        false: {
          color: "$color",
          size: "$true",
          flexGrow: 1,
          flexShrink: 1,
          ellipse: !0,
          cursor: "inherit"
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  ListItemSubtitle = styled(ListItemText, {
    name: "ListItemSubtitle",
    variants: {
      unstyled: {
        false: {
          opacity: 0.6,
          maxWidth: "100%",
          color: "$color"
        }
      },
      size: {
        "...size": function (val, extras) {
          var oneSmaller = getSize(val, {
              shift: -1,
              excludeHalfSteps: !0
            }),
            fontStyle = getFontSized(oneSmaller.key, extras);
          return fontStyle;
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  ListItemTitle = styled(ListItemText, {
    name: "ListItemTitle"
  }),
  useListItem = function (propsIn) {
    var {
        Text = ListItemText,
        Subtitle = ListItemSubtitle,
        Title = ListItemTitle
      } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        Text: ListItemText,
        Subtitle: ListItemSubtitle,
        Title: ListItemTitle
      },
      props = useProps(propsIn, {
        resolveValues: "none"
      }),
      {
        children,
        icon,
        iconAfter,
        noTextWrap,
        theme: themeName,
        space,
        spaceFlex,
        scaleIcon = 1,
        scaleSpace = 1,
        unstyled = !1,
        subTitle,
        title,
        // text props
        color,
        fontWeight,
        fontSize,
        fontFamily,
        letterSpacing,
        textAlign,
        ellipse,
        ...rest
      } = props,
      textProps = {
        color,
        fontWeight,
        fontSize,
        fontFamily,
        letterSpacing,
        textAlign,
        ellipse,
        children
      },
      size = props.size || "$true",
      iconSize = getFontSize(size) * scaleIcon,
      getThemedIcon = useGetThemedIcon({
        size: iconSize,
        color
      }),
      [themedIcon, themedIconAfter] = [icon, iconAfter].map(getThemedIcon),
      _getTokens_space_props_space,
      sizeToken = (_getTokens_space_props_space = getTokens().space[props.space]) !== null && _getTokens_space_props_space !== void 0 ? _getTokens_space_props_space : iconSize,
      spaceSize = getVariableValue(sizeToken) * scaleSpace,
      contents = wrapChildrenInText(Text, textProps);
    return {
      props: {
        ...rest,
        children: /* @__PURE__ */_jsxs(_Fragment, {
          children: [themedIcon ? /* @__PURE__ */_jsxs(_Fragment, {
            children: [themedIcon, /* @__PURE__ */_jsx(Spacer, {
              size: spaceSize
            })]
          }) : null, /* helper for common title/subtitle pttern */
          /* biome-ignore lint/complexity/noExtraBooleanCast: <explanation> */
          title || subTitle ? /* @__PURE__ */_jsxs(YStack, {
            flex: 1,
            children: [noTextWrap === "all" ? title : /* @__PURE__ */_jsx(Title, {
              size,
              children: title
            }), subTitle ? /* @__PURE__ */_jsx(_Fragment, {
              children: typeof subTitle == "string" && noTextWrap !== "all" ?
              // TODO can use theme but we need to standardize to alt themes
              // or standardize on subtle colors in themes
              /* @__PURE__ */
              _jsx(Subtitle, {
                unstyled,
                size,
                children: subTitle
              }) : subTitle
            }) : null, contents]
          }) : contents, themedIconAfter ? /* @__PURE__ */_jsxs(_Fragment, {
            children: [/* @__PURE__ */_jsx(Spacer, {
              size: spaceSize
            }), themedIconAfter]
          }) : null]
        })
      }
    };
  },
  ListItemComponent = ListItemFrame.styleable(function (props, ref) {
    var {
      props: listItemProps
    } = useListItem(props);
    return /* @__PURE__ */_jsx(ListItemFrame, {
      ref,
      ...listItemProps
    });
  }),
  ListItem2 = withStaticProperties(ListItemComponent, {
    Text: ListItemText,
    Subtitle: ListItemSubtitle,
    Title: ListItemTitle
  });
export { ListItem2 as ListItem, ListItemFrame, ListItemSubtitle, ListItemText, ListItemTitle, useListItem };
//# sourceMappingURL=ListItem.native.js.map
