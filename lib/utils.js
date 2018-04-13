'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isLeapYear = exports.isLeapYear = function isLeapYear(year) {
    if (isNaN(year)) {
        return false;
    }
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};

var getDaysOfMonth = exports.getDaysOfMonth = function getDaysOfMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
        throw new Error('daysOfMonth: parameter\'s value may be not a number');
    }

    if ([4, 6, 9, 11].includes(month)) {
        return 30;
    }

    return month === 2 ? isLeapYear(year) ? 29 : 28 : 31;
};

var getDaysOfYear = exports.getDaysOfYear = function getDaysOfYear(year) {
    return isLeapYear(year) ? 366 : 365;
};

var isDate = exports.isDate = function isDate(date) {
    if (!date) {
        return false;
    }
    if (isNaN(new Date(date).getTime())) {
        return false;
    }
    return true;
};

var isDateObject = exports.isDateObject = function isDateObject(val) {
    return val instanceof Date;
};

var getClearHoursTime = exports.getClearHoursTime = function getClearHoursTime(time) {
    var temp = new Date(time);
    temp.setHours(0, 0, 0, 0);
    return temp.getTime();
};

var getFirstDateOfMonth = exports.getFirstDateOfMonth = function getFirstDateOfMonth(date) {
    if (isDate(date)) {
        var temp = new Date(date.getTime());
        temp.setDate(1);
        temp.setHours(0, 0, 0, 0);
        return temp;
    }
    throw new Error('getFirstDateOfMonth: 1st parameter may be not a valid date');
};

var getLastDateOfMonth = exports.getLastDateOfMonth = function getLastDateOfMonth(date) {
    if (isDate(date)) {
        var temp = new Date(date.getTime());
        var daysOfMonth = getDaysOfMonth(temp.getFullYear(), temp.getMonth() + 1);
        temp.setDate(daysOfMonth);
        temp.setHours(23, 59, 59, 999);
        return temp;
    }
    throw new Error('getLastDateOfMonth: 1st parameter may be not a valid date');
};

function getValidDate(year, month, date) {
    // fix #5
    // 进行上下月切换时，判断当前的日期是否超出了当前月的天数
    var days = getDaysOfMonth(year, month + 1);
    return date > days ? days : date;
}

var nextDate = exports.nextDate = function nextDate(date) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    if (isDate(date)) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset);
    }
    throw new Error('nextDate: 1st parameter may be not a valid date');
};

var nextMonth = exports.nextMonth = function nextMonth(date) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    if (isDate(date)) {
        var y = date.getFullYear();
        var m = date.getMonth() + offset;
        var d = date.getDate();

        return new Date(y, m, getValidDate(y, m, d));
    }
    throw new Error('nextMonth: 1st parameter may be not a valid date');
};

var nextYear = exports.nextYear = function nextYear(date) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    if (isDate(date)) {
        return new Date(date.getFullYear() + offset, date.getMonth(), date.getDate());
    }
    throw new Error('nextYear: 1st parameter may be not a valid date');
};

var addZero = exports.addZero = function addZero(val) {
    if (isNaN(val)) {
        return val;
    }
    return val > 9 ? val : '0' + val;
};

var formatDate = exports.formatDate = function formatDate(date, formatStr) {
    if (!isDate(date)) {
        return NaN;
    }
    var str = formatStr || 'yyyy-MM-dd';
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, date.getYear() % 100 > 9 ? (date.getYear() % 100).toString() : '0' + date.getYear() % 100);
    str = str.replace(/MM/, addZero(date.getMonth() + 1));
    str = str.replace(/M/g, date.getMonth() + 1);
    str = str.replace(/dd|DD/, addZero(date.getDate()));
    str = str.replace(/d|D/g, date.getDate());
    // str = str.replace(/hh|HH/, addZero(date.getHours()));
    // str = str.replace(/h|H/g, date.getHours());
    // str = str.replace(/mm/, addZero(date.getMinutes()));
    // str = str.replace(/m/g, date.getMinutes());
    // str = str.replace(/ss|SS/, addZero(date.getSeconds()));
    // str = str.replace(/s|S/g, date.getSeconds());
    return str;
};

// 节点包含
var contains = exports.contains = function contains(root, target) {
    // root 节点是否包含 target 节点
    var isElement = Object.prototype.toString.call(root).includes('Element') && Object.prototype.toString.call(target).includes('Element');
    if (!isElement) {
        return false;
    }
    var node = target;
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

var getPanelPosition = exports.getPanelPosition = function getPanelPosition(panelHeight, panelWidth, wrapRect) {
    var top = wrapRect.top,
        bottom = wrapRect.bottom,
        left = wrapRect.left,
        right = wrapRect.right,
        height = wrapRect.height;

    var offset = 10;

    var docHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var docScrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    var docWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    var minNeedHeight = bottom + panelHeight + offset;
    var minNeedWidth = left + panelWidth + offset;

    var panelTop = 0;
    var panelLeft = 0;

    if (docHeight > minNeedHeight) {
        // bottom
        panelTop = bottom;
    } else if (top > panelHeight + offset) {
        // top
        panelTop = top - (panelHeight + offset);
    } else {
        panelTop = bottom - (minNeedHeight - docHeight);
    }

    if (docWidth > minNeedWidth) {
        panelLeft = left;
    } else if (left < docWidth) {
        panelLeft = left - (minNeedWidth - docWidth);
    } else {
        // left
        panelLeft = left - panelWidth;
    }

    return {
        top: panelTop >= 0 ? panelTop : 0,
        left: panelLeft >= 0 ? panelLeft : 0
    };
};