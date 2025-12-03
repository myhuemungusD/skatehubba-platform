import * as React from "react";
import { jsx } from "react/jsx-runtime";
const MaxIndexContext = React.createContext([]),
  IndexContext = React.createContext(null);
function useIndex() {
  const maxIndexPath = React.useContext(MaxIndexContext),
    indexPathString = React.useContext(IndexContext);
  return React.useMemo(() => {
    if (indexPathString === null) return null;
    const indexPath = parseIndexPath(indexPathString),
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
  const parentMaxIndexPath = React.useContext(MaxIndexContext),
    indexPathString = React.useContext(IndexContext),
    childrenCount = React.Children.count(children),
    maxIndexPath = React.useMemo(() => parentMaxIndexPath.concat(childrenCount - 1), [childrenCount]);
  return /* @__PURE__ */jsx(MaxIndexContext.Provider, {
    value: maxIndexPath,
    children: React.Children.map(children, (child, index) => React.isValidElement(child) ? /* @__PURE__ */jsx(IndexContext.Provider, {
      value: indexPathString ? `${indexPathString}.${index.toString()}` : index.toString(),
      children: child
    }, child.key) : child)
  });
}
function parseIndexPath(indexPathString) {
  return indexPathString.split(".").map(index => Number.parseInt(index, 10));
}
export { useIndex, useIndexedChildren };
//# sourceMappingURL=useIndexedChildren.mjs.map
