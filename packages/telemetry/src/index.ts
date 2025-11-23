import { trace, context, Span } from '@opentelemetry/api';

// Stub implementation for Honeycomb + OpenTelemetry
// In a real implementation, this would configure the OTLP exporter

export const initTelemetry = (serviceName: string) => {
  console.log(`[Telemetry] Initializing for ${serviceName}`);
  // TODO: Initialize OTLP exporter pointing to Honeycomb
};

export const withSpan = async <T>(name: string, fn: (span: Span) => Promise<T>): Promise<T> => {
  const tracer = trace.getTracer('skatehubba-tracer');
  return tracer.startActiveSpan(name, async (span) => {
    try {
      const result = await fn(span);
      span.end();
      return result;
    } catch (error) {
      span.recordException(error as Error);
      span.end();
      throw error;
    }
  });
};

export const logEvent = (name: string, attributes: Record<string, any> = {}) => {
  console.log(`[Telemetry Event] ${name}`, attributes);
  // TODO: Send to RUM
};
