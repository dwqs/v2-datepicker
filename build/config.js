const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');

const files = fs.readdirSync(path.resolve(__dirname, '../src'));

const vueExternal = {
    'vue': {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
    }
};

let externals = {};

externals['v2-datepicker/src/locals'] = 'v2-datepicker/lib/locals';

files.forEach(file => {
    const name = path.basename(file, '.js');
    if (name.indexOf('.') > 0 || name === 'index') {
        return;
    }
    externals[`v2-datepicker/src/${name}`] = `v2-datepicker/lib/${name}`;
});

externals = [
    Object.assign({}, externals, vueExternal),
    nodeExternals()
];

const alias = {
    main: path.resolve(__dirname, '../src'),
    'v2-datepicker': path.resolve(__dirname, '../')
};

module.exports = {
    alias,
    externals
};
