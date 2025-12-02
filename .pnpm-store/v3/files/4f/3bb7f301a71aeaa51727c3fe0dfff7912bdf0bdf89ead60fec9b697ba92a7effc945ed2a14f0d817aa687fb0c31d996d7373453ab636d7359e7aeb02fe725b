import {
  blue,
  blueDark,
  gray,
  grayDark,
  green,
  greenDark,
  orange,
  orangeDark,
  pink,
  pinkDark,
  purple,
  purpleDark,
  red,
  redDark,
  yellow,
  yellowDark
} from "@tamagui/colors";
import { createTokens } from "@tamagui/web";
const size = {
  $0: 0,
  "$0.25": 2,
  "$0.5": 4,
  "$0.75": 8,
  $1: 20,
  "$1.5": 24,
  $2: 28,
  "$2.5": 32,
  $3: 36,
  "$3.5": 40,
  $4: 44,
  $true: 44,
  "$4.5": 48,
  $5: 52,
  $6: 64,
  $7: 74,
  $8: 84,
  $9: 94,
  $10: 104,
  $11: 124,
  $12: 144,
  $13: 164,
  $14: 184,
  $15: 204,
  $16: 224,
  $17: 224,
  $18: 244,
  $19: 264,
  $20: 284
}, spaces = Object.entries(size).map(([k, v]) => [k, sizeToSpace(v)]);
function sizeToSpace(v) {
  return v === 0 ? 0 : v === 2 ? 0.5 : v === 4 ? 1 : v === 8 ? 1.5 : v <= 16 ? Math.round(v * 0.333) : Math.floor(v * 0.7 - 12);
}
const spacesNegative = spaces.slice(1).map(([k, v]) => [`-${k.slice(1)}`, -v]), space = {
  ...Object.fromEntries(spaces),
  ...Object.fromEntries(spacesNegative)
}, zIndex = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500
}, colorTokens = {
  light: {
    blue,
    gray,
    green,
    orange,
    pink,
    purple,
    red,
    yellow
  },
  dark: {
    blue: blueDark,
    gray: grayDark,
    green: greenDark,
    orange: orangeDark,
    pink: pinkDark,
    purple: purpleDark,
    red: redDark,
    yellow: yellowDark
  }
}, darkColors = {
  ...colorTokens.dark.blue,
  ...colorTokens.dark.gray,
  ...colorTokens.dark.green,
  ...colorTokens.dark.orange,
  ...colorTokens.dark.pink,
  ...colorTokens.dark.purple,
  ...colorTokens.dark.red,
  ...colorTokens.dark.yellow
}, lightColors = {
  ...colorTokens.light.blue,
  ...colorTokens.light.gray,
  ...colorTokens.light.green,
  ...colorTokens.light.orange,
  ...colorTokens.light.pink,
  ...colorTokens.light.purple,
  ...colorTokens.light.red,
  ...colorTokens.light.yellow
}, color = {
  ...postfixObjKeys(lightColors, "Light"),
  ...postfixObjKeys(darkColors, "Dark")
};
function postfixObjKeys(obj, postfix) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [`${k}${postfix}`, v])
  );
}
const radius = {
  0: 0,
  1: 3,
  2: 5,
  3: 7,
  4: 9,
  true: 9,
  5: 10,
  6: 16,
  7: 19,
  8: 22,
  9: 26,
  10: 34,
  11: 42,
  12: 50
}, tokens = createTokens({
  color,
  radius,
  zIndex,
  space,
  size
});
export {
  color,
  colorTokens,
  darkColors,
  lightColors,
  radius,
  size,
  space,
  tokens,
  zIndex
};
//# sourceMappingURL=tokens.js.map
