import I18n from '@/app/controllers/languages/I18n'
import React, { useCallback, useMemo } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import * as yup from 'yup'
import { TextField, TextFieldProps } from '../Input'

type TextFieldFormProps = {
  name: string
  rules?: RegisterOptions
  validator?: any
} & TextFieldProps

export const TextFieldForm: React.FC<TextFieldFormProps> = ({
  name,
  rules,
  validator,
  required,
  label,
  onChangeText,
  ...props
}) => {
  const { control, formState } = useFormContext()
  let message = formState.errors[name]?.message?.toString()

  const validateWithValidator = useCallback(
    (value: any) => {
      return new Promise<string | undefined>((resolve, reject) => {
        yup
          .object()
          .shape({ name: validator })
          .validate({ name: value })
          .then(() => resolve(undefined))
          .catch((err) => {
            resolve(err.errors?.[0] ?? undefined)
          })
      })
    },
    [validator],
  )

  const validateRequired = useMemo(
    () => (required ? I18n.t('validate.requiredInput', { fieldName: label }) : undefined),
    [label, required],
  )

  return (
    <Controller
      control={control}
      rules={{
        ...rules,
        required: validateRequired,
        validate: validator ? validateWithValidator : rules?.validate,
      }}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <TextField
          onChangeText={(text) => {
            onChange(text)
            onChangeText?.(text)
          }}
          value={value}
          validateState={message ? 'error' : 'default'}
          validateMessage={message || ''}
          label={label}
          required={required}
          onBlur={() => {
            if (typeof value === 'string') {
              onChange(value.trim())
            }
            onBlur()
          }}
          callbackRef={ref}
          {...props}
        />
      )}
      name={name}
    />
  )
}
