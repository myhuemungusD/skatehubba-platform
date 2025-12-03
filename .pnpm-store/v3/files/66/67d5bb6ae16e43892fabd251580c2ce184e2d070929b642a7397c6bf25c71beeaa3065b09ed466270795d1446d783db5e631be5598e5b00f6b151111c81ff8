"use strict";

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
  import_useMedia = require("../hooks/useMedia.native.js"),
  subscribeToContextGroup = function (props) {
    var {
      pseudoGroups,
      mediaGroups,
      groupContext
    } = props;
    if (pseudoGroups || mediaGroups) {
      process.env.NODE_ENV === "development" && !groupContext && console.debug("No context group found");
      var disposables = /* @__PURE__ */new Set();
      if (pseudoGroups) for (var _i = 0, _iter = [...pseudoGroups]; _i < _iter.length; _i++) {
        var name = _iter[_i];
        disposables.add(createGroupListener(name, props));
      }
      if (mediaGroups) for (var _i1 = 0, _iter1 = [...mediaGroups]; _i1 < _iter1.length; _i1++) {
        var name1 = _iter1[_i1];
        disposables.add(createGroupListener(name1, props));
      }
      return function () {
        disposables.forEach(function (d) {
          return d();
        });
      };
    }
  },
  createGroupListener = function (name, param) {
    var {
        setStateShallow,
        pseudoGroups,
        mediaGroups,
        groupContext
      } = param,
      parent = groupContext?.[name];
    if (!parent) return function () {};
    var dispose = parent.subscribe(function (param2) {
      var {
        layout,
        pseudo
      } = param2;
      setStateShallow(function (prev) {
        var _prev_group,
          didChange = !1,
          group = ((_prev_group = prev.group) === null || _prev_group === void 0 ? void 0 : _prev_group[name]) || {
            pseudo: {},
            media: {}
          };
        if (pseudo && pseudoGroups?.has(name)) {
          var _group;
          (_group = group).pseudo || (_group.pseudo = {});
          var next = (0, import_is_equal_shallow.mergeIfNotShallowEqual)(group.pseudo, pseudo);
          next !== group.pseudo && (Object.assign(group.pseudo, pseudo), didChange = !0);
        } else if (layout && mediaGroups) {
          var _group1;
          (_group1 = group).media || (_group1.media = {});
          var mediaState = (0, import_useMedia.getMediaState)(mediaGroups, layout),
            next1 = (0, import_is_equal_shallow.mergeIfNotShallowEqual)(group.media, mediaState);
          next1 !== group.media && (Object.assign(group.media, next1), didChange = !0);
        }
        return didChange ? {
          group: {
            ...prev.group,
            [name]: group
          }
        } : prev;
      });
    });
    return function () {
      dispose(), setStateShallow({
        group: {}
      });
    };
  };
//# sourceMappingURL=subscribeToContextGroup.native.js.map
