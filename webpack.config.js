const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist/static"),
    filename: "bundle.[contenthash].js",
    clean: true
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
        resolve: {
          extensions: ['.jsx', '.tsx', '.ts', '.js']
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use:  ["style-loader", "css-loader", "sass-loader"],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    })
  ]
}



