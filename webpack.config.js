const path = require("path");
const webpack = require("webpack");
const extractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const CSS_SRC = "_src/styles/";
const JS_SRC = "_src/scripts/";

module.exports = {
  entry: {
    "bundle.min.css": [path.resolve(__dirname, CSS_SRC + "main.scss")],
    "bundle.js": [path.resolve(__dirname, JS_SRC + "index.js")],
    "bundle.min.js": [path.resolve(__dirname, JS_SRC + "index.js")]
  },
  output: {
    filename: "[name]",
    path: path.resolve(__dirname, "public/dist")
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
                  path: "postcss.config.js"
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
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  }
};
