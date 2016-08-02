var webpack = require('webpack');

module.exports = {
    entry: "./app/scripts/entry.js",
    output: {
        path: __dirname,
        filename: "./app/scripts/bundle.min.js"
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
            TweenMax: "gsap/src/uncompressed/TweenMax.js",
            _animation: "../utils/animation",
            _baseObject: "../common/baseObject"
        }
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    // Stop sylvester firing "Cannot resolve module 'fs'" errors
    node: {
        fs: "empty"
    }
};