import moment from 'moment'

export const randomString = () => {
  return (Math.random() + 1).toString(36).substring(2)
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// n = decimalCount
// s = dấu phân tách
// c = dấu thập phân
export function formatNumber(number: number, n: number = 0) {
  var s = ','
  var c = '.'
  var x = 3
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')'
  let num = (number ? +number : 0).toFixed(Math.max(0, n))

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','))
}

export function getImagePath(filename?: string) {
  if (!filename) return 'error'
  return `https://kmart.kbh.vn/File/GetFile?f=${filename}`
}

export const convertDateTime = (date?: string | Date, fromFormat?: string, toFormat?: string) => {
  const cDate = moment(date, fromFormat)
  return !!date && cDate.isValid() ? cDate.format(toFormat) : undefined
}

export const convertValueToTextInputMoney = (n?: number) => {
  return n === undefined || typeof n !== 'number' ? undefined : formatNumber(n)
}

export const convertTextInputMoneyToValue = (text: string) => {
  let t = text.split(',').join('')
  return t === '' ? undefined : isNaN(+t) ? 0 : +t
}

export const objectFilter = (a: object, keys: string[]) => {
  var out = {}
  keys.forEach((key) => {
    // @ts-ignore
    out[key] = a[key]
  })
  return out
}

export const castNumber = (s?: string) => {
  return s === undefined ? undefined : +s
}

export const checkImageExtension = (name: string) => {
  const lName = name.toLowerCase()
  return (
    lName.endsWith('.jpg') ||
    lName.endsWith('.jpeg') ||
    lName.endsWith('.png') ||
    lName.endsWith('.gif')
  )
}

export function numberFillZero(num: number, size: number) {
  let snum = num.toString()
  while (snum.length < size) snum = '0' + snum
  return snum
}

export function removeScriptTag(value: string) {
  return value.replace(/<.*?script.*?>.*?<\/.*?script.*?>/gim, '')
}

export const formatNumberNoFixed = (n: number, decimalLength?: number | null) => {
  const s = n.toString()
  let arrayS = s.split(',').join('').split('.')
  if (arrayS.length > 2) return s
  if (arrayS.length === 2) arrayS[1] = arrayS[1].substring(0, decimalLength ?? undefined)
  let num = arrayS.join('.')
  var arrSplit = num.split('.')
  var x = 3
  var re = '\\d(?=(\\d{' + (x || 3) + '})+$)'

  arrSplit[0] = arrSplit[0].replace(new RegExp(re, 'g'), '$&' + ',')
  return arrSplit.join('.') + (s.endsWith(',') ? '.' : '')
}

export const getFilenameOfPath = (path: string) => {
  return path.replace(/^.*[\\\/]/, '')
}
