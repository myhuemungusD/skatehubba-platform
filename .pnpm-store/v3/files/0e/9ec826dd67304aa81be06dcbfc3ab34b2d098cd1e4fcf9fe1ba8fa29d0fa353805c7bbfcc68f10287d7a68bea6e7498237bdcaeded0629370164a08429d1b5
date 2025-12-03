import { mergeIfNotShallowEqual } from "@tamagui/is-equal-shallow";
import { getMediaState } from "../hooks/useMedia";
const subscribeToContextGroup = (props) => {
  const { pseudoGroups, mediaGroups, groupContext } = props;
  if (pseudoGroups || mediaGroups) {
    process.env.NODE_ENV === "development" && !groupContext && console.debug("No context group found");
    const disposables = /* @__PURE__ */ new Set();
    if (pseudoGroups)
      for (const name of [...pseudoGroups])
        disposables.add(createGroupListener(name, props));
    if (mediaGroups)
      for (const name of [...mediaGroups])
        disposables.add(createGroupListener(name, props));
    return () => {
      disposables.forEach((d) => d());
    };
  }
}, createGroupListener = (name, {
  setStateShallow,
  pseudoGroups,
  mediaGroups,
  groupContext
}) => {
  const parent = groupContext?.[name];
  if (!parent)
    return () => {
    };
  const dispose = parent.subscribe(({ layout, pseudo }) => {
    setStateShallow((prev) => {
      let didChange = !1;
      const group = prev.group?.[name] || {
        pseudo: {},
        media: {}
      };
      if (pseudo && pseudoGroups?.has(name))
        group.pseudo ||= {}, mergeIfNotShallowEqual(group.pseudo, pseudo) !== group.pseudo && (Object.assign(group.pseudo, pseudo), didChange = !0);
      else if (layout && mediaGroups) {
        group.media ||= {};
        const mediaState = getMediaState(mediaGroups, layout), next = mergeIfNotShallowEqual(group.media, mediaState);
        next !== group.media && (Object.assign(group.media, next), didChange = !0);
      }
      return didChange ? {
        group: {
          ...prev.group,
          [name]: group
        }
      } : prev;
    });
  });
  return () => {
    dispose(), setStateShallow({
      group: {}
    });
  };
};
export {
  subscribeToContextGroup
};
//# sourceMappingURL=subscribeToContextGroup.js.map
