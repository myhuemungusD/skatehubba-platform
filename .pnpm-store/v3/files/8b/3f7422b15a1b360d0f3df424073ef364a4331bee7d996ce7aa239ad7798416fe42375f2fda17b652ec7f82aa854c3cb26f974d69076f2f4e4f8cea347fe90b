import { Context } from '@opentelemetry/api';
import { SdkLogRecord, LogRecordProcessor } from '@opentelemetry/sdk-logs';
import { SessionProvider } from './types/SessionProvider';
/**
 * SessionLogRecordProcessor is a {@link SpanProcessor} adds the session.id attribute
 */
export declare class SessionLogRecordProcessor implements LogRecordProcessor {
    private _sessionIdProvider;
    constructor(sessionIdProvider: SessionProvider);
    onEmit(logRecord: SdkLogRecord, _context?: Context | undefined): void;
    /**
     * Forces to export all finished spans
     */
    forceFlush(): Promise<void>;
    /**
     * Shuts down the processor. Called when SDK is shut down. This is an
     * opportunity for processor to do any cleanup required.
     */
    shutdown(): Promise<void>;
}
//# sourceMappingURL=SessionLogRecordProcessor.d.ts.map