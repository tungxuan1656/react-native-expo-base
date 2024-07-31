import React, { useEffect, useRef, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  TextStyle,
  Animated,
  Text,
  TextInputProps,
  TouchableOpacity,
} from 'react-native'
import { AppColors, AppFont, AppFontSize, AppIcons } from '@/app/assets'
import { Icon } from '../Icon'
import { AppTypo } from '@/app/constants'
// import { Popable } from 'react-native-popable'

export type InputTheme = {
  textInput?: StyleProp<TextStyle>
  label?: StyleProp<TextStyle>
  labelValue?: StyleProp<TextStyle>
  labelFocus?: StyleProp<TextStyle>
  labelUnFocus?: StyleProp<TextStyle>
  textRequired?: StyleProp<TextStyle>
  viewInput?: StyleProp<ViewStyle>
  textValidate?: StyleProp<TextStyle>
  borderError?: StyleProp<ViewStyle>
  borderSuccess?: StyleProp<ViewStyle>
  borderTyping?: StyleProp<ViewStyle>
  border?: StyleProp<ViewStyle>
  viewAnimated?: StyleProp<ViewStyle>
  container?: StyleProp<ViewStyle>
  viewContent?: StyleProp<ViewStyle>
}

type TextFieldValidateState = 'default' | 'error' | 'success'

export type ValidateTextFieldColor = {
  error: string
  success: string
  default: string
  typing: string
  custom: string
}

const defaultColors = {
  error: AppColors.textValidate,
  success: AppColors.textActivate,
  default: AppColors.strokeExtra,
  typing: AppColors.textFocus,
  custom: AppColors.textMain,
}

export type TextFieldProps = {
  value?: string
  label?: string
  required?: boolean
  // tooltip?: string
  disabled?: boolean
  validateState?: TextFieldValidateState
  validateMessage?: string
  ItemLeft?: React.ReactNode | React.ReactNode[]
  ItemRight?: React.ReactNode | React.ReactNode[]
  colors?: ValidateTextFieldColor
  theme?: InputTheme
  style?: StyleProp<ViewStyle>
  onChangeFocus?: (isFocus: boolean) => void
  callbackRef?: React.RefCallback<TextInput>
} & TextInputProps

export const TextField: React.FC<TextFieldProps> = ({
  value,
  label,
  required = false,
  // tooltip,
  disabled = false,
  validateState = 'default',
  validateMessage,
  ItemLeft = null,
  ItemRight = null,
  colors = defaultColors,
  theme,
  style,
  placeholder,
  callbackRef,
  onChangeFocus,
  onChangeText,
  onBlur,
  ...props
}) => {
  const moveText = useRef(new Animated.Value(0)).current
  const refInput: React.MutableRefObject<TextInput | null> = React.useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    onChangeFocus?.(isFocused)
  }, [isFocused])

  useEffect(() => {
    if (isFocused) {
      moveTextTop()
      return
    }
    if (value) moveTextTop()
    else moveTextBottom()
  }, [value, isFocused])

  const moveTextTop = () => {
    Animated.timing(moveText, { toValue: 1, duration: 150, useNativeDriver: true }).start()
  }
  const moveTextBottom = () => {
    Animated.timing(moveText, { toValue: 0, duration: 150, useNativeDriver: true }).start()
  }
  const yVal = moveText.interpolate({ inputRange: [0, 1], outputRange: [12, 2] })
  const animStyle = { transform: [{ translateY: yVal }] }

  const borderStyle = () => {
    if (isFocused) return [styles.borderTyping, theme?.borderTyping]
    if (validateState === 'error') return [styles.borderError, theme?.borderError]
    if (validateState === 'success') return [styles.borderSuccess, theme?.borderSuccess]
    return [theme?.border]
  }

  const clearText = () => {
    refInput.current?.clear()
    onChangeText?.('')
  }

  return (
    <View style={[styles.container, theme?.container, style]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => refInput.current?.focus()}
        style={[
          styles.viewContent,
          { borderColor: colors[isFocused ? 'typing' : (validateState ?? 'default')] },
          { backgroundColor: disabled ? AppColors.bgExtra : AppColors.white },
          borderStyle(),
          theme?.viewContent,
        ]}>
        {label ? (
          <Animated.View
            style={[styles.viewAnimated, theme?.viewAnimated, animStyle]}
            pointerEvents={'box-none'}>
            <View style={styles.viewLabel} pointerEvents={'none'}>
              <Text
                style={[
                  isFocused
                    ? [styles.labelFocus, theme?.labelFocus]
                    : value
                      ? [styles.labelValue, theme?.labelValue]
                      : [styles.label, theme?.label],
                  disabled && { color: AppColors.textDisabled },
                ]}
                numberOfLines={1}>
                {label}
              </Text>
              {required ? <Text style={[styles.textRequired, theme?.textRequired]}>﹡</Text> : null}
            </View>
            {/* {tooltip ? (
						<Popable action="press" content={tooltip ?? ''} position={'top'}>
							<Icon
								source={AppIcons.ico_tooltip}
								size={24}
								style={{ position: 'absolute', top: -12 }}
							/>
						</Popable>
					) : null} */}
          </Animated.View>
        ) : null}
        <View style={[styles.viewInput, theme?.viewInput]}>
          {ItemLeft}
          <TextInput
            style={[styles.textInput, theme?.textInput]}
            value={value}
            editable={!disabled}
            onBlur={(e) => {
              setIsFocused(false)
              onBlur?.(e)
            }}
            onFocus={() => setIsFocused(true)}
            onChangeText={onChangeText}
            ref={(input) => {
              refInput.current = input
              if (typeof callbackRef === 'function' && input) {
                callbackRef(input)
              }
            }}
            placeholder={isFocused ? placeholder : undefined}
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
          {ItemRight}
        </View>
      </TouchableOpacity>
      {validateState !== 'default' && validateMessage ? (
        <Text
          style={[
            styles.textValidate,
            theme?.textValidate,
            { color: colors[validateState ?? 'error'] },
          ]}>
          {validateMessage}
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  viewContent: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 16,
    justifyContent: 'center',
    minHeight: 60,
    backgroundColor: AppColors.white,
  },
  viewAnimated: {
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: 2,
  },
  viewLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  textInput: {
    flex: 1,
    fontFamily: AppFont.regular,
    fontSize: AppFontSize.large,
    color: AppColors.textMain,
    paddingVertical: 0,
    paddingHorizontal: 0,
    minHeight: 24,
  },
  label: {
    fontFamily: AppFont.regular,
    fontSize: AppFontSize.large,
    color: AppColors.textBlur,
    height: 20,
  },
  labelValue: {
    color: AppColors.textBlur,
    fontFamily: AppFont.regular,
    fontSize: AppFontSize.small,
    height: 18,
  },
  labelFocus: {
    color: AppColors.textFocus,
    fontFamily: AppFont.regular,
    fontSize: AppFontSize.small,
    height: 18,
  },
  textRequired: {
    fontSize: AppFontSize.small,
    color: AppColors.textValidate,
    textAlign: 'center',
  },
  textValidate: {
    ...AppTypo.caption.regular,
    marginHorizontal: 18,
    marginTop: 4,
  },
  buttonClear: {
    width: 22,
    height: 22,
    borderRadius: 24,
    backgroundColor: AppColors.bgBlur,
    marginRight: -4,
  },
  borderTyping: {},
  borderSuccess: {},
  borderError: {},
})
