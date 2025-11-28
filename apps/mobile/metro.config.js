// metro.config.js — SKATEHUBBA MONOREPO LOCKDOWN
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// 1. Watch all workspace packages
config.watchFolders = [
  workspaceRoot,
  path.resolve(workspaceRoot, "packages"),
  path.resolve(workspaceRoot, "apps/mobile"),
];

// 2. Enable symlinks and package exports (pnpm compatibility)
config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_enablePackageExports = true;

// 3. Fix node_modules resolution (critical for pnpm workspaces)
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

config.resolver.extraNodeModules = {
  "react-native": path.resolve(workspaceRoot, "node_modules/react-native"),
  "react": path.resolve(workspaceRoot, "node_modules/react"),
  "@react-native-community": path.resolve(workspaceRoot, "node_modules/@react-native-community"),
};

// 4. Allow hierarchical lookup for monorepo
config.resolver.disableHierarchicalLookup = false;

// 5. Block problematic paths (prevents crypto, stream errors)
config.resolver.blockList = [
  ...(config.resolver.blockList || []),
  /node_modules\/react-native\/Libraries\/NewAppScreen\/.*/,
];

module.exports = config;
