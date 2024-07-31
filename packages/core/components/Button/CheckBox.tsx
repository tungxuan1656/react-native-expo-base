import { View, TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import React from 'react'
import { AppColors, AppIcons } from '@/app/assets'
import { Image, ImageStyle } from 'expo-image'

export type CheckboxTheme = {
  button?: StyleProp<ViewStyle>
  viewIcon?: StyleProp<ViewStyle>
  icon?: ImageStyle
  buttonHasValue?: StyleProp<ViewStyle>
  buttonDisabled?: StyleProp<ViewStyle>
}

type CheckboxProps = {
  value?: boolean
  disabled?: boolean
  onValueChange?: (value: boolean) => void
  intermidated?: boolean
  theme?: CheckboxTheme
  style?: StyleProp<ViewStyle>
  noTouch?: boolean
}

export const Checkbox = ({
  value = false,
  disabled = false,
  onValueChange,
  intermidated = false,
  theme,
  style,
  noTouch,
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, theme?.button, style]}
      onPress={() => {
        onValueChange?.(!value)
      }}
      disabled={disabled || noTouch}>
      <View
        style={[
          styles.viewIcon,
          theme?.viewIcon,
          (value || intermidated) && !disabled && styles.buttonHasValue,
          disabled && styles.buttonDisabled,
        ]}>
        <Image
          source={intermidated ? AppIcons.ico_dash : value ? AppIcons.ico_check : undefined}
          style={[styles.icon, theme?.icon]}
          tintColor={disabled ? AppColors.buttonDisabled : AppColors.buttonFocus}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 16,
    width: 16,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  viewIcon: {
    height: 24,
    width: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AppColors.strokeExtra,
    backgroundColor: AppColors.bgMain,
  },
  buttonHasValue: {
    // borderWidth: 1,
    // backgroundColor: AppColors.bgMain,
  },
  buttonDisabled: {
    backgroundColor: AppColors.bgDisabled,
  },
})
