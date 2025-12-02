import { styled } from "@tamagui/core";
import { SizableStack, ThemeableStack } from "@tamagui/stacks";
import { getButtonSized } from "@tamagui/get-button-sized";
var TABS_NAME = "Tabs",
  DefaultTabsFrame = styled(SizableStack, {
    name: TABS_NAME
  }),
  TRIGGER_NAME = "TabsTrigger",
  DefaultTabsTabFrame = styled(ThemeableStack, {
    name: TRIGGER_NAME,
    tag: "button",
    variants: {
      size: {
        "...size": getButtonSized
      },
      disabled: {
        true: {
          pointerEvents: "none"
        }
      },
      unstyled: {
        false: {
          borderWidth: 0,
          backgroundColor: "$background",
          userSelect: "none",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexDirection: "row",
          cursor: "pointer",
          pressStyle: {
            backgroundColor: "$backgroundPress"
          },
          hoverStyle: {
            backgroundColor: "$backgroundHover"
          },
          focusStyle: {
            backgroundColor: "$backgroundFocus"
          }
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  CONTENT_NAME = "TabsContent",
  DefaultTabsContentFrame = styled(ThemeableStack, {
    name: CONTENT_NAME
  });
export { DefaultTabsContentFrame, DefaultTabsFrame, DefaultTabsTabFrame };
//# sourceMappingURL=Tabs.native.js.map
