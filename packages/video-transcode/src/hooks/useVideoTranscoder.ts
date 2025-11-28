// hooks/useVideoTranscoder.ts — Client-side React Native hook
// This file imports React Native — NOT safe for Node.js bundling

import { NativeModules, Alert } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import { isSuccessCode } from '../lib';

// ── Native Module Interface ──
interface HeshurTranscoderNativeModule {
  transcodeVideo(inputPath: string, outputPath: string): Promise<{
    code: number;
    durationMs: number;
    filesizeBytes: number;
    outputPath: string;
  }>;
  getTranscoderVersion(): number;
  getBuildTimestamp(): number;
}

const HeshurTranscoder = NativeModules.VideoTranscode as HeshurTranscoderNativeModule | undefined;

// ── State Types ──
interface TranscodeSuccessResult {
  durationMs: number;
  filesizeBytes: number;
  outputPath: string;
}

type TranscodeState =
  | { status: 'idle' }
  | { status: 'transcoding'; progress: number }
  | { status: 'success'; result: TranscodeSuccessResult }
  | { status: 'error'; error: string; code: string };

// ── Heshur Voice Error Mapping ──
const HeshurSays: Record<string, string> = {
  'DURATION_EXCEEDED': "Yo, clip over 15s. One-take rule, no excuses. Trim that footy.",
  'OUTPUT_TOO_LARGE': "File too chunky — over 8MB. Keep it raw, not bloated.",
  'FFI_RUST_PANIC': "Rust core wiped out hard. Session over. Try again.",
  'INPUT_INVALID': "That clip's corrupted or missing video. Film a new one.",
  'TRANSCODE_FAILED': "Transcode bombed. Check your signal and retry.",
  'FALLBACK_REQUIRED': "Rust core is in stub mode. Must use FFmpegKit.",
  'FFI_NULL_PATH': "Path missing. Can't transcode thin air, bro.",
  'LINKING_ERROR': "Native module not linked. Rebuild the app.",
  'DEFAULT': "Something went wrong in the transcode pit. Try again."
};

// ── The Custom React Hook ──
export function useVideoTranscoder() {
  const [state, setState] = useState<TranscodeState>({ status: 'idle' });
  const [isAvailable, setIsAvailable] = useState(false);
  const [version, setVersion] = useState(0);

  // Check Availability on Mount
  useEffect(() => {
    if (HeshurTranscoder?.getTranscoderVersion) {
      const v = HeshurTranscoder.getTranscoderVersion();
      setVersion(v);
      setIsAvailable(v > 0);
    }
  }, []);

  const transcode = useCallback(
    async (inputPath: string, outputPath: string): Promise<TranscodeSuccessResult | null> => {
      if (!HeshurTranscoder) {
        setState({ status: 'error', error: HeshurSays.LINKING_ERROR, code: 'LINKING_ERROR' });
        return null;
      }

      setState({ status: 'transcoding', progress: 0 });

      try {
        const nativeResponse = await HeshurTranscoder.transcodeVideo(inputPath, outputPath);

        if (isSuccessCode(nativeResponse.code)) {
          // Simulate progress steps
          const progressSteps = [0.2, 0.5, 0.8, 1.0];
          for (const p of progressSteps) {
            await new Promise(r => setTimeout(r, 80));
            setState(s => s.status === 'transcoding' ? { status: 'transcoding', progress: p } : s);
          }

          const result: TranscodeSuccessResult = {
            durationMs: nativeResponse.durationMs,
            filesizeBytes: nativeResponse.filesizeBytes,
            outputPath: nativeResponse.outputPath,
          };

          setState({ status: 'success', result });
          return result;
        }

        // Error path
        const code = String(nativeResponse.code);
        const message = HeshurSays[code] || HeshurSays.DEFAULT;
        setState({ status: 'error', error: message, code });
        return null;

      } catch (err: any) {
        const code = err.code as string || 'UNKNOWN';
        const message = HeshurSays[code] || HeshurSays.DEFAULT;
        setState({ status: 'error', error: message, code });

        if (code === 'TRANSCODE_FAILED') {
          Alert.alert("Transcode Failed", "Retry?", [
            { text: "Nah", style: "cancel" },
            { text: "Try Again", onPress: () => transcode(inputPath, outputPath) }
          ]);
        }
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ status: 'idle' });
  }, []);

  return {
    ...state,
    transcode,
    reset,
    isIdle: state.status === 'idle',
    isTranscoding: state.status === 'transcoding',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    isTranscoderAvailable: isAvailable,
    transcoderVersion: version,
  };
}

// Default export for convenience
export default useVideoTranscoder;
