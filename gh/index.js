import 'babel-polyfill';
import Vue from 'vue';

const env = process.env.NODE_ENV || 'development';

if (env !== 'development') {
    Vue.config.devtools = false;
    Vue.config.productionTip = false;
}

import App from './app';

new Vue({
    el: '#app',
    render: (h) => h(App)
});