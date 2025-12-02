import { useEffect } from "react";
var canUseDOM = function () {
    return typeof window < "u" && !!window.document && !!window.document.createElement;
  },
  refCount = 0,
  previousBodyStyle = null,
  useDisableBodyScroll = function (enabled) {
    useEffect(function () {
      if (!(!enabled || !canUseDOM())) {
        var bodyEl = document.documentElement;
        return ++refCount === 1 && (previousBodyStyle = {
          scrollbarGutter: bodyEl.style.scrollbarGutter,
          overflow: bodyEl.style.overflow
        }, bodyEl.style.scrollbarGutter = "stable", bodyEl.style.overflow = "hidden"), function () {
          --refCount === 0 && previousBodyStyle && (Object.assign(bodyEl.style, previousBodyStyle), previousBodyStyle = null);
        };
      }
    }, [enabled]);
  };
export { useDisableBodyScroll };
//# sourceMappingURL=useDisableScroll.native.js.map
