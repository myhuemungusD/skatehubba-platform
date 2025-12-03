const THEME_NAME_SEPARATOR = "_", THEME_CLASSNAME_PREFIX = "t_", FONT_DATA_ATTRIBUTE_NAME = "data-tamagui-font", stackDefaultStyles = {}, webViewFlexCompatStyles = {
  display: "flex",
  alignItems: "stretch",
  flexDirection: "column",
  flexBasis: "auto",
  boxSizing: "border-box",
  position: process.env.TAMAGUI_POSITION_STATIC === "1" ? "static" : "relative",
  minHeight: 0,
  minWidth: 0,
  flexShrink: 0
};
Object.assign(stackDefaultStyles, webViewFlexCompatStyles);
const MISSING_THEME_MESSAGE = process.env.NODE_ENV === "development" ? `Can't find Tamagui configuration.
    
99% of the time this is due to having mis-matched versions of Tamagui dependencies.
Ensure that every "tamagui" and "@tamagui/*" dependency is pinned to exactly the same version.

We have a CLI tool to help check this: 

  npx @tamagui/cli check
` : "Missing theme.";
export {
  FONT_DATA_ATTRIBUTE_NAME,
  MISSING_THEME_MESSAGE,
  THEME_CLASSNAME_PREFIX,
  THEME_NAME_SEPARATOR,
  stackDefaultStyles,
  webViewFlexCompatStyles
};
//# sourceMappingURL=constants.js.map
