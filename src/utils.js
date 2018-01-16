export const isLeapYear = year => {
    if (isNaN(year)) {
        return false;
    }
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getDaysOfMonth = (year, month) => {
    if (isNaN(year) || isNaN(month)) {
        throw new Error(`daysOfMonth: parameter's value may be not a number`);
    }

    if ([4, 6, 9, 11].includes(month)) {
        return 30;
    }
    
    return month === 2 ? (isLeapYear(year) ? 29 : 28) : 31;
};

export const getDaysOfYear = year => {
    return isLeapYear(year) ? 366 : 365;
};

export const isDate = date => {
    if (!date) {
        return false;
    }
    if (isNaN(new Date(date).getTime())) {
        return false;
    }
    return true;
};
  
export const isDateObject = val => {
    return val instanceof Date;
};

export const getClearHoursTime = time => {
    const temp = new Date(time);
    temp.setHours(0, 0, 0, 0);
    return temp.getTime();
};

export const getFirstDateOfMonth = date => {
    if (isDate(date)) {
        const temp = new Date(date.getTime());
        temp.setDate(1);
        temp.setHours(0, 0, 0, 0);
        return temp;
    }
    throw new Error(`getFirstDateOfMonth: 1st parameter may be not a valid date`);
};

export const getLastDateOfMonth = date => {
    if (isDate(date)) {
        const temp = new Date(date.getTime());
        const daysOfMonth = getDaysOfMonth(temp.getFullYear(), temp.getMonth() + 1);
        temp.setDate(daysOfMonth);
        temp.setHours(23, 59, 59, 999);
        return temp;
    }
    throw new Error(`getLastDateOfMonth: 1st parameter may be not a valid date`);
};

export const nextDate = (date, offset = 1) => {
    if (isDate(date)) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset);
    }
    throw new Error(`nextDate: 1st parameter may be not a valid date`);
};

export const nextMonth = (date, offset = 1) => {
    if (isDate(date)) {
        return new Date(date.getFullYear(), date.getMonth() + offset, date.getDate());
    }
    throw new Error(`nextMonth: 1st parameter may be not a valid date`);
};

export const nextYear = (date, offset = 1) => {
    if (isDate(date)) {
        return new Date(date.getFullYear() + offset, date.getMonth(), date.getDate());
    }
    throw new Error(`nextYear: 1st parameter may be not a valid date`);
};

export const addZero = val => {
    if (isNaN(val)) {
        return val;
    }
    return val > 9 ? val : `0${val}`;
};

export const formatDate = (date, formatStr) => {
    if (!isDate(date)) {
        return NaN;
    }
    let str = formatStr || 'yyyy-MM-dd';
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
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
export const contains = (root, target) => {
    // root 节点是否包含 target 节点
    const isElement = Object.prototype.toString.call(root).includes('Element') && Object.prototype.toString.call(target).includes('Element');
    if (!isElement) {
        return false;
    }
    let node = target;
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};
