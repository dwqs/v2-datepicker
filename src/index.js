import './index.less';

import DatePicker from './date-picker.vue';
import DatePickerRange from './date-range-picker.vue';

function install (Vue) {
    Vue.component(DatePickerRange.name, DatePickerRange);
    Vue.component(DatePicker.name, DatePicker);
}

const V2DatePicker = {
    install
};

export default V2DatePicker;
