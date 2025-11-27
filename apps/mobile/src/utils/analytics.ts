// Configuration for Honeycomb
const _HONEYCOMB_API_KEY =
  process.env.EXPO_PUBLIC_HONEYCOMB_API_KEY || "mock-key";
const SERVICE_NAME = "skatehubba-mobile";

// Initialize OpenTelemetry
// Note: In a real React Native environment, we might use @honeycombio/opentelemetry-react-native
// But for this setup, we'll structure it to be compatible or mock if the native module isn't fully linked yet.

export const initAnalytics = () => {
  if (__DEV__) {
    console.log(
      "[Analytics] Dev mode: Skipping full OTel init to save resources",
    );
    return;
  }

  try {
    // This is a conceptual setup - the actual package usage depends on the specific RN adapter
    console.log(`[Analytics] Initializing Honeycomb for ${SERVICE_NAME}`);

    // const sdk = new HoneycombWebSDK({
    //   apiKey: HONEYCOMB_API_KEY,
    //   serviceName: SERVICE_NAME,
    //   instrumentations: [getWebInstrumentations()],
    // });
    // sdk.start();
  } catch (error) {
    console.error("[Analytics] Failed to init:", error);
  }
};

export const trackEvent = (
  name: string,
  attributes: Record<string, any> = {},
) => {
  // Wrapper for OTel span/event
  console.log(`[Track] ${name}`, attributes);
  // In production:
  // const span = trace.getTracer(SERVICE_NAME).startSpan(name);
  // span.setAttributes(attributes);
  // span.end();
};

export const trackError = (error: Error, context: string) => {
  console.error(`[Error] ${context}:`, error);
  trackEvent("error", { message: error.message, stack: error.stack, context });
};
