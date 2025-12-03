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
exports.createSessionLogRecordProcessor = exports.createSessionSpanProcessor = void 0;
const SessionSpanProcessor_1 = require("./SessionSpanProcessor");
const SessionLogRecordProcessor_1 = require("./SessionLogRecordProcessor");
function createSessionSpanProcessor(sessionProvider) {
    return new SessionSpanProcessor_1.SessionSpanProcessor(sessionProvider);
}
exports.createSessionSpanProcessor = createSessionSpanProcessor;
function createSessionLogRecordProcessor(sessionProvider) {
    return new SessionLogRecordProcessor_1.SessionLogRecordProcessor(sessionProvider);
}
exports.createSessionLogRecordProcessor = createSessionLogRecordProcessor;
//# sourceMappingURL=utils.js.map