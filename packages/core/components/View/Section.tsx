import { AppColors } from '@/app/assets'
import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native'

type SectionProps = {
  children?: JSX.Element | JSX.Element[] | null | React.ReactNode
  row?: boolean
  style?: StyleProp<ViewStyle>
} & TouchableOpacityProps

export const Section = ({ children, row, style, onPress, disabled, ...props }: SectionProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || typeof onPress !== 'function'}
      style={[styles.contentSection, row && { flexDirection: 'row' }, style]}
      {...props}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  contentSection: {
    padding: 16,
    backgroundColor: AppColors.bgMain,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AppColors.strokeMain,
    gap: 12,
  },
})
