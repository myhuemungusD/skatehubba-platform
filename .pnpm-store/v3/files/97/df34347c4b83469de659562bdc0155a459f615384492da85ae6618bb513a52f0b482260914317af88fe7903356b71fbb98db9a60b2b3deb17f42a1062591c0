import type { IntegrationFnResult } from '@sentry/types';
export declare const MOBILE_REPLAY_INTEGRATION_NAME = "MobileReplay";
export interface MobileReplayOptions {
    /**
     * Mask all text in recordings
     *
     * @default true
     */
    maskAllText?: boolean;
    /**
     * Mask all images in recordings
     *
     * @default true
     */
    maskAllImages?: boolean;
    /**
     * Mask all vector graphics in recordings
     * Supports `react-native-svg`
     *
     * @default true
     */
    maskAllVectors?: boolean;
}
type MobileReplayIntegration = IntegrationFnResult & {
    options: Required<MobileReplayOptions>;
};
/**
 * The Mobile Replay Integration, let's you adjust the default mobile replay options.
 * To be passed to `Sentry.init` with `replaysOnErrorSampleRate` or `replaysSessionSampleRate`.
 *
 * ```javascript
 * Sentry.init({
 *  _experiments: {
 *    replaysOnErrorSampleRate: 1.0,
 *    replaysSessionSampleRate: 1.0,
 *  },
 *  integrations: [mobileReplayIntegration({
 *    // Adjust the default options
 *  })],
 * });
 * ```
 *
 * @experimental
 */
export declare const mobileReplayIntegration: (initOptions?: MobileReplayOptions) => MobileReplayIntegration;
export {};
//# sourceMappingURL=mobilereplay.d.ts.map