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
exports.browserDetector = void 0;
const api_1 = require("@opentelemetry/api");
const resources_1 = require("@opentelemetry/resources");
const types_1 = require("./types");
/**
 * BrowserDetector will be used to detect the resources related to browser.
 */
class BrowserDetector {
    detect(config) {
        const isBrowser = typeof navigator !== 'undefined';
        if (!isBrowser) {
            return (0, resources_1.emptyResource)();
        }
        const browserResource = getBrowserAttributes();
        return this._getResourceAttributes(browserResource, config);
    }
    /**
     * Validates browser resource attribute map from browser variables
     *
     * @param browserResource The un-sanitized resource attributes from browser as key/value pairs.
     * @param config: Config
     * @returns The sanitized resource attributes.
     */
    _getResourceAttributes(browserResource, _config) {
        if (!browserResource[types_1.BROWSER_ATTRIBUTES.USER_AGENT] &&
            !browserResource[types_1.BROWSER_ATTRIBUTES.PLATFORM]) {
            api_1.diag.debug('BrowserDetector failed: Unable to find required browser resources. ');
            return (0, resources_1.emptyResource)();
        }
        else {
            return { attributes: browserResource };
        }
    }
}
// Add Browser related attributes to resources
function getBrowserAttributes() {
    const browserAttribs = {};
    const userAgentData = navigator.userAgentData;
    if (userAgentData) {
        browserAttribs[types_1.BROWSER_ATTRIBUTES.PLATFORM] = userAgentData.platform;
        browserAttribs[types_1.BROWSER_ATTRIBUTES.BRANDS] = userAgentData.brands.map(b => `${b.brand} ${b.version}`);
        browserAttribs[types_1.BROWSER_ATTRIBUTES.MOBILE] = userAgentData.mobile;
    }
    else {
        browserAttribs[types_1.BROWSER_ATTRIBUTES.USER_AGENT] = navigator.userAgent;
    }
    browserAttribs[types_1.BROWSER_ATTRIBUTES.LANGUAGE] = navigator.language;
    return browserAttribs;
}
exports.browserDetector = new BrowserDetector();
//# sourceMappingURL=BrowserDetector.js.map