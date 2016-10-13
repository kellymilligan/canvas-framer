'use strict';

const Path = require('path')
const Webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractSASS = new ExtractTextPlugin('styles/bundle.css');

module.exports = (options) => {

    let webpackConfig = {
        devtool: options.devtool,
        entry: [
            `webpack-dev-server/client?http://localhost:${options.port}`,
            'webpack/hot/dev-server',
            './src/scripts/index'
        ],
        output: {
            path: Path.join(__dirname, 'dist'),
            filename: 'scripts/bundle.js'
        },
        plugins: [
            new Webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
                }
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: false
            }),
            new CopyWebpackPlugin([
                { from: 'src/styles/critical.css', to: 'styles/critical.css' },
                { from: 'src/images', to: 'images' },
            ], {
                ignore: [],
                copyUnmodified: true
            })
        ],
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }]
        },
        // Fix for: Module not found: Error: Cannot resolve module 'fs'
        node: {
          fs: "empty"
        }
    };

    if ( options.isProduction ) {

        webpackConfig.entry = ['./src/scripts/index'];

        webpackConfig.plugins.push(
            new Webpack.optimize.OccurenceOrderPlugin(),
            new Webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            }),
            ExtractSASS
        );

        webpackConfig.module.loaders.push({
            test: /\.scss$/i,
            loader: ExtractSASS.extract(['css', 'sass'])
        });

    }
    else {

        webpackConfig.plugins.push(
            new Webpack.HotModuleReplacementPlugin()
        );

        webpackConfig.module.loaders.push({
            test: /\.scss$/i,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.js$/,
            loader: 'eslint',
            exclude: /node_modules/
        });

        webpackConfig.devServer = {
            contentBase: './dist',
            hot: true,
            port: options.port,
            inline: true,
            progress: true
        };
    }

    return webpackConfig;

}