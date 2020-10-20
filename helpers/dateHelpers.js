const formatLeftZero = (thatNumber) => {
    if (thatNumber < 10) {
        return '0' + thatNumber.toString();
    } else {
        return thatNumber.toString();
    }
}

const yearMonthFormat = (year, month) => {
    return `${year}-${formatLeftZero(month)}`;
}

const yearMonthDayFormat = (year, month , day) => {
    return `${year}-${formatLeftZero(month)}-${formatLeftZero(day)}`;
}

module.exports = { yearMonthFormat, yearMonthDayFormat };