"use strict";
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchInstrumentation = void 0;
const api = require("@opentelemetry/api");
const instrumentation_1 = require("@opentelemetry/instrumentation");
const core = require("@opentelemetry/core");
const web = require("@opentelemetry/sdk-trace-web");
const AttributeNames_1 = require("./enums/AttributeNames");
const semconv_1 = require("../src/semconv");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const utils_1 = require("./utils");
const version_1 = require("./version");
const core_1 = require("@opentelemetry/core");
// how long to wait for observer to collect information about resources
// this is needed as event "load" is called before observer
// hard to say how long it should really wait, seems like 300ms is
// safe enough
const OBSERVER_WAIT_TIME_MS = 300;
const isNode = typeof process === 'object' && process.release?.name === 'node';
/**
 * This class represents a fetch plugin for auto instrumentation
 */
class FetchInstrumentation extends instrumentation_1.InstrumentationBase {
    component = 'fetch';
    version = version_1.VERSION;
    moduleName = this.component;
    _usedResources = new WeakSet();
    _tasksCount = 0;
    _semconvStability;
    constructor(config = {}) {
        super('@opentelemetry/instrumentation-fetch', version_1.VERSION, config);
        this._semconvStability = (0, instrumentation_1.semconvStabilityFromStr)('http', config?.semconvStabilityOptIn);
    }
    init() { }
    /**
     * Add cors pre flight child span
     * @param span
     * @param corsPreFlightRequest
     */
    _addChildSpan(span, corsPreFlightRequest) {
        const childSpan = this.tracer.startSpan('CORS Preflight', {
            startTime: corsPreFlightRequest[web.PerformanceTimingNames.FETCH_START],
        }, api.trace.setSpan(api.context.active(), span));
        const skipOldSemconvContentLengthAttrs = !(this._semconvStability & instrumentation_1.SemconvStability.OLD);
        web.addSpanNetworkEvents(childSpan, corsPreFlightRequest, this.getConfig().ignoreNetworkEvents, undefined, skipOldSemconvContentLengthAttrs);
        childSpan.end(corsPreFlightRequest[web.PerformanceTimingNames.RESPONSE_END]);
    }
    /**
     * Adds more attributes to span just before ending it
     * @param span
     * @param response
     */
    _addFinalSpanAttributes(span, response) {
        const parsedUrl = web.parseUrl(response.url);
        if (this._semconvStability & instrumentation_1.SemconvStability.OLD) {
            span.setAttribute(semconv_1.ATTR_HTTP_STATUS_CODE, response.status);
            if (response.statusText != null) {
                span.setAttribute(AttributeNames_1.AttributeNames.HTTP_STATUS_TEXT, response.statusText);
            }
            span.setAttribute(semconv_1.ATTR_HTTP_HOST, parsedUrl.host);
            span.setAttribute(semconv_1.ATTR_HTTP_SCHEME, parsedUrl.protocol.replace(':', ''));
            if (typeof navigator !== 'undefined') {
                span.setAttribute(semconv_1.ATTR_HTTP_USER_AGENT, navigator.userAgent);
            }
        }
        if (this._semconvStability & instrumentation_1.SemconvStability.STABLE) {
            span.setAttribute(semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE, response.status);
            // TODO: Set server.{address,port} at span creation for sampling decisions
            // (a "SHOULD" requirement in semconv).
            span.setAttribute(semantic_conventions_1.ATTR_SERVER_ADDRESS, parsedUrl.hostname);
            const serverPort = (0, utils_1.serverPortFromUrl)(parsedUrl);
            if (serverPort) {
                span.setAttribute(semantic_conventions_1.ATTR_SERVER_PORT, serverPort);
            }
        }
    }
    /**
     * Add headers
     * @param options
     * @param spanUrl
     */
    _addHeaders(options, spanUrl) {
        if (!web.shouldPropagateTraceHeaders(spanUrl, this.getConfig().propagateTraceHeaderCorsUrls)) {
            const headers = {};
            api.propagation.inject(api.context.active(), headers);
            if (Object.keys(headers).length > 0) {
                this._diag.debug('headers inject skipped due to CORS policy');
            }
            return;
        }
        if (options instanceof Request) {
            api.propagation.inject(api.context.active(), options.headers, {
                set: (h, k, v) => h.set(k, typeof v === 'string' ? v : String(v)),
            });
        }
        else if (options.headers instanceof Headers) {
            api.propagation.inject(api.context.active(), options.headers, {
                set: (h, k, v) => h.set(k, typeof v === 'string' ? v : String(v)),
            });
        }
        else if (options.headers instanceof Map) {
            api.propagation.inject(api.context.active(), options.headers, {
                set: (h, k, v) => h.set(k, typeof v === 'string' ? v : String(v)),
            });
        }
        else {
            const headers = {};
            api.propagation.inject(api.context.active(), headers);
            options.headers = Object.assign({}, headers, options.headers || {});
        }
    }
    /**
     * Clears the resource timings and all resources assigned with spans
     *     when {@link FetchPluginConfig.clearTimingResources} is
     *     set to true (default false)
     * @private
     */
    _clearResources() {
        if (this._tasksCount === 0 && this.getConfig().clearTimingResources) {
            performance.clearResourceTimings();
            this._usedResources = new WeakSet();
        }
    }
    /**
     * Creates a new span
     * @param url
     * @param options
     */
    _createSpan(url, options = {}) {
        if (core.isUrlIgnored(url, this.getConfig().ignoreUrls)) {
            this._diag.debug('ignoring span as url matches ignored url');
            return;
        }
        let name = '';
        const attributes = {};
        if (this._semconvStability & instrumentation_1.SemconvStability.OLD) {
            const method = (options.method || 'GET').toUpperCase();
            name = `HTTP ${method}`;
            attributes[AttributeNames_1.AttributeNames.COMPONENT] = this.moduleName;
            attributes[semconv_1.ATTR_HTTP_METHOD] = method;
            attributes[semconv_1.ATTR_HTTP_URL] = url;
        }
        if (this._semconvStability & instrumentation_1.SemconvStability.STABLE) {
            const origMethod = options.method;
            const normMethod = (0, utils_1.normalizeHttpRequestMethod)(options.method || 'GET');
            if (!name) {
                // The "old" span name wins if emitting both old and stable semconv
                // ('http/dup').
                name = normMethod;
            }
            attributes[semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD] = normMethod;
            if (normMethod !== origMethod) {
                attributes[semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD_ORIGINAL] = origMethod;
            }
            attributes[semantic_conventions_1.ATTR_URL_FULL] = url;
        }
        return this.tracer.startSpan(name, {
            kind: api.SpanKind.CLIENT,
            attributes,
        });
    }
    /**
     * Finds appropriate resource and add network events to the span
     * @param span
     * @param resourcesObserver
     * @param endTime
     */
    _findResourceAndAddNetworkEvents(span, resourcesObserver, endTime) {
        let resources = resourcesObserver.entries;
        if (!resources.length) {
            if (!performance.getEntriesByType) {
                return;
            }
            // fallback - either Observer is not available or it took longer
            // then OBSERVER_WAIT_TIME_MS and observer didn't collect enough
            // information
            resources = performance.getEntriesByType('resource');
        }
        const resource = web.getResource(resourcesObserver.spanUrl, resourcesObserver.startTime, endTime, resources, this._usedResources, 'fetch');
        if (resource.mainRequest) {
            const mainRequest = resource.mainRequest;
            this._markResourceAsUsed(mainRequest);
            const corsPreFlightRequest = resource.corsPreFlightRequest;
            if (corsPreFlightRequest) {
                this._addChildSpan(span, corsPreFlightRequest);
                this._markResourceAsUsed(corsPreFlightRequest);
            }
            const skipOldSemconvContentLengthAttrs = !(this._semconvStability & instrumentation_1.SemconvStability.OLD);
            web.addSpanNetworkEvents(span, mainRequest, this.getConfig().ignoreNetworkEvents, undefined, skipOldSemconvContentLengthAttrs);
        }
    }
    /**
     * Marks certain [resource]{@link PerformanceResourceTiming} when information
     * from this is used to add events to span.
     * This is done to avoid reusing the same resource again for next span
     * @param resource
     */
    _markResourceAsUsed(resource) {
        this._usedResources.add(resource);
    }
    /**
     * Finish span, add attributes, network events etc.
     * @param span
     * @param spanData
     * @param response
     */
    _endSpan(span, spanData, response) {
        const endTime = core.millisToHrTime(Date.now());
        const performanceEndTime = core.hrTime();
        this._addFinalSpanAttributes(span, response);
        if (this._semconvStability & instrumentation_1.SemconvStability.STABLE) {
            // https://github.com/open-telemetry/semantic-conventions/blob/main/docs/http/http-spans.md#status
            if (response.status >= 400) {
                span.setStatus({ code: api.SpanStatusCode.ERROR });
                span.setAttribute(semantic_conventions_1.ATTR_ERROR_TYPE, String(response.status));
            }
        }
        setTimeout(() => {
            spanData.observer?.disconnect();
            this._findResourceAndAddNetworkEvents(span, spanData, performanceEndTime);
            this._tasksCount--;
            this._clearResources();
            span.end(endTime);
        }, OBSERVER_WAIT_TIME_MS);
    }
    /**
     * Patches the constructor of fetch
     */
    _patchConstructor() {
        return original => {
            const plugin = this;
            return function patchConstructor(...args) {
                const self = this;
                const url = web.parseUrl(args[0] instanceof Request ? args[0].url : String(args[0])).href;
                const options = args[0] instanceof Request ? args[0] : args[1] || {};
                const createdSpan = plugin._createSpan(url, options);
                if (!createdSpan) {
                    return original.apply(this, args);
                }
                const spanData = plugin._prepareSpanData(url);
                if (plugin.getConfig().measureRequestSize) {
                    (0, utils_1.getFetchBodyLength)(...args)
                        .then(bodyLength => {
                        if (!bodyLength)
                            return;
                        if (plugin._semconvStability & instrumentation_1.SemconvStability.OLD) {
                            createdSpan.setAttribute(semconv_1.ATTR_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED, bodyLength);
                        }
                        if (plugin._semconvStability & instrumentation_1.SemconvStability.STABLE) {
                            createdSpan.setAttribute(semconv_1.ATTR_HTTP_REQUEST_BODY_SIZE, bodyLength);
                        }
                    })
                        .catch(error => {
                        plugin._diag.warn('getFetchBodyLength', error);
                    });
                }
                function endSpanOnError(span, error) {
                    plugin._applyAttributesAfterFetch(span, options, error);
                    plugin._endSpan(span, spanData, {
                        status: error.status || 0,
                        statusText: error.message,
                        url,
                    });
                }
                function endSpanOnSuccess(span, response) {
                    plugin._applyAttributesAfterFetch(span, options, response);
                    if (response.status >= 200 && response.status < 400) {
                        plugin._endSpan(span, spanData, response);
                    }
                    else {
                        plugin._endSpan(span, spanData, {
                            status: response.status,
                            statusText: response.statusText,
                            url,
                        });
                    }
                }
                function onSuccess(span, resolve, response) {
                    try {
                        const resClone = response.clone();
                        const body = resClone.body;
                        if (body) {
                            const reader = body.getReader();
                            const read = () => {
                                reader.read().then(({ done }) => {
                                    if (done) {
                                        endSpanOnSuccess(span, response);
                                    }
                                    else {
                                        read();
                                    }
                                }, error => {
                                    endSpanOnError(span, error);
                                });
                            };
                            read();
                        }
                        else {
                            // some older browsers don't have .body implemented
                            endSpanOnSuccess(span, response);
                        }
                    }
                    finally {
                        resolve(response);
                    }
                }
                function onError(span, reject, error) {
                    try {
                        endSpanOnError(span, error);
                    }
                    finally {
                        reject(error);
                    }
                }
                return new Promise((resolve, reject) => {
                    return api.context.with(api.trace.setSpan(api.context.active(), createdSpan), () => {
                        plugin._addHeaders(options, url);
                        // Important to execute "_callRequestHook" after "_addHeaders", allowing the consumer code to override the request headers.
                        plugin._callRequestHook(createdSpan, options);
                        plugin._tasksCount++;
                        // TypeScript complains about arrow function captured a this typed as globalThis
                        // ts(7041)
                        return original
                            .apply(self, options instanceof Request ? [options] : [url, options])
                            .then(onSuccess.bind(self, createdSpan, resolve), onError.bind(self, createdSpan, reject));
                    });
                });
            };
        };
    }
    _applyAttributesAfterFetch(span, request, result) {
        const applyCustomAttributesOnSpan = this.getConfig().applyCustomAttributesOnSpan;
        if (applyCustomAttributesOnSpan) {
            (0, instrumentation_1.safeExecuteInTheMiddle)(() => applyCustomAttributesOnSpan(span, request, result), error => {
                if (!error) {
                    return;
                }
                this._diag.error('applyCustomAttributesOnSpan', error);
            }, true);
        }
    }
    _callRequestHook(span, request) {
        const requestHook = this.getConfig().requestHook;
        if (requestHook) {
            (0, instrumentation_1.safeExecuteInTheMiddle)(() => requestHook(span, request), error => {
                if (!error) {
                    return;
                }
                this._diag.error('requestHook', error);
            }, true);
        }
    }
    /**
     * Prepares a span data - needed later for matching appropriate network
     *     resources
     * @param spanUrl
     */
    _prepareSpanData(spanUrl) {
        const startTime = core.hrTime();
        const entries = [];
        if (typeof PerformanceObserver !== 'function') {
            return { entries, startTime, spanUrl };
        }
        const observer = new PerformanceObserver(list => {
            const perfObsEntries = list.getEntries();
            perfObsEntries.forEach(entry => {
                if (entry.initiatorType === 'fetch' && entry.name === spanUrl) {
                    entries.push(entry);
                }
            });
        });
        observer.observe({
            entryTypes: ['resource'],
        });
        return { entries, observer, startTime, spanUrl };
    }
    /**
     * implements enable function
     */
    enable() {
        if (isNode) {
            // Node.js v18+ *does* have a global `fetch()`, but this package does not
            // support instrumenting it.
            this._diag.warn("this instrumentation is intended for web usage only, it does not instrument Node.js's fetch()");
            return;
        }
        if ((0, instrumentation_1.isWrapped)(fetch)) {
            this._unwrap(core_1._globalThis, 'fetch');
            this._diag.debug('removing previous patch for constructor');
        }
        this._wrap(core_1._globalThis, 'fetch', this._patchConstructor());
    }
    /**
     * implements unpatch function
     */
    disable() {
        if (isNode) {
            return;
        }
        this._unwrap(core_1._globalThis, 'fetch');
        this._usedResources = new WeakSet();
    }
}
exports.FetchInstrumentation = FetchInstrumentation;
//# sourceMappingURL=fetch.js.map