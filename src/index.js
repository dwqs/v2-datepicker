import './index.less';

import DatePicker from '../components/date-picker/index';
import DatePickerRange from '../components/date-picker-range/index';

const components = [
    DatePicker,
    DatePickerRange
];

function install (Vue) {
    if (install.installed) return;
    install.installed = true;
    components.map(component => {
        Vue.component(component.name, component);
    });
}

export {
    DatePicker,
    DatePickerRange
};

const V2DatePicker = {
    install,
    DatePicker,
    DatePickerRange
};

export default V2DatePicker;

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
