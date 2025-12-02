import { styled } from "@tamagui/core";
import { ThemeableStack, XStack, YStack } from "@tamagui/stacks";
import { SHEET_HANDLE_NAME, SHEET_NAME, SHEET_OVERLAY_NAME } from "./constants.mjs";
import { createSheet } from "./createSheet.mjs";
import { createSheetScope } from "./SheetContext.mjs";
export * from "./types.mjs";
const Handle = styled(XStack, {
    name: SHEET_HANDLE_NAME,
    variants: {
      open: {
        true: {
          opacity: 1,
          pointerEvents: "auto"
        },
        false: {
          opacity: 0,
          pointerEvents: "none"
        }
      },
      unstyled: {
        false: {
          height: 10,
          borderRadius: 100,
          backgroundColor: "$background",
          zIndex: 10,
          marginHorizontal: "35%",
          marginBottom: "$2",
          opacity: 0.5,
          hoverStyle: {
            opacity: 0.7
          }
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  Overlay = styled(ThemeableStack, {
    name: SHEET_OVERLAY_NAME,
    variants: {
      open: {
        true: {
          pointerEvents: "auto"
        },
        false: {
          pointerEvents: "none"
        }
      },
      unstyled: {
        false: {
          fullscreen: !0,
          position: "absolute",
          backgrounded: !0,
          zIndex: 99999,
          pointerEvents: "auto"
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  Frame = styled(YStack, {
    name: SHEET_NAME,
    variants: {
      unstyled: {
        false: {
          flex: 1,
          backgroundColor: "$background",
          borderTopLeftRadius: "$true",
          borderTopRightRadius: "$true",
          width: "100%",
          maxHeight: "100%",
          overflow: "hidden"
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  Sheet = createSheet({
    Frame,
    Handle,
    Overlay
  }),
  SheetOverlayFrame = Overlay,
  SheetHandleFrame = Handle;
export { Frame, Handle, Overlay, Sheet, SheetHandleFrame, SheetOverlayFrame, createSheetScope };
//# sourceMappingURL=Sheet.mjs.map
