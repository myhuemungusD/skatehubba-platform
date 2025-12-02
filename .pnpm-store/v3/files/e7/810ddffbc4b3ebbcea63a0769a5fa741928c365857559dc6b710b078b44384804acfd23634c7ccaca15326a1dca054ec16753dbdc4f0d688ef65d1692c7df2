Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const core = require('@sentry/core');
const debugBuild = require('../debug-build.js');

/**
 * Flushes pending Sentry events with a 2 second timeout and in a way that cannot create unhandled promise rejections.
 */
async function flushSafelyWithTimeout() {
  try {
    debugBuild.DEBUG_BUILD && core.debug.log('Flushing events...');
    await core.flush(2000);
    debugBuild.DEBUG_BUILD && core.debug.log('Done flushing events');
  } catch (e) {
    debugBuild.DEBUG_BUILD && core.debug.log('Error while flushing events:\n', e);
  }
}

exports.flushSafelyWithTimeout = flushSafelyWithTimeout;
//# sourceMappingURL=responseEnd.js.map
