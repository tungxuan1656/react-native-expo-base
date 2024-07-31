import React from 'react'
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Icon, IconSource } from '../Icon'
import { AppColors, AppFont, AppFontSize, AppIcons } from '@/app/assets'
import { AppTypo } from '@/app/constants'
import { TagTheme } from '../Tag'

export type ComboBoxTheme = {
  label?: StyleProp<TextStyle>
  labelTop?: StyleProp<TextStyle>
  textRequired?: StyleProp<TextStyle>
  content?: StyleProp<ViewStyle>
  textValidate?: StyleProp<TextStyle>
  borderError?: StyleProp<ViewStyle>
  borderSuccess?: StyleProp<ViewStyle>
  borderActive?: StyleProp<ViewStyle>
  border?: StyleProp<ViewStyle>
  viewLabel?: StyleProp<ViewStyle>
  viewValue?: StyleProp<ViewStyle>
  container?: StyleProp<ViewStyle>
  textValue?: StyleProp<TextStyle>
}

export type ValidateComboBoxColor = {
  error: string
  success: string
  default: string
  active: string
  custom: string
}

type ComboBoxValidateState = 'default' | 'error' | 'success'

export type ComboBoxProps = {
  label?: string
  value?: React.ReactNode | string
  required?: boolean
  disabled?: boolean
  // tooltip?: string
  active?: boolean
  iconRight?: IconSource
  validateState?: ComboBoxValidateState
  validateMessage?: string
  colors?: ValidateComboBoxColor
  onPress?: () => void
  ItemRight?: React.ReactNode | React.ReactNode[]
  ItemLeft?: React.ReactNode | React.ReactNode[]
  tagTheme?: TagTheme
  style?: StyleProp<ViewStyle>
  theme?: ComboBoxTheme
}

const defaultColor = {
  error: AppColors.textValidate,
  success: AppColors.textActivate,
  default: AppColors.strokeExtra,
  active: AppColors.textFocus,
  value: AppColors.textMain,
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  label,
  value,
  required,
  disabled,
  // tooltip,
  active,
  iconRight = AppIcons.ico_arrow_right,
  validateState = 'default',
  validateMessage,
  colors = defaultColor,
  onPress,
  ItemRight,
  ItemLeft,
  style,
  theme,
}) => {
  const borderStyle = () => {
    if (active) return [styles?.borderActive, theme?.borderActive]
    if (validateState === 'error') return [styles.borderError, theme?.borderError]
    if (validateState === 'success') return [styles.borderActive, theme?.borderSuccess]
    return [theme?.border]
  }

  const renderLabel = () => {
    if (label) {
      return (
        <View style={[styles.viewLabel, theme?.viewLabel]}>
          <Text
            style={[
              value ? [styles.labelTop, theme?.labelTop] : [styles.label, theme?.label],
              active && { color: colors.active },
            ]}>
            {label}
          </Text>
          {required ? <Text style={[styles.textRequired, theme?.textRequired]}>﹡</Text> : null}
          {/* {!!tooltip ? (
						<Popable content={tooltip ?? ''} action="press" position="top">
							<Icon source={AppIcons.ico_tooltip}></Icon>
						</Popable>
					) : null} */}
        </View>
      )
    }
    return null
  }

  return (
    <View style={[styles.container, theme?.container, style]}>
      <TouchableOpacity
        style={[
          styles.content,
          { borderColor: colors[active ? 'active' : (validateState ?? 'default')] },
          { backgroundColor: disabled ? AppColors.bgExtra : AppColors.white },
          borderStyle(),
          theme?.content,
        ]}
        disabled={disabled}
        onPress={onPress}>
        {value ? renderLabel() : null}
        <View style={[styles.viewValue, theme?.viewValue]}>
          {ItemLeft}
          {value ? null : renderLabel()}
          <View style={styles.viewText}>
            <Text style={[styles.textValue, theme?.textValue]}>{value}</Text>
          </View>
          {ItemRight}
          <Icon
            color={active ? colors.active : colors.default}
            source={iconRight}
            style={{ marginTop: value ? -14 : 0, marginRight: -6 }}
          />
        </View>
      </TouchableOpacity>
      {validateState !== 'default' ? (
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
  content: {
    justifyContent: 'center',
    minHeight: 60,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: AppColors.white,
  },
  viewValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
  },
  viewText: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
    marginBottom: 0,
    flex: 1,
  },
  viewLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  label: {
    fontFamily: AppFont.regular,
    fontSize: AppFontSize.large,
    lineHeight: 24,
    color: AppColors.textBlur,
  },
  labelTop: {
    color: AppColors.textMain,
    fontFamily: AppFont.regular,
    fontSize: AppFontSize.small,
    lineHeight: 18,
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
  borderActive: {},
  borderSuccess: {},
  borderError: {},
  textValue: {
    ...AppTypo.headline.regular,
    color: AppColors.textMain,
  },
})
