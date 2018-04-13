const path = require('path');
const webpack = require('webpack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const os = require('os');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './gh/index')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.vue', '.js'],
        modules: [path.join(__dirname, './node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'v2-datepicker': path.resolve(__dirname, './'),
            'main': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'tpl.html'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ProgressBarPlugin()
    ]
};
