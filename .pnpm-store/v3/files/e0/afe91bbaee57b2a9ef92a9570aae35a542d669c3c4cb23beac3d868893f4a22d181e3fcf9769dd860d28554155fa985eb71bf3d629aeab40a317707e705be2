"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const ios_1 = require("./ios");
/**
 * A config plugin for configuring `@react-native-firebase/app-check`
 */
const withRnFirebaseAppCheck = config => {
    return (0, config_plugins_1.withPlugins)(config, [
        // iOS
        ios_1.withFirebaseAppDelegate,
    ]);
};
const pak = require('@react-native-firebase/app-check/package.json');
exports.default = (0, config_plugins_1.createRunOncePlugin)(withRnFirebaseAppCheck, pak.name, pak.version);
