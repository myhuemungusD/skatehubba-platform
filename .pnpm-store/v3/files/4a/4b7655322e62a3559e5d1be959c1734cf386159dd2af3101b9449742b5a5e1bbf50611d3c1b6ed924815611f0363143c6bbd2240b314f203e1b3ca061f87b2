import { ThemeableStack } from "@tamagui/stacks";
import { createStyledContext, styled, withStaticProperties } from "@tamagui/web";
var CardContext = createStyledContext({
    size: "$true"
  }),
  CardFrame = styled(ThemeableStack, {
    name: "Card",
    context: CardContext,
    variants: {
      unstyled: {
        false: {
          size: "$true",
          backgroundColor: "$background",
          position: "relative"
        }
      },
      size: {
        "...size": function (val, param) {
          var {
              tokens
            } = param,
            _tokens_radius_val;
          return {
            borderRadius: (_tokens_radius_val = tokens.radius[val]) !== null && _tokens_radius_val !== void 0 ? _tokens_radius_val : val
          };
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  CardHeader = styled(ThemeableStack, {
    name: "CardHeader",
    context: CardContext,
    variants: {
      unstyled: {
        false: {
          zIndex: 10,
          backgroundColor: "transparent",
          marginBottom: "auto"
        }
      },
      size: {
        "...size": function (val, param) {
          var {
              tokens
            } = param,
            _tokens_space_val;
          return {
            padding: (_tokens_space_val = tokens.space[val]) !== null && _tokens_space_val !== void 0 ? _tokens_space_val : val
          };
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  CardFooter = styled(CardHeader, {
    name: "CardFooter",
    variants: {
      unstyled: {
        false: {
          zIndex: 5,
          flexDirection: "row",
          marginTop: "auto",
          marginBottom: 0
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  CardBackground = styled(ThemeableStack, {
    name: "CardBackground",
    variants: {
      unstyled: {
        false: {
          zIndex: 0,
          fullscreen: !0,
          overflow: "hidden",
          pointerEvents: "none",
          padding: 0
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  Card = withStaticProperties(CardFrame, {
    Header: CardHeader,
    Footer: CardFooter,
    Background: CardBackground
  });
export { Card, CardBackground, CardFooter, CardFrame, CardHeader };
//# sourceMappingURL=Card.native.js.map
