let pickerId = 0;

function PickerManage () {
    this.pickers = [];
}

PickerManage.prototype.addPicker = function (type, picker) {
    pickerId++;
    this.pickers.push({
        pid: pickerId,
        type,
        picker
    });
    return pickerId;
};

PickerManage.prototype.updatePicker = function (pid) {
    this.pickers.forEach(item => {
        if (item.pid !== pid) {
            item.picker.shown = false;
        }
    });
};

PickerManage.prototype.deletePicker = function (pid) {
    this.pickers = this.pickers.filter(item => item.pid !== pid);
    return -1;
};

PickerManage.prototype.destroyed = function () {
    this.pickers = [];
    pickerId = 0;
};

const pickerManage = new PickerManage();

export default pickerManage;
