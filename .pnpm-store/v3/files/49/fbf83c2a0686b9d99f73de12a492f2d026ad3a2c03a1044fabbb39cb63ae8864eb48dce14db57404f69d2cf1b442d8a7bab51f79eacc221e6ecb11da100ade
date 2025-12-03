const babel_plugin_component_annotate_1 = require("@sentry/babel-plugin-component-annotate");
const enableLogger_1 = require("./enableLogger");
const sentryBabelTransformerUtils_1 = require("./sentryBabelTransformerUtils");
(0, enableLogger_1.enableLogger)();
/**
 * Creates a Babel transformer with Sentry component annotation plugin.
 */
function createSentryBabelTransformer() {
    const defaultTransformer = (0, sentryBabelTransformerUtils_1.loadDefaultBabelTransformer)();
    // Using spread operator to avoid any conflicts with the default transformer
    const transform = (...args) => {
        const transformerArgs = args[0];
        addSentryComponentAnnotatePlugin(transformerArgs);
        return defaultTransformer.transform(...args);
    };
    return Object.assign(Object.assign({}, defaultTransformer), { transform });
}
function addSentryComponentAnnotatePlugin(args) {
    if (!args || typeof args.filename !== 'string' || !Array.isArray(args.plugins)) {
        return undefined;
    }
    if (!args.filename.includes('node_modules')) {
        args.plugins.push(babel_plugin_component_annotate_1.default);
    }
}
const sentryBabelTransformer = createSentryBabelTransformer();
module.exports = sentryBabelTransformer;
//# sourceMappingURL=sentryBabelTransformer.js.map