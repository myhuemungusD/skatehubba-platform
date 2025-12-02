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
var useIndexedChildren_exports = {};
__export(useIndexedChildren_exports, {
  useIndex: () => useIndex,
  useIndexedChildren: () => useIndexedChildren
});
module.exports = __toCommonJS(useIndexedChildren_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  React = __toESM(require("react"), 1),
  MaxIndexContext = /* @__PURE__ */React.createContext([]),
  IndexContext = /* @__PURE__ */React.createContext(null);
function useIndex() {
  var maxIndexPath = React.useContext(MaxIndexContext),
    indexPathString = React.useContext(IndexContext);
  return React.useMemo(function () {
    if (indexPathString === null) return null;
    var indexPath = parseIndexPath(indexPathString),
      maxIndex = maxIndexPath[maxIndexPath.length - 1],
      index = indexPath[indexPath.length - 1];
    return {
      maxIndex,
      maxIndexPath,
      index,
      indexPath,
      indexPathString,
      isFirst: index === 0,
      isLast: index === maxIndex,
      isEven: index % 2 === 0,
      isOdd: Math.abs(index % 2) === 1
    };
  }, [maxIndexPath, indexPathString]);
}
function useIndexedChildren(children) {
  var parentMaxIndexPath = React.useContext(MaxIndexContext),
    indexPathString = React.useContext(IndexContext),
    childrenCount = React.Children.count(children),
    maxIndexPath = React.useMemo(function () {
      return parentMaxIndexPath.concat(childrenCount - 1);
    }, [childrenCount]);
  return /* @__PURE__ */(0, import_jsx_runtime.jsx)(MaxIndexContext.Provider, {
    value: maxIndexPath,
    children: React.Children.map(children, function (child, index) {
      return /* @__PURE__ */React.isValidElement(child) ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(IndexContext.Provider, {
        value: indexPathString ? `${indexPathString}.${index.toString()}` : index.toString(),
        children: child
      }, child.key) : child;
    })
  });
}
function parseIndexPath(indexPathString) {
  return indexPathString.split(".").map(function (index) {
    return Number.parseInt(index, 10);
  });
}
//# sourceMappingURL=useIndexedChildren.native.js.map
