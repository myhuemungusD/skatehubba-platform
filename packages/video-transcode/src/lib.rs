// src/lib.rs
// SkateHubba Heshur AI — Rust hardware transcoder
// Current: Safe FFI stub (Phase 1)
// Target: <1.8s 720p → 15s clip on A15 / Snapdragon 8 Gen 2+ (Phase 2)

#![deny(unsafe_op_in_unsafe_fn)]
#![deny(clippy::panic)]
#![deny(clippy::expect_used)]
#![deny(clippy::unwrap_used)]

use std::ffi::{c_char, CStr};
use std::panic::{self, AssertUnwindSafe};

/// Catches panics and converts them to a safe error code.
/// Required for App Store submission — Rust panics must never cross FFI.
fn safe_call<F>(f: F) -> i32
where
    F: FnOnce() -> i32 + panic::UnwindSafe,
{
    match panic::catch_unwind(AssertUnwindSafe(f)) {
        Ok(code) => code,
        Err(_) => {
            eprintln!("heshur_transcode: Rust panic caught at FFI boundary");
            -99 // Unique sentinel — tracked in Sentry
        }
    }
}

/// Transcode a video to a 15-second SkateHubba-ready clip.
/// Returns:
///   0  → success (future)
///  -1  → stub active → fall back to FFmpegKit (current intentional)
///  -2  → null pointer
///  -3  → input path not valid UTF-8
///  -4  → output path not valid UTF-8
///  -99 → Rust panic (caught)
#[no_mangle]
pub extern "C" fn transcode_15s(input_path: *const c_char, output_path: *const c_char) -> i32 {
    safe_call(|| {
        if input_path.is_null() || output_path.is_null() {
            eprintln!("transcode_15s: null pointer received from native bridge");
            return -2;
        }

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

        // Phase 1 — stub active
        eprintln!("transcode_15s stub → {input} → {output}");

        // TODO: Phase 2 — replace with ffmpeg-next + hardware acceleration
        // Target: <1.8s on 720p source using VideoToolbox/MediaCodec/Metal/VAAPI

        -1 // ← intentional: tell JS to fall back to FFmpegKit
    })
}

/// Version check for feature detection from JavaScript/React Native.
/// Format: major * 10000 + minor * 100 + patch
/// 0.1.0 → 100
/// 1.0.0 → 10000
#[no_mangle]
pub extern "C" fn heshur_transcoder_version() -> i32 {
    // v0.1.0 — stub
    100
}

/// Optional: expose build timestamp for crash correlation
#[no_mangle]
pub extern "C" fn heshur_transcoder_build_timestamp() -> i64 {
    // Set via build.rs: const BUILD_TIMESTAMP: i64 = env!("BUILD_TIMESTAMP").parse().unwrap();
    // fallback if not set
    option_env!("BUILD_TIMESTAMP")
        .and_then(|s| s.parse().ok())
        .unwrap_or(0)
}
