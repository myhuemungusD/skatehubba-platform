import { useEffect } from "react";
const canUseDOM = () => typeof window < "u" && !!window.document && !!window.document.createElement;
let refCount = 0,
  previousBodyStyle = null;
const useDisableBodyScroll = enabled => {
  useEffect(() => {
    if (!enabled || !canUseDOM()) return;
    const bodyEl = document.documentElement;
    return ++refCount === 1 && (previousBodyStyle = {
      scrollbarGutter: bodyEl.style.scrollbarGutter,
      overflow: bodyEl.style.overflow
    }, bodyEl.style.scrollbarGutter = "stable", bodyEl.style.overflow = "hidden"), () => {
      --refCount === 0 && previousBodyStyle && (Object.assign(bodyEl.style, previousBodyStyle), previousBodyStyle = null);
    };
  }, [enabled]);
};
export { useDisableBodyScroll };
//# sourceMappingURL=useDisableScroll.mjs.map
