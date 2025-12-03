import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
var MaxIndexContext = /* @__PURE__ */React.createContext([]),
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
  return /* @__PURE__ */_jsx(MaxIndexContext.Provider, {
    value: maxIndexPath,
    children: React.Children.map(children, function (child, index) {
      return /* @__PURE__ */React.isValidElement(child) ? /* @__PURE__ */_jsx(IndexContext.Provider, {
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
export { useIndex, useIndexedChildren };
//# sourceMappingURL=useIndexedChildren.native.js.map
