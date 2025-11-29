import { NativeModules, Platform } from 'react-native';

// ── Error Codes (1:1 match with Rust TranscodeError + native bridges) ──
export enum TranscodeErrorCode {
  FFI_LOAD_ERROR = 'FFI_LOAD_ERROR',
  FFI_NULL_PATH = 'FFI_NULL_PATH',
  FFI_RUST_PANIC = 'FFI_RUST_PANIC',
  NATIVE_RUNTIME_ERROR = 'NATIVE_RUNTIME_ERROR',
  DURATION_EXCEEDED = 'DURATION_EXCEEDED',
  OUTPUT_TOO_LARGE = 'OUTPUT_TOO_LARGE',
  INPUT_INVALID = 'INPUT_INVALID',
  TRANSCODE_FAILED = 'TRANSCODE_FAILED',
  INIT_FAILED = 'INIT_FAILED',
  FALLBACK_REQUIRED = 'FALLBACK_REQUIRED',
  UNKNOWN = 'UNKNOWN',
  LINKING_ERROR = 'LINKING_ERROR',
}

// ── Native Module Interface ──
interface TranscodeResult {
  success: boolean;
  durationMs: number;
  filesizeBytes: number;
  outputPath: string;
}

interface VideoTranscodeModule {
  transcodeVideo(inputPath: string, outputPath: string): Promise<TranscodeResult>;
  getTranscoderVersion(): number;
  getBuildTimestamp(): number;
}

// ── Module Resolution ──
const LINKING_ERROR =
  `The package 'VideoTranscode' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You rebuilt the app after installing the module\n", default: '' }) +
  '- You are not using Expo Go\n';

const VideoTranscode: VideoTranscodeModule | undefined = NativeModules.VideoTranscode
  ? NativeModules.VideoTranscode
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

// ── Main Transcode Function ──
export async function runTranscode(
  inputPath: string,
  outputPath: string
): Promise<TranscodeResult> {
  if (!VideoTranscode) {
    throw new Error(LINKING_ERROR);
  }

  if (!inputPath || !outputPath) {
    throw Object.assign(new Error('Input or output path cannot be empty'), {
      code: TranscodeErrorCode.FFI_NULL_PATH,
    });
  }

  return VideoTranscode.transcodeVideo(inputPath, outputPath);
}

// ── Version Info ──
export function getTranscoderVersion(): number {
  if (!VideoTranscode) return 0;
  return VideoTranscode.getTranscoderVersion();
}

export function getBuildTimestamp(): number {
  if (!VideoTranscode) return 0;
  return VideoTranscode.getBuildTimestamp();
}

// ── Re-export Hook ──
export { useTranscode } from './useTranscode';
