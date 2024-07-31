import { View, StyleSheet, TextInput, ViewStyle, TextStyle, TextInputProps } from 'react-native'
import React, { useRef, useState } from 'react'
import { AppColors, AppIcons } from '@/app/assets'
import { Icon } from '../Icon'
import { Image, ImageStyle } from 'expo-image'

export type SearchFieldTheme = {
  container?: ViewStyle
  iconSearch?: ImageStyle
  textInput?: TextStyle
}

type SearchFieldProps = {
  value?: string
  disabled?: boolean
  placeholder?: string
  onEndEdit?: () => void
  showIconSearch?: boolean
  theme?: SearchFieldTheme
  rightItem?: React.ReactNode
} & TextInputProps

export function SearchField({
  value = undefined,
  disabled = false,
  placeholder = '',
  onEndEdit,
  showIconSearch = true,
  theme,
  rightItem,
  style,
  onChangeText,
  ...props
}: SearchFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const refInput = useRef<TextInput | null>(null)

  const clearText = () => {
    refInput.current?.clear()
    onChangeText?.('')
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: disabled ? AppColors.buttonDisabled : AppColors.white },
        theme?.container,
        style,
      ]}>
      {showIconSearch && (
        <Image
          style={[styles.iconSearch, theme?.iconSearch]}
          source={AppIcons.ico_search}
          contentFit="contain"
        />
      )}
      <TextInput
        value={value}
        style={[styles.textInput, theme?.textInput]}
        placeholder={placeholder}
        placeholderTextColor={AppColors.textDisabled}
        onChangeText={onChangeText}
        editable={!disabled}
        onEndEditing={onEndEdit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={refInput}
        {...props}
      />
      {isFocused ? (
        <Icon
          source={AppIcons.ico_close}
          size={16}
          onPress={clearText}
          buttonStyle={styles.buttonClear}
        />
      ) : null}
      {rightItem}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: AppColors.strokeExtra,
    alignItems: 'center',
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  iconSearch: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  iconScan: {
    height: 24,
  },
  textInput: {
    flex: 1,
    color: AppColors.textMain,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonClear: {
    width: 22,
    height: 22,
    borderRadius: 24,
    backgroundColor: AppColors.bgBlur,
  },
})
