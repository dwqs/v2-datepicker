const path = require('path');
const webpack = require('webpack');

const Components = require('./components.json');

module.exports = {
    entry: Components,
    output: {
        path: path.join(__dirname, './lib'),
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
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
