import { AppColors } from '@/app/assets'
import { AppTypo } from '@/app/constants'
import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

type Props = {
  style?: StyleProp<ViewStyle>
  label?: string
  labelStyle?: StyleProp<TextStyle>
  type?: 'pending' | 'processing' | 'success' | 'stopped' | 'waitback'
}

const textColor = {
  pending: AppColors.textBlur,
  processing: AppColors.textExtra,
  success: AppColors.textActivate,
  stopped: AppColors.textValidate,
  waitback: AppColors.textWarning,
}

const backgroundColor = {
  pending: AppColors.bgExtra,
  processing: AppColors.bgExtra,
  success: AppColors.bgActivate,
  stopped: AppColors.bgValidate,
  waitback: AppColors.bgWarning,
}

export const StateTag = ({ style, label, labelStyle, type }: Props) => {
  return (
    <View
      style={[styles.container, { backgroundColor: backgroundColor[type ?? 'pending'] }, style]}>
      <Text style={[AppTypo.body.regular, { color: textColor[type ?? 'pending'] }, labelStyle]}>
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
})
