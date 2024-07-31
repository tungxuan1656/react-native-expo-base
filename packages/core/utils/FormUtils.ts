export const replaceIfLastComma = (s?: string | null) => {
  if (s) {
    if (s.endsWith(',')) {
      let temp = s.replace(new RegExp(',$'), '.')
      return temp
    } else return s
  } else return null
}

export const getFormNumberExcept = (s?: string | null, decimalLength?: number | null) => {
  if (s) {
    let arrayS = s.split('.')
    if (arrayS.length > 2) return 0
    if (arrayS.length === 2) arrayS[1] = arrayS[1].substring(0, decimalLength ?? 6)
    let ss = arrayS.join('.')
    if (ss.endsWith('.')) return ss
    else if (ss.endsWith('0') && ss.split('.').length > 1) return ss
    else if (ss === '-') return ss
    else {
      let t = ss.split(',').join('')
      return t === '' ? null : isNaN(+t) ? 0 : +t
    }
  } else return null
}

const getFormNumber = (s?: string | number | null) => {
  if (s === undefined || s === null) return s
  if (typeof s === 'string') {
    let t = s.split(',').join('')
    return t === '' ? null : isNaN(+t) ? 0 : +t
  } else {
    return s
  }
}

const getFormStringByNumber = (s?: string | number | null) => {
  if (s === undefined || s === null) return ''
  if (typeof s === 'string') return s
  else return formatNumber(s)
}

const getFormNumberOfMaxMin = (s?: string | number | null, max?: number, min?: number) => {
  if (s === null || s === undefined) return null
  if (typeof s === 'string') return s
  else {
    if (max && min != undefined) return Math.max(Math.min(s, max), min)
    else if (max) return Math.min(max, s)
    else if (min) return Math.max(min, s)
    else return s
  }
}

function formatNumber(number: number) {
  let first = ''
  var num = number.toString()
  if (number < 0) {
    num = num.replace('-', '')
    first = '-'
  }
  var arrSplit = num.split('.')
  var x = 3
  var re = '\\d(?=(\\d{' + (x || 3) + '})+$)'

  arrSplit[0] = arrSplit[0].replace(new RegExp(re, 'g'), '$&' + ',')
  return first + arrSplit.join('.')
}

const formatString = (s: string, decimalLength?: number | null) => {
  let arrayS = s.split(',').join('').split('.')
  if (arrayS.length > 2) return s
  if (arrayS.length === 2) arrayS[1] = arrayS[1].substring(0, decimalLength ?? undefined)
  let num = arrayS.join('.')
  var arrSplit = num.split('.')
  var x = 3
  var re = '\\d(?=(\\d{' + (x || 3) + '})+$)'

  arrSplit[0] = arrSplit[0].replace(new RegExp(re, 'g'), '$&' + ',')
  if (decimalLength === 0) return arrSplit[0]
  return arrSplit.join('.') + (s.endsWith(',') ? '.' : '')
}

function formatNumberWithDecimal(number: number, n: number = 0) {
  var s = ','
  var c = '.'
  var x = 3
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = (number ?? 0).toFixed(Math.max(0, n))

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','))
}

export const getStringByValue = (value?: number | string, decimalLength?: number | null) => {
  if (typeof value === 'number') {
    if (typeof decimalLength === 'number') return formatNumberWithDecimal(value, decimalLength)
    else return formatNumber(value)
  }
  if (typeof value === 'string') {
    return formatString(value, decimalLength)
  }
  return null
}

export const getNumberIfValid = (s?: string | number) => {
  if (s !== undefined && typeof s === 'string') {
    let st = s
    if (s.endsWith(',')) st = s.replace(/.$/, '.')
    let t = st.split(',').join('')
    return t === '' ? null : isNaN(+t) ? st : +t
  }
  if (typeof s === 'number') {
    return s
  }
  return s ?? null
}
