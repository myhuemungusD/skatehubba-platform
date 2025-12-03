var _loop = function (parent) {
    var _exec,
      _exec_index,
      prefix = parent.slice(0, (_exec_index = (_exec = /[A-Z]/.exec(parent)) === null || _exec === void 0 ? void 0 : _exec.index) !== null && _exec_index !== void 0 ? _exec_index : parent.length);
    expansionsNoPrefix[parent] = expansionsNoPrefix[parent].map(function (k) {
      return `${prefix}${k}`;
    });
  },
  resizeModeMap = {
    fill: "stretch",
    none: "center",
    "scale-down": "contain",
    contain: "contain",
    cover: "cover"
  },
  verticalAlignMap = {
    top: "top",
    middle: "center",
    bottom: "bottom",
    auto: "auto"
  },
  webToNativeDynamicExpansion = {
    objectFit: function (val) {
      var resizeMode = resizeModeMap[val] || "cover";
      return [["resizeMode", resizeMode]];
    },
    verticalAlign: function (val) {
      return [["textAlignVertical", verticalAlignMap[val] || "auto"]];
    }
  },
  vert = ["Top", "Bottom"],
  es = ["End", "Start"],
  t = ["Top"],
  b = ["Bottom"],
  s = ["Start"],
  e = ["End"],
  h = ["Height"],
  w = ["Width"],
  expansionsNoPrefix = {
    borderBlockColor: ["TopColor", "BottomColor"],
    borderInlineColor: ["EndColor", "StartColor"],
    borderBlockWidth: ["TopWidth", "BottomWidth"],
    borderInlineWidth: ["EndWidth", "StartWidth"],
    borderBlockStyle: ["TopStyle", "BottomStyle"],
    borderInlineStyle: ["EndStyle", "StartStyle"],
    marginBlock: vert,
    marginInline: es,
    paddingBlock: vert,
    paddingInline: es,
    borderBlockStartColor: ["TopColor"],
    borderBlockEndColor: ["BottomColor"],
    borderInlineStartColor: ["StartColor"],
    borderInlineEndColor: ["EndColor"],
    borderBlockStartWidth: ["TopWidth"],
    borderBlockEndWidth: ["BottomWidth"],
    borderInlineStartWidth: ["StartWidth"],
    borderInlineEndWidth: ["EndWidth"],
    borderBlockStartStyle: ["TopStyle"],
    borderBlockEndStyle: ["BottomStyle"],
    borderInlineStartStyle: ["StartStyle"],
    borderInlineEndStyle: ["EndStyle"],
    marginBlockStart: t,
    marginBlockEnd: b,
    marginInlineStart: s,
    marginInlineEnd: e,
    paddingBlockStart: t,
    paddingBlockEnd: b,
    paddingInlineStart: s,
    paddingInlineEnd: e,
    minBlockSize: h,
    maxBlockSize: h,
    minInlineSize: w,
    maxInlineSize: w
  };
for (var parent in expansionsNoPrefix) _loop(parent);
var expansions = {
    inset: ["top", "right", "bottom", "left"],
    insetBlock: ["top", "bottom"],
    insetBlockStart: ["top"],
    insetBlockEnd: ["bottom"],
    insetInlineStart: ["left"],
    insetInlineEnd: ["right"],
    blockSize: ["height"],
    inlineSize: ["width"]
  },
  webToNativeExpansion = Object.assign(expansionsNoPrefix, expansions);
export { webToNativeDynamicExpansion, webToNativeExpansion };
//# sourceMappingURL=webToNativeProps.native.js.map
