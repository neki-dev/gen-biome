const path = require("path");

module.exports = (_, { mode, name }) => {
  const isDev = mode === "development";
  const isDemo = name === "demo";

  const pathRoot = isDemo ? path.resolve(__dirname, "demo") : __dirname;

  return {
    resolve: {
      extensions: [".ts"],
    },
    entry: [path.resolve(pathRoot, "src/index.ts")],
    output: {
      path: path.resolve(pathRoot, "dist"),
      filename: "index.js",
      libraryTarget: isDemo ? undefined : "commonjs2",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                configFile: isDemo ? "tsconfig.dev.json" : undefined,
              },
            },
          ],
        },
      ],
    },
    devtool: isDev ? "inline-source-map" : undefined,
  };
};
