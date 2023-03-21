const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, { mode }) => {
  const pathRoot = env.demo ? path.resolve(__dirname, 'demo') : __dirname;

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
      libraryTarget: env.demo ? undefined : 'commonjs2',
    },
    module: {
      rules: [{
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.demo.json',
          },
        }],
      }],
    },
    devtool: mode === 'development' ? 'inline-source-map' : undefined,
    optimization: mode === 'production' ? {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: { comments: false },
          },
        }),
      ],
    } : undefined,
  };
};
