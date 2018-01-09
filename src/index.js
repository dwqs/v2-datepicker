import './index.less';

import DatePicker from './date-picker.vue';

function install (Vue) {
    Vue.component(DatePicker.name, DatePicker);
}

const V2DatePicker = {
    install
};

export default V2DatePicker;
