import { NativeModules, Platform, Alert } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import { TranscodeErrorCode, runTranscode } from './index'; 

// --- 1. Bridge Setup (Must be copied from index.ts) ---
interface HeshurTranscoderNativeModule {
  transcodeVideo(inputPath: string, outputPath: string): Promise<{
    code: number;
    durationMs: number;
    filesizeBytes: number;
    outputPath: string;
    // Note: The success field is not returned by native, the code is.
  }>;
  getTranscoderVersion(): number;
  getBuildTimestamp(): number;
}
const HeshurTranscoder = NativeModules.VideoTranscode as HeshurTranscoderNativeModule | undefined;


// --- 2. State & Types (Adopted from user's preferred pattern) ---

// Define the structure of the final successful transcode result
interface TranscodeSuccessResult {
  durationMs: number;
  filesizeBytes: number;
  outputPath: string;
}

type TranscodeState =
  | { status: 'idle'; }
  | { status: 'transcoding'; progress: number; }
  | { status: 'success'; result: TranscodeSuccessResult; }
  | { status: 'error'; error: string; code: string; }; // Code is the string enum value

// --- 3. Heshur Voice Error Mapping ---
const HeshurSays: { [key: string]: string } = {
  // Codes mapped from Swift/Obj-C bridge errors
  'DURATION_EXCEEDED': "Yo, clip over 15s. One-take rule, no excuses. Trim that footy.",
  'OUTPUT_TOO_LARGE': "File too chunky — over 8MB. Keep it raw, not bloated.",
  'FFI_RUST_PANIC': "Rust core wiped out hard. Session over. Try again.",
  'INPUT_INVALID': "That clip's corrupted or missing video. Film a new one.",
  'TRANSCODE_FAILED': "Transcode bombed. Check your signal and retry.",
  'FALLBACK_REQUIRED': "Rust core is in stub mode. Must use FFmpegKit.",
  'FFI_NULL_PATH': "Path missing. Can't transcode thin air, bro.",
  
  // Generic/Unknown Errors
  'DEFAULT': "Something went wrong in the transcode pit. Try again."
};

// --- 4. The Custom React Hook ---
export const useTranscode = () => {
  const [state, setState] = useState<TranscodeState>({ status: 'idle' });
  
  // State for sync availability checks
  const [isAvailable, setIsAvailable] = useState(false);
  const [version, setVersion] = useState(0);

  // Check Availability on Mount
  useEffect(() => {
    if (HeshurTranscoder && HeshurTranscoder.getTranscoderVersion) {
      const v = HeshurTranscoder.getTranscoderVersion();
      setVersion(v);
      setIsAvailable(v > 0);
    }
  }, []);


  const transcode = useCallback(
    async (inputPath: string, outputPath: string): Promise<TranscodeSuccessResult | null> => {
      if (!HeshurTranscoder) {
        // Module not found error
        setState({ status: 'error', error: HeshurSays.DEFAULT, code: 'LINKING_ERROR' });
        return null;
      }
      
      setState({ status: 'transcoding', progress: 0 });

      try {
        // --- NATIVE CALL ---
        const nativeResponse = await HeshurTranscoder.transcodeVideo(inputPath, outputPath);
        
        // Success path (code 0)
        if (nativeResponse.code === 0) {
            
            // Simulate progress (optional: kept for user preference)
            const fakeProgressSteps = [0.2, 0.5, 0.8, 1.0];
            for (const p of fakeProgressSteps) {
                // Ensure we haven't been reset while waiting
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

        // --- ERROR PATH (Native Rejected but code is still returned) ---
        
        // If the native module resolves but returns a non-zero error code (which is our design)
        const code = String(nativeResponse.code);
        
        // Find the Heshur message, falling back to a generic message
        const finalMessage = HeshurSays[code] || HeshurSays.DEFAULT;

        setState({ status: 'error', error: finalMessage, code });
        return null;

      } catch (err: any) {
        // Catch the native bridge rejection (where the bridge threw an error with a string code)
        const code = err.code as string;
        const message = HeshurSays[code] || HeshurSays.DEFAULT;

        setState({ status: 'error', error: message, code });
        
        // Retrying logic (kept for user preference)
        if (code === 'TRANSCODE_FAILED') {
          Alert.alert("Transcode Failed", "Retry?", [
            { text: "Nah", style: "cancel" },
            // Recursively call transcode, passing the paths
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
    isTranscoderAvailable: isAvailable, // Added for initial component rendering logic
    transcoderVersion: version,
  };
};
