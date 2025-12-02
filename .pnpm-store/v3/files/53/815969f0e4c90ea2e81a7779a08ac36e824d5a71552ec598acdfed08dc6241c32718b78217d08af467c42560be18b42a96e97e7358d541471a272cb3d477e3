import type { Integration, IntegrationClass, IntegrationFnResult } from '@sentry/types';
/**
 * React Native Error
 */
export type ReactNativeError = Error & {
    framesToPop?: number;
    jsEngine?: string;
    preventSymbolication?: boolean;
    componentStack?: string;
};
/** Tries to symbolicate the JS stack trace on the device. */
export declare const debugSymbolicatorIntegration: () => IntegrationFnResult;
/**
 * Tries to symbolicate the JS stack trace on the device.
 *
 * @deprecated Use `debugSymbolicatorIntegration()` instead.
 */
export declare const DebugSymbolicator: IntegrationClass<Integration>;
//# sourceMappingURL=debugsymbolicator.d.ts.map