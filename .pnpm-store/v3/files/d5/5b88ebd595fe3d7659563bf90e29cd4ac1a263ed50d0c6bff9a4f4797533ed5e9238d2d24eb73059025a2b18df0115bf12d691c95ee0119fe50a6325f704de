Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDefaultBabelTransformer = exports.cleanDefaultBabelTransformerPath = exports.readDefaultBabelTransformerPath = exports.saveDefaultBabelTransformerPath = void 0;
const utils_1 = require("@sentry/utils");
const fs = require("fs");
const path = require("path");
const process = require("process");
/**
 * Saves default Babel transformer path to the project root.
 */
function saveDefaultBabelTransformerPath(defaultBabelTransformerPath) {
    try {
        fs.mkdirSync(path.join(process.cwd(), '.sentry'), { recursive: true });
        fs.writeFileSync(getDefaultBabelTransformerPath(), defaultBabelTransformerPath);
        utils_1.logger.debug('Saved default Babel transformer path');
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error('[Sentry] Failed to save default Babel transformer path:', e);
    }
}
exports.saveDefaultBabelTransformerPath = saveDefaultBabelTransformerPath;
/**
 * Reads default Babel transformer path from the project root.
 */
function readDefaultBabelTransformerPath() {
    try {
        return fs.readFileSync(getDefaultBabelTransformerPath()).toString();
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error('[Sentry] Failed to read default Babel transformer path:', e);
    }
    return undefined;
}
exports.readDefaultBabelTransformerPath = readDefaultBabelTransformerPath;
/**
 * Cleans default Babel transformer path from the project root.
 */
function cleanDefaultBabelTransformerPath() {
    try {
        fs.unlinkSync(getDefaultBabelTransformerPath());
        utils_1.logger.debug('Cleaned default Babel transformer path');
    }
    catch (e) {
        // We don't want to fail the build if we can't clean the file
        // eslint-disable-next-line no-console
        console.error('[Sentry] Failed to clean default Babel transformer path:', e);
    }
}
exports.cleanDefaultBabelTransformerPath = cleanDefaultBabelTransformerPath;
function getDefaultBabelTransformerPath() {
    return path.join(process.cwd(), '.sentry/.defaultBabelTransformerPath');
}
/**
 * Loads default Babel transformer from `@react-native/metro-config` -> `@react-native/metro-babel-transformer`.
 */
function loadDefaultBabelTransformer() {
    const defaultBabelTransformerPath = readDefaultBabelTransformerPath();
    if (!defaultBabelTransformerPath) {
        throw new Error('Default Babel Transformer Path not found in `.sentry` directory.');
    }
    utils_1.logger.debug(`Loading default Babel transformer from ${defaultBabelTransformerPath}`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(defaultBabelTransformerPath);
}
exports.loadDefaultBabelTransformer = loadDefaultBabelTransformer;
//# sourceMappingURL=sentryBabelTransformerUtils.js.map