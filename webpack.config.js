var webpack = require('webpack');

module.exports = {
    entry: "./app/scripts/entry.js",
    output: {
        path: __dirname,
        filename: "./app/scripts/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|md)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    resolve: {
        alias: {
            _baseObject: "../common/baseObject"
        }
    },
    // Stop sylvester firing "Cannot resolve module 'fs'" errors
    node: {
      fs: "empty"
    }
};