import { __awaiter } from "tslib";
import { convertIntegrationFnToClass } from '@sentry/core';
import { logger } from '@sentry/utils';
import { NATIVE } from '../wrapper';
const filename = 'view-hierarchy.json';
const contentType = 'application/json';
const attachmentType = 'event.view_hierarchy';
const INTEGRATION_NAME = 'ViewHierarchy';
/** Adds ViewHierarchy to error events */
export const viewHierarchyIntegration = () => {
    return {
        name: INTEGRATION_NAME,
        setupOnce: () => {
            // noop
        },
        processEvent,
    };
};
/**
 * Adds ViewHierarchy to error events
 *
 * @deprecated Use `viewHierarchyIntegration()` instead.
 */
// eslint-disable-next-line deprecation/deprecation
export const ViewHierarchy = convertIntegrationFnToClass(INTEGRATION_NAME, viewHierarchyIntegration);
function processEvent(event, hint) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasException = event.exception && event.exception.values && event.exception.values.length > 0;
        if (!hasException) {
            return event;
        }
        let viewHierarchy = null;
        try {
            viewHierarchy = yield NATIVE.fetchViewHierarchy();
        }
        catch (e) {
            logger.error('Failed to get view hierarchy from native.', e);
        }
        if (viewHierarchy) {
            hint.attachments = [
                {
                    filename,
                    contentType,
                    attachmentType,
                    data: viewHierarchy,
                },
                ...((hint === null || hint === void 0 ? void 0 : hint.attachments) || []),
            ];
        }
        return event;
    });
}
//# sourceMappingURL=viewhierarchy.js.map