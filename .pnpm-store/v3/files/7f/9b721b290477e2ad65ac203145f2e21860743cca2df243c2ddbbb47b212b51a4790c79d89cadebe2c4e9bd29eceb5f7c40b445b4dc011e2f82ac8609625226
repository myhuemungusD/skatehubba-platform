import { _disableMediaTouch } from "../hooks/useMedia.mjs";
function log(...args) {
  if (process.env.NODE_ENV !== "production") {
    _disableMediaTouch(!0);
    try {
      return console.info(...args);
    } catch (err) {
      console.error(err);
    } finally {
      _disableMediaTouch(!1);
    }
  }
}
export { log };
//# sourceMappingURL=log.mjs.map
