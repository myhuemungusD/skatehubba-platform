import * as Helpers from "@tamagui/helpers";
import { getConfig } from "./config";
import { getAllRules, getAllSelectors } from "./helpers/insertStyleRule";
import { mediaState } from "./hooks/useMedia";
const Tamagui = (() => {
  if (process.env.NODE_ENV === "development") {
    class TamaguiManager {
      Helpers = Helpers;
      get mediaState() {
        return { ...mediaState };
      }
      get config() {
        return getConfig();
      }
      get insertedRules() {
        return getAllRules();
      }
      get allSelectors() {
        return getAllSelectors();
      }
      get identifierToValue() {
        return identifierToValue;
      }
    }
    return new TamaguiManager();
  }
})(), identifierToValue = /* @__PURE__ */ new Map(), getValueFromIdentifier = (identifier) => identifierToValue.get(identifier), setIdentifierValue = (identifier, value) => {
  identifierToValue.set(identifier, value);
};
export {
  Tamagui,
  getValueFromIdentifier,
  setIdentifierValue
};
//# sourceMappingURL=Tamagui.js.map
