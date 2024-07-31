import React, { useCallback, useMemo } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import I18n from '@/app/controllers/languages/I18n'
import { formatNumber } from 'packages/core/utils/Common'
import { getNumberIfValid } from 'packages/core/utils/FormUtils'
import { NumberField, TextFieldProps } from '../Input'

type NumberFieldFormProps = {
  name: string
  rules?: RegisterOptions
  max?: number
  min?: number
  labelValidate?: string
  integer?: boolean
} & TextFieldProps

export const NumberFieldForm: React.FC<NumberFieldFormProps> = ({
  name,
  rules,
  max,
  min,
  required,
  label,
  labelValidate,
  onChangeText,
  integer,
  ...props
}) => {
  const { control, formState } = useFormContext()
  let message = formState.errors[name]?.message?.toString()

  var valueMax = max
  var valueMin = min
  var valueInteger = integer === true

  const valueLabel = labelValidate ?? label

  const validateMin = useMemo(() => {
    if (valueMin !== undefined) {
      return {
        value: valueMin,
        message: I18n.t('validate.minNumber', {
          fieldName: valueLabel,
          min: valueMin,
        }),
      }
    }
    return undefined
  }, [valueMin, valueLabel])

  const validateMax = useMemo(() => {
    if (valueMax !== undefined) {
      return {
        value: valueMax,
        message: I18n.t('validate.maxNumber', {
          fieldName: valueLabel,
          max: valueMax,
        }),
      }
    }
    return undefined
  }, [valueMax, valueLabel])

  const validateMinInteger = useMemo(() => {
    if (valueMin !== undefined) {
      return {
        value: Math.round(valueMin),
        message: I18n.t('validate.minNumber', {
          fieldName: valueLabel,
          min: formatNumber(valueMin, 0),
        }),
      }
    }
    return undefined
  }, [valueMin, valueLabel])

  const validateMaxInteger = useMemo(() => {
    if (valueMax !== undefined) {
      return {
        value: Math.round(valueMax),
        message: I18n.t('validate.maxNumber', {
          fieldName: valueLabel,
          max: formatNumber(valueMax, 0),
        }),
      }
    }
    return undefined
  }, [valueMax, valueLabel])

  const validateRequired = useMemo(
    () => (required ? I18n.t('validate.requiredInput', { fieldName: valueLabel }) : undefined),
    [valueLabel, required],
  )

  const validateNumber = useCallback((value: any) => {
    if (value === undefined || value === null) return undefined
    if (typeof value === 'string') {
      let t = value.split(',').join('')
      return isNaN(+t) ? I18n.t('validate.number') : undefined
    }
    return isNaN(+value) ? I18n.t('validate.number') : undefined
  }, [])

  const validateNumberInteger = useCallback((value: any) => {
    if (value === undefined || value === null) return undefined
    if (typeof value === 'string') {
      let t = value.split(',').join('')
      return isNaN(+t) || !Number.isInteger(+t) ? I18n.t('validate.numberInteger') : undefined
    }
    return isNaN(+value) || !Number.isInteger(+value) ? I18n.t('validate.numberInteger') : undefined
  }, [])

  return (
    <Controller
      control={control}
      rules={{
        min: valueMin ? (valueInteger ? validateMinInteger : validateMin) : undefined,
        max: valueMax ? (valueInteger ? validateMaxInteger : validateMax) : undefined,
        validate: valueInteger ? validateNumberInteger : validateNumber,
        required: validateRequired,
      }}
      render={({ field: { onChange, value, onBlur } }) => (
        <NumberField
          onChangeValue={onChange}
          value={value}
          validateState={message ? 'error' : 'default'}
          validateMessage={message || ''}
          keyboardType={'decimal-pad'}
          onBlur={(e) => {
            onChange(getNumberIfValid(value))
            onBlur()
            props.onBlur?.(e)
          }}
          required={required}
          label={label}
          {...props}
        />
      )}
      name={name}
    />
  )
}

/*
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { StyleProp, View, ViewStyle } from 'react-native'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import TextField, { TextFieldProps } from 'src/shared/components/Input/TextField'
import {
	getFormNumber,
	getFormStringByNumber,
	getFormNumberExcept,
	getFormNumberOfMaxMin,
	replaceIfLastComma,
} from 'src/utils/FormUtils'
import useFormatWithConfig from 'src/shared/hooks/useFormatWithConfig'
import { useAppSelector } from 'src/shared/hooks/ReduxHooks'

type NumberFieldFormProps = {
	name: string
	style?: StyleProp<ViewStyle>
	rules?: RegisterOptions
	max?: number
	min?: number
	type?: 'price' | 'quantity'
} & TextFieldProps

const NumberFieldForm: React.FC<NumberFieldFormProps> = ({
	name,
	style,
	rules,
	max,
	min,
	type = 'price',
	onChangeText,
	...props
}) => {
	const { control, formState } = useFormContext()
	let message = formState.errors[name]?.message?.toString()
	const { getMaxPrice } = useFormatWithConfig()
	var valueMax = max ?? getMaxPrice()
	const configRound = useAppSelector((s) => s.system.round)

	return (
		<View style={[style]}>
			<Controller
				control={control}
				rules={rules}
				render={({ field: { onChange, value } }) => (
					<TextField
						onChangeText={(text) => {
							let s = getFormNumberOfMaxMin(
								getFormNumberExcept(
									replaceIfLastComma(text),
									type === 'price' ? configRound.price : configRound.quantity,
								),
								valueMax,
								min,
							)
							onChange(s)
						}}
						value={getFormStringByNumber(value)}
						validateState={message ? 'error' : 'default'}
						validateMessage={message || ''}
						keyboardType={'decimal-pad'}
						onBlur={() => {
							let n = getFormNumberOfMaxMin(getFormNumber(value), valueMax, min)
							onChange(n)
						}}
						{...props}
					/>
				)}
				name={name}
			/>
		</View>
	)
}
export default NumberFieldForm
*/
