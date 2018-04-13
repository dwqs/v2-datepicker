'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];

var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        timeoutDuration = 1;
        break;
    }
};

function microtaskDebounce(fn) {
    var called = false;
    return function () {
        if (called) {
            return;
        }
        called = true;
        window.Promise.resolve().then(function () {
            called = false;
            fn();
        });
    };
}

function taskDebounce(fn) {
    var scheduled = false;
    return function () {
        if (!scheduled) {
            scheduled = true;
            setTimeout(function () {
                scheduled = false;
                fn();
            }, timeoutDuration);
        }
    };
}

var supportsMicroTasks = isBrowser && window.Promise;

exports.default = supportsMicroTasks ? microtaskDebounce : taskDebounce;
module.exports = exports['default'];