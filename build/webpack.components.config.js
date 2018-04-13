const path = require('path');
const webpack = require('webpack');

const Components = require('../components.json');

const config = require('./config');

module.exports = {
    entry: Components,
    output: {
        path: path.join(__dirname, '../lib/components'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
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
            }
        ]
    },

    externals: config.externals,

    resolve: {
        extensions: ['.vue', '.js'],
        modules: [path.join(__dirname, '../node_modules')],
        alias: config.alias
    },

    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
