import { setMeasurement, spanToJSON } from '@sentry/core';
import { logger, timestampInSeconds } from '@sentry/utils';
import { RN_GLOBAL_OBJ } from '../utils/worldwide';
export const defaultTransactionSource = 'component';
export const customTransactionSource = 'custom';
export const getBlankTransactionContext = (name) => {
    return {
        name: 'Route Change',
        op: 'navigation',
        tags: {
            'routing.instrumentation': name,
        },
        data: {},
        metadata: {
            source: defaultTransactionSource,
        },
    };
};
/**
 * A margin of error of 50ms is allowed for the async native bridge call.
 * Anything larger would reduce the accuracy of our frames measurements.
 */
export const MARGIN_OF_ERROR_SECONDS = 0.05;
const timeOriginMilliseconds = Date.now();
/**
 *
 */
export function adjustTransactionDuration(maxDurationMs, transaction, endTimestamp) {
    const diff = endTimestamp - transaction.startTimestamp;
    const isOutdatedTransaction = endTimestamp && (diff > maxDurationMs || diff < 0);
    if (isOutdatedTransaction) {
        transaction.setStatus('deadline_exceeded');
        transaction.setTag('maxTransactionDurationExceeded', 'true');
    }
}
/**
 * Returns the timestamp where the JS global scope was initialized.
 */
export function getTimeOriginMilliseconds() {
    return timeOriginMilliseconds;
}
/**
 * Calls the callback every time a child span of the transaction is finished.
 */
export function instrumentChildSpanFinish(transaction, callback) {
    if (transaction.spanRecorder) {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const originalAdd = transaction.spanRecorder.add;
        transaction.spanRecorder.add = (span) => {
            originalAdd.apply(transaction.spanRecorder, [span]);
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const originalSpanFinish = span.finish;
            span.finish = (endTimestamp) => {
                originalSpanFinish.apply(span, [endTimestamp]);
                callback(span, endTimestamp);
            };
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const originalSpanEnd = span.end;
            span.end = (endTimestamp) => {
                originalSpanEnd.apply(span, [endTimestamp]);
                callback(span, endTimestamp);
            };
        };
    }
}
/**
 * Determines if the timestamp is now or within the specified margin of error from now.
 */
export function isNearToNow(timestamp) {
    return Math.abs(timestampInSeconds() - timestamp) <= MARGIN_OF_ERROR_SECONDS;
}
/**
 * Sets the duration of the span as a measurement.
 * Uses `setMeasurement` function from @sentry/core.
 */
export function setSpanDurationAsMeasurement(name, span) {
    const { timestamp: spanEnd, start_timestamp: spanStart } = spanToJSON(span);
    if (!spanEnd || !spanStart) {
        return;
    }
    setMeasurement(name, (spanEnd - spanStart) * 1000, 'millisecond');
}
/**
 * Sets the duration of the span as a measurement.
 * Uses `setMeasurement` function from @sentry/core.
 */
export function setSpanDurationAsMeasurementOnTransaction(transaction, name, span) {
    const { timestamp: spanEnd, start_timestamp: spanStart } = spanToJSON(span);
    if (!spanEnd || !spanStart) {
        return;
    }
    transaction.setMeasurement(name, (spanEnd - spanStart) * 1000, 'millisecond');
}
/**
 * Returns unix timestamp in ms of the bundle start time.
 *
 * If not available, returns undefined.
 */
export function getBundleStartTimestampMs() {
    const bundleStartTime = RN_GLOBAL_OBJ.__BUNDLE_START_TIME__;
    if (!bundleStartTime) {
        logger.warn('Missing the bundle start time on the global object.');
        return undefined;
    }
    if (!RN_GLOBAL_OBJ.nativePerformanceNow) {
        // bundleStartTime is Date.now() in milliseconds
        return bundleStartTime;
    }
    // nativePerformanceNow() is monotonic clock like performance.now()
    const approxStartingTimeOrigin = Date.now() - RN_GLOBAL_OBJ.nativePerformanceNow();
    return approxStartingTimeOrigin + bundleStartTime;
}
//# sourceMappingURL=utils.js.map