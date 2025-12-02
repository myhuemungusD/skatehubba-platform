import { AbortError } from "./errors.native.js";
var sleep = async function (ms, signal) {
  if (await new Promise(function (res) {
    return setTimeout(res, ms);
  }), signal?.aborted) throw new AbortError();
};
export { sleep };
//# sourceMappingURL=sleep.native.js.map
