const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const gutil = require('gulp-util');

const webpackDevConfig = require('./webpack.dev.config.js');
const config = require('../config/index');

const compiler = webpack(webpackDevConfig);
const server = new WebpackDevServer(compiler, webpackDevConfig.devServer);

const env = process.env.NODE_ENV || 'development';
const url = `localhost:${config.dev.port}/`;

function compiledFail () {
    console.log(gutil.colors.white('Webpack 编译失败: \n'));
}

server.listen(config.dev.port, 'localhost', (err) => {
    if (err) {
        compiledFail();
        throw new gutil.PluginError('[webpack-dev-server err]', err);
    }
});

// 编译完成
compiler.plugin('done', (stats) => {
    console.log(gutil.colors.green(`Webpack 编译成功, open browser to visit ${url}\n`));
});

// 编译失败
compiler.plugin('failed', (err) => {
    compiledFail();
    throw new gutil.PluginError('[webpack build err]', err);
});

// 监听文件修改
compiler.plugin('compilation', compilation => {});
