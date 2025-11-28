// babel.config.js — SKATEHUBBA MOBILE
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '~': './src',
            '@hooks': './src/hooks',
            '@native': './src/native',
            '@lib': './lib',
            '@skatehubba': '../../packages',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
