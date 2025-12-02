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
exports.SessionLogRecordProcessor = void 0;
const semconv_1 = require("./semconv");
/**
 * SessionLogRecordProcessor is a {@link SpanProcessor} adds the session.id attribute
 */
class SessionLogRecordProcessor {
    _sessionIdProvider;
    constructor(sessionIdProvider) {
        this._sessionIdProvider = sessionIdProvider;
    }
    onEmit(logRecord, _context) {
        const sessionId = this._sessionIdProvider?.getSessionId();
        if (sessionId) {
            logRecord.setAttribute(semconv_1.ATTR_SESSION_ID, sessionId);
        }
    }
    /**
     * Forces to export all finished spans
     */
    async forceFlush() { }
    /**
     * Shuts down the processor. Called when SDK is shut down. This is an
     * opportunity for processor to do any cleanup required.
     */
    async shutdown() { }
}
exports.SessionLogRecordProcessor = SessionLogRecordProcessor;
//# sourceMappingURL=SessionLogRecordProcessor.js.map