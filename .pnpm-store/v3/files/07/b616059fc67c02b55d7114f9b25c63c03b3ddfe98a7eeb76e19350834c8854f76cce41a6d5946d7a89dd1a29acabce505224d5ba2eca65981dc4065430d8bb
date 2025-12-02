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
var Collection_exports = {};
__export(Collection_exports, {
  createCollection: () => createCollection
});
module.exports = __toCommonJS(Collection_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_compose_refs = require("@tamagui/compose-refs"),
  import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_react = __toESM(require("react"), 1);
function createCollection(name) {
  var {
      Provider: CollectionProviderImpl,
      useStyledContext: useCollectionContext
    } = (0, import_core.createStyledContext)({
      collectionRef: {
        current: void 0
      },
      itemMap: /* @__PURE__ */new Map()
    }, "Toast"),
    CollectionProvider = function (props) {
      var {
          scope,
          children
        } = props,
        ref = import_react.default.useRef(void 0),
        itemMap = import_react.default.useRef(/* @__PURE__ */new Map()).current;
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(CollectionProviderImpl, {
        scope,
        itemMap,
        collectionRef: ref,
        children
      });
    };
  CollectionProvider.displayName = "CollectionProvider";
  var COLLECTION_SLOT_NAME = name + "CollectionSlot",
    CollectionSlot = /* @__PURE__ */import_react.default.forwardRef(function (props, forwardedRef) {
      var {
          scope,
          children
        } = props,
        context = useCollectionContext(scope),
        composedRefs = (0, import_compose_refs.useComposedRefs)(forwardedRef, context.collectionRef);
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.Slot, {
        ref: composedRefs,
        children
      });
    });
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  var ITEM_SLOT_NAME = name + "CollectionItemSlot",
    ITEM_DATA_ATTR = "data-collection-item",
    CollectionItemSlot = /* @__PURE__ */import_react.default.forwardRef(function (props, forwardedRef) {
      var {
          scope,
          children,
          ...itemData
        } = props,
        ref = import_react.default.useRef(void 0),
        composedRefs = (0, import_compose_refs.useComposedRefs)(forwardedRef, ref),
        context = useCollectionContext(scope);
      return import_react.default.useEffect(function () {
        return context.itemMap.set(ref, {
          ref,
          ...itemData
        }), function () {
          return void context.itemMap.delete(ref);
        };
      }), /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.Slot, {
        [ITEM_DATA_ATTR]: "",
        ref: composedRefs,
        children
      });
    });
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection(scope) {
    var context = useCollectionContext(scope),
      getItems = import_react.default.useCallback(function () {
        if (!import_constants.isWeb) return [];
        var collectionNode = context.collectionRef.current;
        if (!collectionNode) return [];
        var orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`)),
          items = Array.from(context.itemMap.values()),
          orderedItems = items.sort(function (a, b) {
            return orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current);
          });
        return orderedItems;
      }, [context.collectionRef, context.itemMap]);
    return getItems;
  }
  return [{
    Provider: CollectionProvider,
    Slot: CollectionSlot,
    ItemSlot: CollectionItemSlot
  }, useCollection];
}
//# sourceMappingURL=Collection.native.js.map
