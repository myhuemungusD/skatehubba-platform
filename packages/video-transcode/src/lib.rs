// src/lib.rs – SkateHubba Heshur AI • Rust transcoder stub → future hardware beast
// Phase 1: Safe FFI stub (current)
// Phase 2: <1.8s 720p→15s clip using VAAPI/Metal/VideoToolbox/MediaCodec (target)

use std::ffi::{c_char, CStr};
use std::panic;

// ── Safety first: never let a Rust panic cross the FFI boundary ──
fn catch_unwind<F: FnOnce() -> i32 + std::panic::UnwindSafe>(f: F) -> i32 {
    match panic::catch_unwind(f) {
        Ok(code) => code,
        Err(_) => {
            eprintln!("transcode_15s: Rust panic caught at FFI boundary");
            // -99 = "Rust panicked" – unique sentinel for Sentry
            -99
        }
    }
}

#[no_mangle]
pub extern "C" fn transcode_15s(
    input_path: *const c_char,
    output_path: *const c_char,
) -> i32 {
    catch_unwind(|| {
        // ── Null pointer guards (mandatory for App Store safety) ──
        if input_path.is_null() || output_path.is_null() {
            eprintln!("transcode_15s: null pointer passed from native layer");
            return -2;
        }

        // ── Safe string conversion with explicit error handling ──
        let input = match unsafe { CStr::from_ptr(input_path) }.to_str() {
            Ok(s) => s,
            Err(_) => {
                eprintln!("transcode_15s: input_path is not valid UTF-8");
                return -3;
            }
        };

        let output = match unsafe { CStr::from_ptr(output_path) }.to_str() {
            Ok(s) => s,
            Err(_) => {
                eprintln!("transcode_15s: output_path is not valid UTF-8");
                return -4;
            }
        };

        // ── Phase 1: Stub → signal fallback to FFmpegKit (current working path)
        // ── Phase 2: Replace body with ffmpeg-next + hardware decoder/encoder
        eprintln!(
            "transcode_15s stub called → input: {} | output: {}",
            input, output
        );

        // Return codes (documented in React Native bridge):
        //   0  = success (future)
        //  -1  = fallback to FFmpegKit (current intentional behavior)
        //  -2  = null pointer
        //  -3/-4 = invalid UTF-8
        //  -99 = Rust panic
        -1
    })
}

// Optional: expose a version/functionality check for JS side
#[no_mangle]
pub extern "C" fn heshur_transcoder_version() -> i32 {
    // Format: major * 10000 + minor * 100 + patch
    // 0.1.0 → 100, 1.0.0 → 10000
    100 // → v0.1.0 (stub)
}
