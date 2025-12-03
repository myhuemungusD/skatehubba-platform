import { sizeToSpace } from "./utils";
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
}, spaces = Object.entries(size).map(([k, v]) => [k, sizeToSpace(v)]), spacesNegative = spaces.slice(1).map(([k, v]) => [`-${k.slice(1)}`, -v]), space = {
  ...Object.fromEntries(spaces),
  ...Object.fromEntries(spacesNegative)
}, zIndex = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500
}, radius = {
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
}, tokens = {
  radius,
  zIndex,
  space,
  size
};
export {
  radius,
  size,
  space,
  spaces,
  spacesNegative,
  tokens,
  zIndex
};
//# sourceMappingURL=v5-tokens.js.map
