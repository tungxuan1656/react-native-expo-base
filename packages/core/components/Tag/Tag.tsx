import { Text, ViewStyle, TextStyle, StyleSheet, TouchableOpacity, StyleProp } from 'react-native'
import React from 'react'
import { AppColors, AppIcons } from '@/app/assets'
import { AppTypo } from '@/app/constants'
import { Image, ImageSource, ImageStyle } from 'expo-image'

export type TagTheme = {
  container?: StyleProp<ViewStyle>
  label?: StyleProp<TextStyle>
  icon?: StyleProp<ImageStyle>
  buttonRemove?: StyleProp<ViewStyle>
  iconRemove?: StyleProp<ImageStyle>
}

type TagProps = {
  icon?: ImageSource
  text?: string
  onRemove?: () => void
  theme?: TagTheme
  iconTintColor?: string
  onPress?: () => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'
  numberOfLines?: number
}

export const Tag = ({
  icon,
  text,
  onRemove,
  onPress,
  disabled,
  theme,
  iconTintColor,
  style,
  ellipsizeMode,
  numberOfLines = 1,
}: TagProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: disabled ? AppColors.buttonDisabled : AppColors.bgMain },
        theme?.container,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || typeof onPress !== 'function'}>
      {icon && (
        <Image
          source={icon}
          style={[styles.icon, theme?.icon]}
          tintColor={iconTintColor ?? (disabled ? AppColors.textDisabled : undefined)}
        />
      )}
      {text ? (
        <Text
          numberOfLines={numberOfLines}
          ellipsizeMode={ellipsizeMode}
          style={[
            styles.text,
            AppTypo.body.regular,
            { color: disabled ? AppColors.textDisabled : AppColors.textMain, flexShrink: 1 },
            theme?.label,
          ]}>
          {text}
        </Text>
      ) : null}
      {typeof onRemove === 'function' && (
        <TouchableOpacity
          style={[styles.buttonRemove, theme?.buttonRemove]}
          onPress={onRemove}
          disabled={disabled}>
          <Image
            source={AppIcons.ico_close}
            style={[styles.iconRemove, theme?.iconRemove]}
            tintColor={AppColors.textBlur}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  buttonRemove: {
    backgroundColor: AppColors.bgExtra,
    height: 24,
    width: 24,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRemove: {
    height: 16,
    width: 16,
  },
  text: {
    marginHorizontal: 4,
    marginVertical: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 100,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: AppColors.strokeExtra,
  },
})
