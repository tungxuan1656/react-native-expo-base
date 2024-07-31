import React, { useCallback, useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { ComboBox, ComboBoxProps } from '../Input/ComboBox'
import * as yup from 'yup'
import I18n from '@/app/controllers/languages/I18n'

type ComboBoxFormProps = {
  name: string
  rules?: RegisterOptions
  keyValue?: string
  validator?: any
  preValue?: (value: any) => React.ReactNode
} & ComboBoxProps

export const ComboBoxForm = ({
  name,
  rules,
  keyValue,
  label,
  required,
  validator,
  preValue,
  ...props
}: ComboBoxFormProps) => {
  const { control, formState } = useFormContext()
  let message = formState.errors[name]?.message?.toString()

  const validateRequired = useMemo(
    () => (required ? I18n.t('validate.repuiedChoose', { fieldName: label }) : undefined),
    [label, required],
  )

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

  return (
    <Controller
      control={control}
      rules={{
        ...rules,
        required: validateRequired,
        validate: validator ? validateWithValidator : rules?.validate,
      }}
      render={({ field: { value } }) => (
        <ComboBox
          validateState={message ? 'error' : 'default'}
          validateMessage={message ?? ''}
          value={typeof preValue === 'function' ? preValue(value) : value}
          label={label}
          required={required}
          {...props}
        />
      )}
      name={name}
    />
  )
}
