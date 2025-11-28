// lib.ts — Server-side exports (NO React Native imports)
// This file is safe for Node.js/esbuild bundling

// ── Error Codes (1:1 match with Rust FFI) ──
export enum TranscodeErrorCode {
  SUCCESS = 0,
  INIT_FAILED = 1,
  INPUT_INVALID = 2,
  DURATION_EXCEEDED = 3,
  OUTPUT_TOO_LARGE = 4,
  TRANSCODE_FAILED = 5,
  FALLBACK_REQUIRED = -1,
  NULL_POINTER = -2,
  INVALID_UTF8_INPUT = -3,
  INVALID_UTF8_OUTPUT = -4,
  RUST_PANIC = -99,
}

// ── Error Code to Message Mapping ──
export const TranscodeErrorMessages: Record<TranscodeErrorCode, string> = {
  [TranscodeErrorCode.SUCCESS]: 'Transcode completed successfully',
  [TranscodeErrorCode.INIT_FAILED]: 'FFmpeg initialization failed',
  [TranscodeErrorCode.INPUT_INVALID]: 'Invalid input file — no video stream',
  [TranscodeErrorCode.DURATION_EXCEEDED]: 'Video exceeds 15 second limit',
  [TranscodeErrorCode.OUTPUT_TOO_LARGE]: 'Output file exceeds 8MB limit',
  [TranscodeErrorCode.TRANSCODE_FAILED]: 'Transcode operation failed',
  [TranscodeErrorCode.FALLBACK_REQUIRED]: 'Rust stub active — use FFmpegKit fallback',
  [TranscodeErrorCode.NULL_POINTER]: 'Null pointer passed to FFI',
  [TranscodeErrorCode.INVALID_UTF8_INPUT]: 'Input path is not valid UTF-8',
  [TranscodeErrorCode.INVALID_UTF8_OUTPUT]: 'Output path is not valid UTF-8',
  [TranscodeErrorCode.RUST_PANIC]: 'Rust core panicked — session terminated',
};

// ── Result Types ──
export interface TranscodeResult {
  success: boolean;
  code: TranscodeErrorCode;
  durationMs?: number;
  filesizeBytes?: number;
  outputPath?: string;
  error?: string;
}

export interface TranscoderInfo {
  version: number;
  buildTimestamp: number;
  isStub: boolean;
}

// ── Version Parsing ──
export function parseVersion(versionCode: number): string {
  const major = Math.floor(versionCode / 10000);
  const minor = Math.floor((versionCode % 10000) / 100);
  const patch = versionCode % 100;
  return `${major}.${minor}.${patch}`;
}

// ── Server-side stub (actual FFI happens in native modules) ──
export function getTranscoderInfo(): TranscoderInfo {
  return {
    version: 100, // v0.1.0
    buildTimestamp: 0,
    isStub: true,
  };
}

// ── Validate transcode result code ──
export function isSuccessCode(code: number): boolean {
  return code === TranscodeErrorCode.SUCCESS;
}

export function isFallbackRequired(code: number): boolean {
  return code === TranscodeErrorCode.FALLBACK_REQUIRED;
}

export function getErrorMessage(code: TranscodeErrorCode): string {
  return TranscodeErrorMessages[code] || 'Unknown error';
}
