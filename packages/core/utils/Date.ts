import { AppConst } from '@/app/constants'
import I18n from '@/app/controllers/languages/I18n'
import moment, { Moment } from 'moment'

export type DateRangeDefinition =
  | 'today'
  | 'yesterday'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisQuarter'
  | 'lastQuarter'
  | 'thisYear'
  | 'lastYear'
  | 'custom'
  | 't1'
  | 't2'
  | 't3'
  | 't4'
  | 't5'
  | 't6'
  | 't7'
  | 't8'
  | 't9'
  | 't10'
  | 't11'
  | 't12'

export type DateRange = {
  from: Moment
  to: Moment
  type: DateRangeDefinition
}

const getSubtractOfMonthVsCM = (cm: number, month: number) => {
  return cm - month >= 0 ? cm - month : cm - month + 12
}

export const getRangeDate = (type: DateRangeDefinition) => {
  let dateRange: DateRange = {
    type: type,
    from: moment(),
    to: moment(),
  }

  const cm = parseInt(moment().startOf('day').startOf('month').format('MM'))

  switch (type) {
    case 'today':
      dateRange.from = moment().startOf('day')
      dateRange.to = moment().startOf('day')
      break
    case 'yesterday':
      dateRange.from = moment().startOf('day').subtract(1, 'day')
      dateRange.to = moment().startOf('day').subtract(1, 'day')
      break
    case 'thisWeek':
      dateRange.from = moment().startOf('day').startOf('week')
      dateRange.to = moment().startOf('day').endOf('week').startOf('day')
      break
    case 'lastWeek':
      dateRange.from = moment().startOf('day').weekday(-7)
      dateRange.to = moment().startOf('day').weekday(-1)
      break
    case 'thisMonth':
      dateRange.from = moment().startOf('day').startOf('month')
      dateRange.to = moment().startOf('day').endOf('month').startOf('day')
      break
    case 'lastMonth':
      dateRange.from = moment().startOf('day').subtract(1, 'month').startOf('month')
      dateRange.to = moment().startOf('day').subtract(1, 'month').endOf('month').startOf('day')
      break
    case 'thisQuarter':
      dateRange.from = moment()
        .startOf('day')
        .quarter(moment().startOf('day').quarter())
        .startOf('quarter')
      dateRange.to = moment()
        .startOf('day')
        .quarter(moment().startOf('day').quarter())
        .endOf('quarter')
        .startOf('day')
      break
    case 'lastQuarter':
      dateRange.from = moment()
        .startOf('day')
        .quarter(moment().startOf('day').quarter())
        .subtract(1, 'quarter')
        .startOf('quarter')
      dateRange.to = moment()
        .startOf('day')
        .quarter(moment().startOf('day').quarter())
        .subtract(1, 'quarter')
        .endOf('quarter')
        .startOf('day')
      break
    case 'thisYear':
      dateRange.from = moment().startOf('day').startOf('year')
      dateRange.to = moment().startOf('day').endOf('year').startOf('day')
      break
    case 'lastYear':
      dateRange.from = moment().startOf('day').subtract(1, 'year').startOf('year')
      dateRange.to = moment().startOf('day').subtract(1, 'year').endOf('year').startOf('day')
      break
    case 't1':
      dateRange.from = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 1), 'month')
        .startOf('month')
      dateRange.to = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 1), 'month')
        .endOf('month')
        .startOf('day')
      break
    case 't2':
      dateRange.from = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 2), 'month')
        .startOf('month')
      dateRange.to = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 2), 'month')
        .endOf('month')
        .startOf('day')
      break
    case 't3':
      dateRange.from = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 3), 'month')
        .startOf('month')
      dateRange.to = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 3), 'month')
        .endOf('month')
        .startOf('day')
      break
    case 't4':
      dateRange.from = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 4), 'month')
        .startOf('month')
      dateRange.to = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 4), 'month')
        .endOf('month')
        .startOf('day')
      break
    case 't5':
      dateRange.from = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 5), 'month')
        .startOf('month')
      dateRange.to = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 5), 'month')
        .endOf('month')
        .startOf('day')
      break
    case 't6':
      dateRange.from = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 6), 'month')
        .startOf('month')
      dateRange.to = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 6), 'month')
        .endOf('month')
        .startOf('day')
      break
    case 't7':
      dateRange.from = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 7), 'month')
        .startOf('month')
      dateRange.to = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 7), 'month')
        .endOf('month')
        .startOf('day')
      break
    case 't8':
      dateRange.from = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 8), 'month')
        .startOf('month')
      dateRange.to = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 8), 'month')
        .endOf('month')
        .startOf('day')
      break
    case 't9':
      dateRange.from = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 9), 'month')
        .startOf('month')
      dateRange.to = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 9), 'month')
        .endOf('month')
        .startOf('day')
      break
    case 't10':
      dateRange.from = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 10), 'month')
        .startOf('month')
      dateRange.to = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 10), 'month')
        .endOf('month')
        .startOf('day')
      break
    case 't11':
      dateRange.from = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 11), 'month')
        .startOf('month')
      dateRange.to = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 11), 'month')
        .endOf('month')
        .startOf('day')
      break
    case 't12':
      dateRange.from = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 12), 'month')
        .startOf('month')
      dateRange.to = moment()
        .startOf('day')
        .subtract(getSubtractOfMonthVsCM(cm, 12), 'month')
        .endOf('month')
        .startOf('day')
      break
    default:
      break
  }
  return dateRange
}

export const getTitleDateRange = (d: DateRange) => {
  if (d.type !== 'custom') return I18n.t(`dateRange.${d.type}`)
  return `${d.from.format(AppConst.format.date)} - ${d.to.format(AppConst.format.date)}`
}
