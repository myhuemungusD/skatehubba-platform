// VideoTranscode.h
// Defines the interface for the Rust FFI functions (libvideo_transcode.a)

#import <Foundation/Foundation.h>

// ── Rust FFI Contract ──────────────────────────────────────────────

// Transcodes video (i32 return code for status)
extern int32_t transcode_15s(const char *input_path, const char *output_path);

// Returns the version number (i32 return code)
extern int32_t heshur_transcoder_version(void);

// Returns the build timestamp (i64 return code)
extern int64_t heshur_transcoder_build_timestamp(void);

// ── Objective-C Wrapper (Required for RN Bridge) ─────────────────────

@interface VideoTranscode : NSObject

// The standard RN bridge interface
- (dispatch_queue_t)methodQueue;

// The main async transcoding method exposed to JavaScript
- (void)transcodeVideo:(NSString *)inputPath
            outputPath:(NSString *)outputPath
              resolver:(RCTPromiseResolveBlock)resolve
              rejecter:(RCTPromiseRejectBlock)reject;

// Sync version check for JavaScript
- (int32_t)getTranscoderVersion;
- (int64_t)getBuildTimestamp;

@end
