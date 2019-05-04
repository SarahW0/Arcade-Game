const path = require("path");

module.exports = {
  entry: "./js/es6/app.js",
  mode: "production",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "js")
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
