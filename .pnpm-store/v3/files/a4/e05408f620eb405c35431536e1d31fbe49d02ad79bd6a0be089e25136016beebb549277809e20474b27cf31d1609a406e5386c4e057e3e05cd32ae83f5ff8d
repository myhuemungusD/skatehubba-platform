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
var utils_exports = {};
__export(utils_exports, {
  canUseDOM: () => canUseDOM,
  getBoundingClientRect: () => getBoundingClientRect,
  getLowestCommonAncestor: () => getLowestCommonAncestor,
  getResponderPaths: () => getResponderPaths,
  hasTargetTouches: () => hasTargetTouches,
  hasValidSelection: () => hasValidSelection,
  isPrimaryPointerDown: () => isPrimaryPointerDown,
  isSelectionValid: () => isSelectionValid,
  setResponderId: () => setResponderId
});
module.exports = __toCommonJS(utils_exports);
var keyName = "__reactResponderId",
  canUseDOM = !!(typeof window < "u" && window.document && window.document.createElement),
  getBoundingClientRect = function (node) {
    if (node && node.nodeType === 1 && node.getBoundingClientRect) return node.getBoundingClientRect();
  };
function getEventPath(domEvent) {
  if (domEvent.type === "selectionchange") {
    var _window_getSelection,
      target = (_window_getSelection = window.getSelection()) === null || _window_getSelection === void 0 ? void 0 : _window_getSelection.anchorNode;
    return composedPathFallback(target);
  }
  var path = domEvent.composedPath != null ? domEvent.composedPath() : composedPathFallback(domEvent.target);
  return path;
}
function composedPathFallback(target) {
  for (var path = []; target != null && target !== document.body;) path.push(target), target = target.parentNode;
  return path;
}
function getResponderId(node) {
  return node != null ? node[keyName] : null;
}
function setResponderId(node, id) {
  node != null && (node[keyName] = id);
}
function getResponderPaths(domEvent) {
  for (var idPath = [], nodePath = [], eventPath = getEventPath(domEvent), i = 0; i < eventPath.length; i++) {
    var node = eventPath[i],
      id = getResponderId(node);
    id != null && (idPath.push(id), nodePath.push(node));
  }
  return {
    idPath,
    nodePath
  };
}
function getLowestCommonAncestor(pathA, pathB) {
  var pathALength = pathA.length,
    pathBLength = pathB.length;
  if (
  // If either path is empty
  pathALength === 0 || pathBLength === 0 ||
  // If the last elements aren't the same there can't be a common ancestor
  // that is connected to the responder system
  pathA[pathALength - 1] !== pathB[pathBLength - 1]) return null;
  var itemA = pathA[0],
    indexA = 0,
    itemB = pathB[0],
    indexB = 0;
  pathALength - pathBLength > 0 && (indexA = pathALength - pathBLength, itemA = pathA[indexA], pathALength = pathBLength), pathBLength - pathALength > 0 && (indexB = pathBLength - pathALength, itemB = pathB[indexB], pathBLength = pathALength);
  for (var depth = pathALength; depth--;) {
    if (itemA === itemB) return itemA;
    itemA = pathA[indexA++], itemB = pathB[indexB++];
  }
  return null;
}
function hasTargetTouches(target, touches) {
  if (!touches || touches.length === 0) return !1;
  for (var i = 0; i < touches.length; i++) {
    var node = touches[i].target;
    if (node != null && target.contains(node)) return !0;
  }
  return !1;
}
function hasValidSelection(domEvent) {
  return domEvent.type === "selectionchange" ? isSelectionValid() : domEvent.type === "select";
}
function isPrimaryPointerDown(domEvent) {
  var {
      altKey,
      button,
      buttons,
      ctrlKey,
      type
    } = domEvent,
    isTouch = type === "touchstart" || type === "touchmove",
    isPrimaryMouseDown = type === "mousedown" && (button === 0 || buttons === 1),
    isPrimaryMouseMove = type === "mousemove" && buttons === 1,
    noModifiers = altKey === !1 && ctrlKey === !1;
  return !!(isTouch || isPrimaryMouseDown && noModifiers || isPrimaryMouseMove && noModifiers);
}
function isSelectionValid() {
  var selection = window.getSelection();
  if (!selection) return !1;
  var string = selection.toString(),
    anchorNode = selection.anchorNode,
    focusNode = selection.focusNode,
    isTextNode = anchorNode && anchorNode.nodeType === window.Node.TEXT_NODE || focusNode && focusNode.nodeType === window.Node.TEXT_NODE;
  return string.length >= 1 && string !== `
` && !!isTextNode;
}
//# sourceMappingURL=utils.native.js.map
