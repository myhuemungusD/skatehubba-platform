import type { Context, Integration, IntegrationClass, IntegrationFnResult } from '@sentry/types';
export interface ReactNativeContext extends Context {
    js_engine?: string;
    turbo_module: boolean;
    fabric: boolean;
    expo: boolean;
    hermes_version?: string;
    react_native_version?: string;
    component_stack?: string;
    hermes_debug_info?: boolean;
    expo_go_version?: string;
    expo_sdk_version?: string;
}
/** Loads React Native context at runtime */
export declare const reactNativeInfoIntegration: () => IntegrationFnResult;
/**
 * Loads React Native context at runtime
 *
 * @deprecated Use `reactNativeInfoIntegration()` instead.
 */
export declare const ReactNativeInfo: IntegrationClass<Integration>;
//# sourceMappingURL=reactnativeinfo.d.ts.map