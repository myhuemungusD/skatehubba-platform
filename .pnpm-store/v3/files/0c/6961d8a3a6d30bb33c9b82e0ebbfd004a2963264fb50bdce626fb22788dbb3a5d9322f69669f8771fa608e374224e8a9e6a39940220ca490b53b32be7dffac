import { __awaiter } from "tslib";
import { logger, timestampInSeconds } from '@sentry/utils';
import { NATIVE } from '../wrapper';
import { instrumentChildSpanFinish } from './utils';
/**
 * Timeout from the final native frames fetch to processing the associated transaction.
 * If the transaction is not processed by this time, the native frames will be dropped
 * and not added to the event.
 */
const FINAL_FRAMES_TIMEOUT_MS = 2000;
/** The listeners for each native frames response, keyed by traceId. This must be global to avoid closure issues and reading outdated values. */
const _framesListeners = new Map();
/** The native frames at the transaction finish time, keyed by traceId. This must be global to avoid closure issues and reading outdated values. */
const _finishFrames = new Map();
/**
 * A margin of error of 50ms is allowed for the async native bridge call.
 * Anything larger would reduce the accuracy of our frames measurements.
 */
const MARGIN_OF_ERROR_SECONDS = 0.05;
/**
 * Instrumentation to add native slow/frozen frames measurements onto transactions.
 */
export class NativeFramesInstrumentation {
    constructor(addGlobalEventProcessor, doesExist) {
        logger.log('[ReactNativeTracing] Native frames instrumentation initialized.');
        addGlobalEventProcessor(event => this._processEvent(event, doesExist));
    }
    /**
     * To be called when a transaction is started.
     * Logs the native frames at this start point and instruments child span finishes.
     */
    onTransactionStart(transaction) {
        logger.debug(`[NativeFrames] Fetching frames for root span start (${transaction.spanContext().spanId}).`);
        void NATIVE.fetchNativeFrames()
            .then(framesMetrics => {
            if (framesMetrics) {
                transaction.setData('__startFrames', framesMetrics);
            }
            else {
                logger.warn(`[NativeFrames] Fetched frames for root span start (${transaction.spanContext().spanId}), but no frames were returned.`);
            }
        })
            .then(undefined, error => {
            logger.error(`[NativeFrames] Error while fetching frames for root span start (${transaction.spanContext().spanId})`, error);
        });
        instrumentChildSpanFinish(transaction, (_, endTimestamp) => {
            if (!endTimestamp) {
                this._onSpanFinish();
            }
        });
    }
    /**
     * To be called when a transaction is finished
     */
    onTransactionFinish(transaction) {
        this._fetchEndFramesForTransaction(transaction).then(undefined, (reason) => {
            logger.error(`[NativeFrames] Error while fetching frames for root span start (${transaction.spanContext().spanId})`, reason);
        });
    }
    /**
     * Called on a span finish to fetch native frames to support transactions with trimEnd.
     * Only to be called when a span does not have an end timestamp.
     */
    _onSpanFinish() {
        const timestamp = timestampInSeconds();
        void NATIVE.fetchNativeFrames()
            .then(nativeFrames => {
            if (nativeFrames) {
                this._lastSpanFinishFrames = {
                    timestamp,
                    nativeFrames,
                };
            }
        })
            .then(undefined, error => {
            logger.error(`[NativeFrames] Error while fetching frames for child span end.`, error);
        });
    }
    /**
     * Returns the computed frames measurements and awaits for them if they are not ready yet.
     */
    _getFramesMeasurements(traceId, finalEndTimestamp, startFrames) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_finishFrames.has(traceId)) {
                logger.debug(`[NativeFrames] Native end frames already fetched for trace id (${traceId}).`);
                return this._prepareMeasurements(traceId, finalEndTimestamp, startFrames);
            }
            return new Promise(resolve => {
                const timeout = setTimeout(() => {
                    logger.debug(`[NativeFrames] Native end frames listener removed by timeout for trace id (${traceId}).`);
                    _framesListeners.delete(traceId);
                    resolve(null);
                }, 2000);
                _framesListeners.set(traceId, () => {
                    logger.debug(`[NativeFrames] Native end frames listener called for trace id (${traceId}).`);
                    resolve(this._prepareMeasurements(traceId, finalEndTimestamp, startFrames));
                    clearTimeout(timeout);
                    _framesListeners.delete(traceId);
                });
            });
        });
    }
    /**
     * Returns the computed frames measurements given ready data
     */
    _prepareMeasurements(traceId, finalEndTimestamp, // The actual transaction finish time.
    startFrames) {
        let finalFinishFrames;
        const finish = _finishFrames.get(traceId);
        if (finish &&
            finish.nativeFrames &&
            // Must be in the margin of error of the actual transaction finish time (finalEndTimestamp)
            Math.abs(finish.timestamp - finalEndTimestamp) < MARGIN_OF_ERROR_SECONDS) {
            logger.debug(`[NativeFrames] Using frames from root span end (traceId, ${traceId}).`);
            finalFinishFrames = finish.nativeFrames;
        }
        else if (this._lastSpanFinishFrames &&
            Math.abs(this._lastSpanFinishFrames.timestamp - finalEndTimestamp) < MARGIN_OF_ERROR_SECONDS) {
            // Fallback to the last span finish if it is within the margin of error of the actual finish timestamp.
            // This should be the case for trimEnd.
            logger.debug(`[NativeFrames] Using native frames from last span end (traceId, ${traceId}).`);
            finalFinishFrames = this._lastSpanFinishFrames.nativeFrames;
        }
        else {
            logger.warn(`[NativeFrames] Frames were collected within larger than margin of error delay for traceId (${traceId}). Dropping the inaccurate values.`);
            return null;
        }
        const measurements = {
            frames_total: {
                value: finalFinishFrames.totalFrames - startFrames.totalFrames,
                unit: 'none',
            },
            frames_frozen: {
                value: finalFinishFrames.frozenFrames - startFrames.frozenFrames,
                unit: 'none',
            },
            frames_slow: {
                value: finalFinishFrames.slowFrames - startFrames.slowFrames,
                unit: 'none',
            },
        };
        if (measurements.frames_frozen.value <= 0 &&
            measurements.frames_slow.value <= 0 &&
            measurements.frames_total.value <= 0) {
            logger.warn(`[NativeFrames] Detected zero slow or frozen frames. Not adding measurements to traceId (${traceId}).`);
            return null;
        }
        return measurements;
    }
    /**
     * Fetch finish frames for a transaction at the current time. Calls any awaiting listeners.
     */
    _fetchEndFramesForTransaction(transaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const startFrames = transaction.data.__startFrames;
            // This timestamp marks when the finish frames were retrieved. It should be pretty close to the transaction finish.
            const timestamp = timestampInSeconds();
            let finishFrames = null;
            if (startFrames) {
                finishFrames = yield NATIVE.fetchNativeFrames();
            }
            _finishFrames.set(transaction.traceId, {
                nativeFrames: finishFrames,
                timestamp,
            });
            (_a = _framesListeners.get(transaction.traceId)) === null || _a === void 0 ? void 0 : _a();
            setTimeout(() => this._cancelEndFrames(transaction), FINAL_FRAMES_TIMEOUT_MS);
        });
    }
    /**
     * On a finish frames failure, we cancel the await.
     */
    _cancelEndFrames(transaction) {
        if (_finishFrames.has(transaction.traceId)) {
            _finishFrames.delete(transaction.traceId);
            logger.log(`[NativeFrames] Native frames timed out for ${transaction.op} transaction ${transaction.name}. Not adding native frames measurements.`);
        }
    }
    /**
     * Adds frames measurements to an event. Called from a valid event processor.
     * Awaits for finish frames if needed.
     */
    _processEvent(event, doesExist) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!doesExist()) {
                return event;
            }
            if (event.type === 'transaction' && event.transaction && event.contexts && event.contexts.trace) {
                const traceContext = event.contexts.trace;
                const traceId = traceContext.trace_id;
                if (!((_a = traceContext.data) === null || _a === void 0 ? void 0 : _a.__startFrames)) {
                    logger.warn(`[NativeFrames] Start frames of transaction ${event.transaction} (eventId, ${event.event_id}) are missing, but it already ended.`);
                }
                if (traceId && ((_b = traceContext.data) === null || _b === void 0 ? void 0 : _b.__startFrames) && event.timestamp) {
                    const measurements = yield this._getFramesMeasurements(traceId, event.timestamp, traceContext.data.__startFrames);
                    if (measurements) {
                        logger.log(`[Measurements] Adding measurements to ${traceContext.op} transaction ${event.transaction}: ${JSON.stringify(measurements, undefined, 2)}`);
                        event.measurements = Object.assign(Object.assign({}, ((_c = event.measurements) !== null && _c !== void 0 ? _c : {})), measurements);
                        _finishFrames.delete(traceId);
                    }
                    delete traceContext.data.__startFrames;
                }
            }
            return event;
        });
    }
}
//# sourceMappingURL=nativeframes.js.map