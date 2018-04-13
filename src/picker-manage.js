let pickerId = 0;

class PickerManage {
    constructor () {
        this.pickers = [];
    }

    addPicker (type, picker) {
        pickerId++;
        this.pickers.push({
            pid: pickerId,
            type,
            picker
        });
        return pickerId;
    }

    updatePicker (pid) {
        this.pickers.forEach(item => {
            if (item.pid !== pid) {
                item.picker.shown = false;
            }
        });
    }

    deletePicker (pid) {
        this.pickers = this.pickers.filter(item => item.pid !== pid);
        return -1;
    }

    destroyed () {
        this.pickers = [];
        pickerId = 0;
    }
};

const pickerManage = new PickerManage();

export default pickerManage;
