// src/index.ts — Main entry point
// Re-exports everything for convenience

export * from './lib';

// Note: hooks are exported separately via ./hooks path
// to avoid bundling RN in server builds
// import { useVideoTranscoder } from '@skatehubba/video-transcode/hooks';
