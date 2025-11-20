import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';

console.log('🔧 Building server with esbuild...');

// Ensure the output directory exists
const outputDir = 'dist/server';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Client is already built to dist/client, no need to copy
const clientDir = 'dist/client';

if (!fs.existsSync(clientDir)) {
  console.warn('⚠️  Client build not found at dist/client - make sure to run build:client first');
}

// ESBuild configuration for server bundling
// Bundle the actual Express server with all TypeScript dependencies compiled
const config = {
  entryPoints: ['server/index.js'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/server/index.js',
  format: 'esm',
  packages: 'external',
  external: [
    '@neondatabase/serverless',
    '@skatehubba/db',
    'pg',
    'ws',
    'express',
    'cors',
    'helmet',
    'firebase-admin'
  ],
  target: 'node22',
  minify: false,
  sourcemap: true,
  mainFields: ['module', 'main'],
};

try {
  await build(config);
  console.log('✅ Server built successfully to dist/server/index.js');
} catch (error) {
  console.error('❌ Server build failed:', error);
  process.exit(1);
}