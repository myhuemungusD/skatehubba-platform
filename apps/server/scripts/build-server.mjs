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
const config = {
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: 'dist/server/index.js',
  format: 'esm',
  packages: 'external',
  external: [
    '@neondatabase/serverless',
    'pg',
    'ws'
  ],
  target: 'node18',
  minify: false,
  sourcemap: true,
};

try {
  await build(config);
  console.log('✅ Server built successfully to dist/server/index.js');
} catch (error) {
  console.error('❌ Server build failed:', error);
  process.exit(1);
}