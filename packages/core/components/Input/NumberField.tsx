import {
  getFormNumberExcept,
  getStringByValue,
  replaceIfLastComma,
} from 'packages/core/utils/FormUtils'
import React from 'react'
import { StyleSheet } from 'react-native'
import { TextField, TextFieldProps } from './TextField'

export type NumberFieldProps = TextFieldProps & {
  value?: any
  integer?: boolean
  onChangeValue?: (value: any) => void
}

export const NumberField = ({
  value,
  integer,
  onChangeValue,
  onBlur,
  ...props
}: NumberFieldProps) => {
  return (
    <TextField
      onChangeText={(value) => onChangeValue?.(getFormNumberExcept(replaceIfLastComma(value)))}
      value={getStringByValue(value, integer ? 0 : undefined) ?? ''}
      keyboardType={'decimal-pad'}
      returnKeyType={'done'}
      {...props}
    />
  )
}

const styles = StyleSheet.create({})
