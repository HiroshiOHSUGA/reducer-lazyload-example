const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const sourcePath = path.join(__dirname, "./src");
const outPath = path.join(__dirname, "./dist");
const pathsToClean = ["dist/*"];

module.exports = {
  context: sourcePath,
  mode: "production",
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    mainFields: ["module", "browser", "main"],
    alias: {
      app: path.resolve(__dirname, "src/app/"),
    },
  },
  entry: {
    app: [
      "./client.tsx",
    ],
  },
  output: {
    path: outPath,
    filename: "bundle-[name]-[hash].js",
    chunkFilename: "chunk-[name]-[chunkhash].js",
    publicPath: "/static/",
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/^.*test\.tsx?$/],
        use: ["ts-loader"],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
    }),
    new CleanWebpackPlugin(pathsToClean, {}),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: "index.html",
      template: "index.html",
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: -10,
        },
      },
    },
    runtimeChunk: true,
  }
};
