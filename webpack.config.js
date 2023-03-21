const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (_, { mode }) => {
  const isDev = mode === 'development';
  const pathRoot =isDev ? path.resolve(__dirname, 'demo') : __dirname;

  return {
    resolve: {
      extensions: ['.ts'],
    },
    entry: [
      path.resolve(pathRoot, 'src/index.ts'),
    ],
    output: {
      path: path.resolve(pathRoot, 'dist'),
      filename: 'index.js',
      libraryTarget: isDev ? undefined : 'commonjs2',
    },
    module: {
      rules: [{
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: isDev ? 'tsconfig.dev.json' : undefined,
          },
        }],
      }],
    },
    devtool: isDev ? 'inline-source-map' : undefined,
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: { comments: false },
          },
        }),
      ],
    },
  };
};
