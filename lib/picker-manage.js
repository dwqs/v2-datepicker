"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var pickerId = 0;

function PickerManage() {
    this.pickers = [];
}

PickerManage.prototype.addPicker = function (type, picker) {
    pickerId++;
    this.pickers.push({
        pid: pickerId,
        type: type,
        picker: picker
    });
    return pickerId;
};

PickerManage.prototype.updatePicker = function (pid) {
    this.pickers.forEach(function (item) {
        if (item.pid !== pid) {
            item.picker.shown = false;
        }
    });
};

PickerManage.prototype.deletePicker = function (pid) {
    this.pickers = this.pickers.filter(function (item) {
        return item.pid !== pid;
    });
    return -1;
};

PickerManage.prototype.destroyed = function () {
    this.pickers = [];
    pickerId = 0;
};

var pickerManage = new PickerManage();

exports.default = pickerManage;
module.exports = exports["default"];