const path = require('path');
const webpack = require('webpack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const os = require('os');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index')
    },
    output: {
        path: path.join(__dirname, './lib'),
        filename: '[name].js',
        library: 'V2DatePicker',
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
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'css-loader',
                    use: ['postcss-loader', 'less-loader']
                })
            }
        ]
    },

    externals: {
        'vue': {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        }),

        // new ParallelUglifyPlugin({
        //     workerCount: os.cpus().length,
        //     cacheDir: '.cache/',
        //     sourceMap: true,
        //     uglifyJS: {
        //         compress: {
        //             warnings: false,
        //             /* eslint-disable */
        //             drop_debugger: true,
        //             drop_console: true
        //         },
        //         mangle: true
        //     }
        // }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ProgressBarPlugin()
    ]
};
