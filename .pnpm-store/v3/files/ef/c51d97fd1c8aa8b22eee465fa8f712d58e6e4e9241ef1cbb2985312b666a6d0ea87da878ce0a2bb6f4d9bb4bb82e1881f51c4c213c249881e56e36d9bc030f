import { __awaiter } from "tslib";
import { convertIntegrationFnToClass } from '@sentry/core';
import { logger } from '@sentry/utils';
import { NATIVE } from '../wrapper';
const INTEGRATION_NAME = 'ModulesLoader';
/** Loads runtime JS modules from prepared file. */
export const modulesLoaderIntegration = () => {
    return {
        name: INTEGRATION_NAME,
        setupOnce: () => {
            // noop
        },
        processEvent: createProcessEvent(),
    };
};
/**
 * Loads runtime JS modules from prepared file.
 *
 * @deprecated Use `modulesLoaderIntegration()` instead.
 */
// eslint-disable-next-line deprecation/deprecation
export const ModulesLoader = convertIntegrationFnToClass(INTEGRATION_NAME, modulesLoaderIntegration);
function createProcessEvent() {
    let isSetup = false;
    let modules = null;
    return (event) => __awaiter(this, void 0, void 0, function* () {
        if (!isSetup) {
            try {
                modules = yield NATIVE.fetchModules();
            }
            catch (e) {
                logger.log(`Failed to get modules from native: ${e}`);
            }
            isSetup = true;
        }
        if (modules) {
            event.modules = Object.assign(Object.assign({}, modules), event.modules);
        }
        return event;
    });
}
//# sourceMappingURL=modulesloader.js.map