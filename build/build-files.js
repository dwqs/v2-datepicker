const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;
const babel = require('babel-core');

const utilsPath = path.resolve(__dirname, '../src');
const outputPath = path.resolve(__dirname, '../lib');

const filesList = fs.readdirSync(utilsPath);

function dirExist (path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}

function transformFile (filename, name, cb) {
    babel.transformFile(path.resolve(utilsPath, filename), {
        plugins: ['add-module-exports', 'transform-es2015-modules-commonjs'],
        moduleId: name
    }, cb);
}

filesList.forEach(file => {
    const name = path.basename(file, '.js');
    if (name.indexOf('.') > 0 || name === 'index') {
        return;
    }
    transformFile(file, name, (err, result) => {
        if (err) {
            console.log('write failed', err);
        } else {
            if (!dirExist(path.resolve(__dirname, '../lib'))) {
                exec('mkdir lib');
            }

            const code = result.code;
            fs.writeFileSync(path.resolve(outputPath, file), code);
        }
    });
});
