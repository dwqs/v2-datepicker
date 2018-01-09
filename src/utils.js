export const isLeapYear = year => {
    if (isNaN(year)) {
        return false;
    }
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const daysOfMonth = (year, month) => {
    if (isNaN(year) || isNaN(month)) {
        throw new Error(`Parameter's value may be not a number`);
    }
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
};

export const isDate = date => {
    if (date === null || date === undefined) {
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
    str = str.replace(/hh|HH/, addZero(date.getHours()));
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, addZero(date.getMinutes()));
    str = str.replace(/m/g, date.getMinutes());
    str = str.replace(/ss|SS/, addZero(date.getSeconds()));
    str = str.replace(/s|S/g, date.getSeconds());
    return str;
};
