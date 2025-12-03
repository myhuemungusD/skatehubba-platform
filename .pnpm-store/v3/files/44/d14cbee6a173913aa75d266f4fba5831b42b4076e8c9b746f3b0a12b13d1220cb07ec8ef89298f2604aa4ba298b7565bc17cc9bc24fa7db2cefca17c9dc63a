import { useComposedRefs } from "@tamagui/compose-refs";
import { isWeb } from "@tamagui/constants";
import { Slot, createStyledContext } from "@tamagui/core";
import React from "react";
import { jsx } from "react/jsx-runtime";
function createCollection(name) {
  const { Provider: CollectionProviderImpl, useStyledContext: useCollectionContext } = createStyledContext(
    {
      collectionRef: { current: void 0 },
      itemMap: /* @__PURE__ */ new Map()
    },
    "Toast"
  ), CollectionProvider = (props) => {
    const { scope, children } = props, ref = React.useRef(void 0), itemMap = React.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ jsx(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  };
  CollectionProvider.displayName = "CollectionProvider";
  const COLLECTION_SLOT_NAME = name + "CollectionSlot", CollectionSlot = React.forwardRef((props, forwardedRef) => {
    const { scope, children } = props, context = useCollectionContext(scope), composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
    return /* @__PURE__ */ jsx(Slot, { ref: composedRefs, children });
  });
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot", ITEM_DATA_ATTR = "data-collection-item", CollectionItemSlot = React.forwardRef((props, forwardedRef) => {
    const { scope, children, ...itemData } = props, ref = React.useRef(void 0), composedRefs = useComposedRefs(forwardedRef, ref), context = useCollectionContext(scope);
    return React.useEffect(() => (context.itemMap.set(ref, { ref, ...itemData }), () => void context.itemMap.delete(ref))), /* @__PURE__ */ jsx(Slot, { [ITEM_DATA_ATTR]: "", ref: composedRefs, children });
  });
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection(scope) {
    const context = useCollectionContext(scope);
    return React.useCallback(() => {
      if (!isWeb)
        return [];
      const collectionNode = context.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(
        collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`)
      );
      return Array.from(context.itemMap.values()).sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
    }, [context.collectionRef, context.itemMap]);
  }
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection
  ];
}
export {
  createCollection
};
//# sourceMappingURL=Collection.js.map
