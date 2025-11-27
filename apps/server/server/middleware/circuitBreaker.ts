export enum CircuitState {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
  HALF_OPEN = "HALF_OPEN",
}

interface CircuitBreakerConfig {
  failureThreshold?: number;
  resetTimeout?: number;
  name: string;
}

export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private successCount: number = 0;
  private lastFailureTime: number = 0;

  private failureThreshold: number;
  private resetTimeout: number;
  private name: string;

  constructor(config: CircuitBreakerConfig) {
    this.failureThreshold = config.failureThreshold || 5;
    this.resetTimeout = config.resetTimeout || 60000; // 1 minute default
    this.name = config.name;
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        console.log(`🔄 Circuit Breaker [${this.name}]: Moving to HALF_OPEN`);
        this.state = CircuitState.HALF_OPEN;
        this.successCount = 0;
      } else {
        throw new Error(`Circuit Breaker [${this.name}] is OPEN`);
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failureCount = 0;

    if (this.state === CircuitState.HALF_OPEN) {
      this.successCount++;
      if (this.successCount >= 2) {
        console.log(`✅ Circuit Breaker: Moving to CLOSED`);
        this.state = CircuitState.CLOSED;
        this.successCount = 0;
      }
    }
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      console.log(`🔴 Circuit Breaker [${this.name}]: Moving to OPEN`);
      this.state = CircuitState.OPEN;
    }
  }

  getState() {
    return this.state;
  }

  reset() {
    this.state = CircuitState.CLOSED;
    this.failureCount = 0;
    this.successCount = 0;
  }
}

// Create circuit breakers for external services
export const firebaseCircuitBreaker = new CircuitBreaker({
  name: "Firebase",
  failureThreshold: 5,
  resetTimeout: 60000,
});

export const databaseCircuitBreaker = new CircuitBreaker({
  name: "Database",
  failureThreshold: 3,
  resetTimeout: 120000,
});

export const externalAPICircuitBreaker = new CircuitBreaker({
  name: "External APIs",
  failureThreshold: 5,
  resetTimeout: 60000,
});
