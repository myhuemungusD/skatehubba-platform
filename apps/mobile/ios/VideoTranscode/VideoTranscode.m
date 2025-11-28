// VideoTranscode.m
// React Native Bridge Macro

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(VideoTranscode, NSObject)

// Expose the main async method
RCT_EXTERN_METHOD(transcodeVideo:(NSString *)inputPath
                  outputPath:(NSString *)outputPath
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

// Expose the sync getter methods
RCT_EXTERN_BLOCKING_SYNCHRONOUS_METHOD(getTranscoderVersion)
RCT_EXTERN_BLOCKING_SYNCHRONOUS_METHOD(getBuildTimestamp)

@end
