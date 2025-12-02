import { debug, flush } from '@sentry/core';
import { DEBUG_BUILD } from '../debug-build.js';

/**
 * Flushes pending Sentry events with a 2 second timeout and in a way that cannot create unhandled promise rejections.
 */
async function flushSafelyWithTimeout() {
  try {
    DEBUG_BUILD && debug.log('Flushing events...');
    await flush(2000);
    DEBUG_BUILD && debug.log('Done flushing events');
  } catch (e) {
    DEBUG_BUILD && debug.log('Error while flushing events:\n', e);
  }
}

export { flushSafelyWithTimeout };
//# sourceMappingURL=responseEnd.js.map
