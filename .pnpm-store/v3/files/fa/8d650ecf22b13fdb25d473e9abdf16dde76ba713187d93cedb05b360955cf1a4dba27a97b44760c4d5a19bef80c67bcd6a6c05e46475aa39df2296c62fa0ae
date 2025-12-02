import { AbortError } from "./errors.mjs";
import { sleep } from "./sleep.mjs";
const idleCb = typeof requestIdleCallback > "u" ? cb => setTimeout(cb, 1) : requestIdleCallback,
  idleAsync = () => new Promise(res => {
    idleCb(res);
  }),
  idle = async (signal, options) => {
    const {
        max,
        min,
        fully
      } = options || {},
      idleFn = fully ? fullyIdle : idleAsync;
    if (max && min && min < max ? await Promise.race([Promise.all([idleFn(), sleep(min)]), sleep(max)]) : max ? await Promise.race([idleFn(), sleep(max)]) : min ? await Promise.all([idleFn(), sleep(min)]) : await idleFn(), signal?.aborted) throw new AbortError();
  },
  fullyIdle = async signal => {
    for (;;) {
      const startTime = Date.now();
      if (await idle(signal), Date.now() - startTime < 15) break;
      if (signal?.aborted) throw new AbortError();
    }
  };
export { idle };
//# sourceMappingURL=idle.mjs.map
