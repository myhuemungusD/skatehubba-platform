import { Context } from '@opentelemetry/api';
import { SpanProcessor, Span, ReadableSpan } from '@opentelemetry/sdk-trace-base';
import { SessionProvider } from './types/SessionProvider';
/**
 * SessionSpanProcessor is a {@link SpanProcessor} that adds the session.id attribute
 */
export declare class SessionSpanProcessor implements SpanProcessor {
    private _sessionIdProvider;
    constructor(sessionIdProvider: SessionProvider);
    /**
     * Forces to export all finished spans
     */
    forceFlush(): Promise<void>;
    /**
     * Called when a {@link Span} is started, if the `span.isRecording()`
     * returns true.
     * @param span the Span that just started.
     */
    onStart(span: Span, _parentContext: Context): void;
    /**
     * Called when a {@link ReadableSpan} is ended, if the `span.isRecording()`
     * returns true.
     * @param span the Span that just ended.
     */
    onEnd(_: ReadableSpan): void;
    /**
     * Shuts down the processor. Called when SDK is shut down. This is an
     * opportunity for processor to do any cleanup required.
     */
    shutdown(): Promise<void>;
}
//# sourceMappingURL=SessionSpanProcessor.d.ts.map