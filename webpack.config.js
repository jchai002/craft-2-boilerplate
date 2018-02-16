const path = require("path");
const webpack = require("webpack");
const extractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const autoprefixer = require("autoprefixer");

const CSS_SRC = "_src/styles/";
const JS_SRC = "_src/scripts/";
const VENDORS = ["jQuery", "bootstrap"];

module.exports = {
  context: __dirname,
  entry: {
    "bundle.min.css": [path.resolve(__dirname, CSS_SRC + "main.scss")],
    "bundle.min.js": [path.resolve(__dirname, JS_SRC + "index.js")]
  },
  output: {
    filename: "[name]",
    path: path.resolve(__dirname, "public/assets")
  },
  resolve: {
    modules: [path.resolve(__dirname, JS_SRC), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"]
        })
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader" //  interprets @import and url() like import/require() and will resolve them.
            },
            {
              loader: "postcss-loader", // postcss loader so we can use autoprefixer
              options: {
                config: {
                  path: path.resolve(__dirname, "postcss.config.js")
                }
              }
            },
            {
              loader: "sass-loader" // compiles Sass to CSS
            }
          ]
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["env"]
        }
      }
    ]
  },
  devtool: "cheap-eval-source-map",
  plugins: [
    new extractTextPlugin("bundle.min.css"),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        postcss: [autoprefixer]
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"]
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false, // remove comments
      compress: {
        unused: true,
        dead_code: true, // big one--strip code that will never execute
        warnings: false, // good for prod apps so users can't peek behind curtain
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true, // strips console statements
        sequences: true,
        booleans: true
      }
    }),
    new CompressionPlugin({
      include: /\.min\.js$/,
      algorithm: "gzip"
    })
  ],
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  }
};
