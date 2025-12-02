import { jsx as _jsx } from "react/jsx-runtime";
import { useComposedRefs } from "@tamagui/compose-refs";
import { isWeb } from "@tamagui/constants";
import { Slot, createStyledContext } from "@tamagui/core";
import React from "react";
function createCollection(name) {
  var {
      Provider: CollectionProviderImpl,
      useStyledContext: useCollectionContext
    } = createStyledContext({
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
        ref = React.useRef(void 0),
        itemMap = React.useRef(/* @__PURE__ */new Map()).current;
      return /* @__PURE__ */_jsx(CollectionProviderImpl, {
        scope,
        itemMap,
        collectionRef: ref,
        children
      });
    };
  CollectionProvider.displayName = "CollectionProvider";
  var COLLECTION_SLOT_NAME = name + "CollectionSlot",
    CollectionSlot = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
      var {
          scope,
          children
        } = props,
        context = useCollectionContext(scope),
        composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return /* @__PURE__ */_jsx(Slot, {
        ref: composedRefs,
        children
      });
    });
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  var ITEM_SLOT_NAME = name + "CollectionItemSlot",
    ITEM_DATA_ATTR = "data-collection-item",
    CollectionItemSlot = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
      var {
          scope,
          children,
          ...itemData
        } = props,
        ref = React.useRef(void 0),
        composedRefs = useComposedRefs(forwardedRef, ref),
        context = useCollectionContext(scope);
      return React.useEffect(function () {
        return context.itemMap.set(ref, {
          ref,
          ...itemData
        }), function () {
          return void context.itemMap.delete(ref);
        };
      }), /* @__PURE__ */_jsx(Slot, {
        [ITEM_DATA_ATTR]: "",
        ref: composedRefs,
        children
      });
    });
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection(scope) {
    var context = useCollectionContext(scope),
      getItems = React.useCallback(function () {
        if (!isWeb) return [];
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
export { createCollection };
//# sourceMappingURL=Collection.native.js.map
