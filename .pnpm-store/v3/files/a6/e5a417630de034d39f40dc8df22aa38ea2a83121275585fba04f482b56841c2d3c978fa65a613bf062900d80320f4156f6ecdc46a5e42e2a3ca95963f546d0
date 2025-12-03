import { AbortError } from "./errors.native.js";
import { sleep } from "./sleep.native.js";
var idleCb = typeof requestIdleCallback > "u" ? function (cb) {
    return setTimeout(cb, 1);
  } : requestIdleCallback,
  idleAsync = function () {
    return new Promise(function (res) {
      idleCb(res);
    });
  },
  idle = async function (signal, options) {
    var {
        max,
        min,
        fully
      } = options || {},
      idleFn = fully ? fullyIdle : idleAsync;
    if (max && min && min < max ? await Promise.race([Promise.all([idleFn(), sleep(min)]), sleep(max)]) : max ? await Promise.race([idleFn(), sleep(max)]) : min ? await Promise.all([idleFn(), sleep(min)]) : await idleFn(), signal?.aborted) throw new AbortError();
  },
  fullyIdle = async function (signal) {
    for (;;) {
      var startTime = Date.now();
      await idle(signal);
      var endTime = Date.now(),
        duration = endTime - startTime;
      if (duration < 15) break;
      if (signal?.aborted) throw new AbortError();
    }
  };
export { idle };
//# sourceMappingURL=idle.native.js.map
