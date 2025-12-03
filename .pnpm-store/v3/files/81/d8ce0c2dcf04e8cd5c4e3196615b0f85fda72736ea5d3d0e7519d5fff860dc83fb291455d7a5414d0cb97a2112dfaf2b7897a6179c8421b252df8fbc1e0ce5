var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var subscribeToContextGroup_exports = {};
__export(subscribeToContextGroup_exports, {
  subscribeToContextGroup: () => subscribeToContextGroup
});
module.exports = __toCommonJS(subscribeToContextGroup_exports);
var import_is_equal_shallow = require("@tamagui/is-equal-shallow"),
  import_useMedia = require("../hooks/useMedia.cjs");
const subscribeToContextGroup = props => {
    const {
      pseudoGroups,
      mediaGroups,
      groupContext
    } = props;
    if (pseudoGroups || mediaGroups) {
      process.env.NODE_ENV === "development" && !groupContext && console.debug("No context group found");
      const disposables = /* @__PURE__ */new Set();
      if (pseudoGroups) for (const name of [...pseudoGroups]) disposables.add(createGroupListener(name, props));
      if (mediaGroups) for (const name of [...mediaGroups]) disposables.add(createGroupListener(name, props));
      return () => {
        disposables.forEach(d => d());
      };
    }
  },
  createGroupListener = (name, {
    setStateShallow,
    pseudoGroups,
    mediaGroups,
    groupContext
  }) => {
    const parent = groupContext?.[name];
    if (!parent) return () => {};
    const dispose = parent.subscribe(({
      layout,
      pseudo
    }) => {
      setStateShallow(prev => {
        let didChange = !1;
        const group = prev.group?.[name] || {
          pseudo: {},
          media: {}
        };
        if (pseudo && pseudoGroups?.has(name)) group.pseudo ||= {}, (0, import_is_equal_shallow.mergeIfNotShallowEqual)(group.pseudo, pseudo) !== group.pseudo && (Object.assign(group.pseudo, pseudo), didChange = !0);else if (layout && mediaGroups) {
          group.media ||= {};
          const mediaState = (0, import_useMedia.getMediaState)(mediaGroups, layout),
            next = (0, import_is_equal_shallow.mergeIfNotShallowEqual)(group.media, mediaState);
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