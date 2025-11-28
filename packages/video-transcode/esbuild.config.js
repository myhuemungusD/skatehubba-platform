// esbuild.config.js — SKATEHUBBA VIDEO TRANSCODE BUILD LOCK
const esbuild = require('esbuild');
const path = require('path');

const isWatch = process.argv.includes('--watch');

async function build() {
  const sharedConfig = {
    bundle: true,
    platform: 'node',
    target: 'node20',
    external: [
      'react-native',
      '@skatehubba/*',
      'firebase-admin',
      'firebase-functions',
    ],
    resolveExtensions: ['.ts', '.js', '.mjs'],
    loader: { '.ts': 'ts' },
    plugins: [
      {
        name: 'monorepo-resolver',
        setup(build) {
          build.onResolve({ filter: /^@skatehubba\// }, args => {
            const pkgName = args.path.replace('@skatehubba/', '');
            const resolved = path.resolve(__dirname, '../', pkgName);
            return { path: resolved, external: true };
          });
        },
      },
    ],
    logLevel: 'info',
  };

  // CJS build
  await esbuild.build({
    ...sharedConfig,
    entryPoints: ['src/lib.ts'],
    outfile: 'dist/lib.js',
    format: 'cjs',
  });

  // ESM build
  await esbuild.build({
    ...sharedConfig,
    entryPoints: ['src/lib.ts'],
    outfile: 'dist/lib.mjs',
    format: 'esm',
  });

  console.log('Build complete — dist/lib.js + dist/lib.mjs');
}

build().catch(() => process.exit(1));
