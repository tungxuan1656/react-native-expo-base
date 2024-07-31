import React, { createRef, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Dimensions, Keyboard, StyleSheet, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DatePicker, {
  ModernDateTimePickerConfig,
  ModernDateTimePickerOptions,
} from 'react-native-tx-modern-datetimepicker'
import moment from 'moment'
import { AppColors, AppFont, AppFontSize, AppIcons } from '@/app/assets'
// import I18n from 'src/controllers/language/I18n'

export const datePickerConfigsVN: ModernDateTimePickerConfig = {
  dayNamesShort: ['TH2', 'TH3', 'TH4', 'TH5', 'TH6', 'TH7', 'CN'],
  monthNames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => `Tháng ${i}`),
  selectedFormat: 'YYYY/MM/DD',
  dateFormat: 'YYYY/MM/DD',
  monthYearFormat: 'YYYY/MM',
  timeFormat: 'HH:mm',
  hour: 'Giờ',
  minute: 'Phút',
  timeSelect: 'Chọn',
  timeClose: 'Đóng',
  textSeparatorMonthYear: '|',
}

export const optionsDatePicker: ModernDateTimePickerOptions = {
  backgroundColor: AppColors.bgMain,
  mainColor: AppColors.buttonFocus, // màu ô chọn
  textHeaderColor: AppColors.textExtra, // text header
  selectedTextColor: AppColors.white, // text trong chọn
  textDefaultColor: AppColors.textExtra, // text ngày
  textSecondaryColor: AppColors.textExtra, // text tuần
  borderColor: AppColors.bgMain,
  headerFont: AppFont.medium,
  textHeaderFontSize: AppFontSize.medium,
  defaultFont: AppFont.medium,
  textFontSize: AppFontSize.medium,
  viewHeaderItemStyle: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: AppColors.strokeExtra,
    paddingHorizontal: 12,
  },
  textTodayStyle: {
    fontFamily: AppFont.semiBold,
  },
  textDayNamesStyle: {
    color: AppColors.textBlur,
    fontSize: AppFontSize.small,
  },
}

export type GDateTimePickerMode = 'time' | 'dateTimePicker' | 'calendar' | 'monthYear' | undefined

type GDateTimePickerShowProps = {
  initDate?: string
  mode?: GDateTimePickerMode
  onTimeChange?: (time: string) => void
  onDateChange?: (date: string) => void
  onDateTimeChange?: (dateTime: string) => void
  onMonthYearChange?: (monthYear: string) => void
  maxDate?: string
  minDate?: string
  dateFormat?: string
}

type GDateTimePickerProps = {
  show: (prop: GDateTimePickerShowProps) => void
  hide: () => void
}

const GDateTimePickerRef = createRef<GDateTimePickerProps | null>()

export const GDateTimePicker = {
  show: ({
    initDate,
    mode,
    onTimeChange,
    onDateChange,
    onDateTimeChange,
    onMonthYearChange,
    maxDate,
    minDate,
    dateFormat = 'YYYY/MM/DD',
  }: GDateTimePickerShowProps) => {
    Keyboard.dismiss()
    GDateTimePickerRef.current?.show({
      initDate,
      mode,
      onTimeChange,
      onDateChange,
      onDateTimeChange,
      onMonthYearChange,
      maxDate,
      minDate,
      dateFormat,
    })
  },
  hide: () => GDateTimePickerRef.current?.hide(),
}

export const GDateTimePickerComponent = () => {
  const [showModal, setShowModal] = useState(false)
  const [initDate, setInitDate] = useState<string | undefined>(undefined)
  const [mode, setMode] = useState<GDateTimePickerMode>('calendar')
  const [dateFormat, setDateFormat] = useState('YYYYMMDD')
  // callback index did press
  const onTimeChangeRef = useRef<Function | null>(null)
  const onDateChangeRef = useRef<Function | null>(null)
  const onDateTimeChangeRef = useRef<Function | null>(null)
  const onMonthYearChangeRef = useRef<Function | null>(null)
  const [maxDate, setMaxDate] = useState<string | undefined>(undefined)
  const [minDate, setMinDate] = useState<string | undefined>(undefined)
  const insets = useSafeAreaInsets()
  const [time, setTime] = useState('')

  useLayoutEffect(() => {
    // @ts-ignore
    GDateTimePickerRef.current = {
      show: ({
        initDate,
        mode,
        onTimeChange,
        onDateChange,
        onDateTimeChange,
        onMonthYearChange,
        maxDate,
        minDate,
        dateFormat,
      }: GDateTimePickerShowProps) => {
        onTimeChangeRef.current = onTimeChange ?? null
        onDateChangeRef.current = onDateChange ?? null
        onDateTimeChangeRef.current = onDateTimeChange ?? null
        onMonthYearChangeRef.current = onMonthYearChange ?? null
        setMode(mode)
        setInitDate(initDate)
        setMaxDate(maxDate ? maxDate : undefined)
        setMinDate(minDate ? minDate : undefined)
        setDateFormat(dateFormat ?? 'YYYYMMDD')
        setShowModal(true)
        if (mode === 'dateTimePicker') {
          if (initDate) setTime(moment(initDate, `${dateFormat} HH:mm`).format('HH:mm'))
          else setTime('00:00')
        }
      },
      hide: onClosePicker,
    }
  }, [])

  const onClosePicker = useCallback(() => {
    setShowModal(false)
  }, [])

  const renderDateTimePicker = useCallback(() => {
    if (!showModal) return null
    return (
      <DatePicker
        options={optionsDatePicker}
        selected={initDate}
        current={initDate ?? minDate}
        onDateChange={(date) => {
          onDateChangeRef.current?.(date)
          if (mode === 'dateTimePicker') onDateTimeChangeRef.current?.(`${date} ${time}`)
          onClosePicker()
        }}
        onTimeChange={(time) => {
          setTime(time)
          onTimeChangeRef.current?.(time)
          if (mode === 'time') {
            onClosePicker()
          }
        }}
        onMonthYearChange={(date) => {
          onMonthYearChangeRef.current?.(date)
          if (mode === 'monthYear') {
            onClosePicker()
          }
        }}
        mode={mode ?? 'calendar'}
        configs={{
          ...datePickerConfigsVN,
          dateFormat: dateFormat,
          selectedFormat: dateFormat,
        }}
        maximumDate={maxDate}
        minimumDate={minDate}
        minuteInterval={1}
      />
    )
  }, [showModal])

  return (
    <ReactNativeModal
      isVisible={showModal}
      onBackdropPress={onClosePicker}
      onBackButtonPress={onClosePicker}
      useNativeDriver
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      style={{ justifyContent: 'flex-end', margin: 0 }}>
      <View style={[styles.content, { paddingBottom: insets.bottom }]}>
        {renderDateTimePicker()}
      </View>
    </ReactNativeModal>
  )
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: AppColors.bgMain,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 8,
    width: Dimensions.get('window').width,
  },
})
