import { View, TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import React from 'react'
import { AppColors } from '@/app/assets'
import { AppStyles } from '@/app/constants'

export type RadioTheme = {
  button?: StyleProp<ViewStyle>
  viewRadio?: StyleProp<ViewStyle>
  radio?: StyleProp<ViewStyle>
}

type RadioProps = {
  value?: boolean
  disabled?: boolean
  onPress?: () => void
  theme?: RadioTheme
  style?: StyleProp<ViewStyle>
  noTouch?: boolean
}

export const Radio = ({ value, disabled, onPress, theme, style, noTouch }: RadioProps) => {
  const colorButton = value && !disabled ? AppColors.buttonFocus : AppColors.strokeExtra
  const backgroundButton = disabled ? AppColors.bgBlur : AppColors.bgMain

  return (
    <TouchableOpacity
      style={[styles.container, theme?.button, style]}
      onPress={onPress}
      disabled={disabled || noTouch}>
      <View
        style={[
          styles.viewIcon,
          AppStyles.view.border,
          {
            borderColor: colorButton,
            backgroundColor: backgroundButton,
          },
          theme?.viewRadio,
        ]}>
        {value ? (
          <View style={[styles.activeButton, { backgroundColor: colorButton }, theme?.radio]} />
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 2,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContent: {
    paddingHorizontal: 12,
    marginHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.strokeExtra,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    height: 12,
    width: 12,
    borderRadius: 12,
  },
  viewIcon: {
    borderRadius: 10,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
