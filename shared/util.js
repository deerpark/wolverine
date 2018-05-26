const getDate = date => {
  date = date || '20130608'
  return {
    year: date.slice(0, 4),
    month: date.slice(4, 6),
    day: date.slice(6, 8),
  }
}

const numToStringWithZero = num => {
  return num < 10 ? '0' + num : num
}

const getStringFromDate = (date, format) => `${getDate(date).year}${format ? '년 ' : ''}${getDate(date).month}${format ? '월 ' : ''}${getDate(date).day}${format ? '일' : ''}`

const getLanguageCode = (locale) => {
  const _locale = locale ? locale : 'ko-KR'
  return _locale.slice(0, 2)
}

const getCountryCode = (locale, except) => {
  const _locale = locale && locale !== except ? locale : 'ko-KR'
  return _locale.slice(3, 5).toLowerCase()
}

const getIntercalation = (year, month) => {
  let day
  if (month == '02' && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    day = 29
  } else {
    day = 28
  }
  return day
}

const util = {
  getDate,
  numToStringWithZero,
  getStringFromDate,
  getLanguageCode,
  getCountryCode,
  getIntercalation
}

export default util;
