import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  StyleProp,
  Text,
  View,
  ViewStyle,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native'
import { RegisterOptions } from 'react-hook-form'
import { Radio } from '../Button'
import { AppTypo } from '@/app/constants'
import { AppColors } from '@/app/assets'

type ItemDataRadio = {
  label: string
  value: string
}

type RadioFormProps = {
  name: string
  style?: StyleProp<ViewStyle>
  rules?: RegisterOptions
  title: string
  data: Array<ItemDataRadio>
  onPress: (value: string) => void
}

export const RadioForm: React.FC<RadioFormProps> = ({
  name,
  style,
  rules,
  title,
  onPress,
  data,
}) => {
  const { control, formState } = useFormContext()
  // let message = formState.errors[name]?.message?.toString()
  // formState.isSubmitSuccessful //validator
  // @ts-ignore
  const renderItem: ListRenderItem<ItemDataRadio> = ({ item, index, value }) => {
    return (
      <TouchableOpacity onPress={() => onPress(item.value)} style={styles.viewItemRadio}>
        <View style={styles.viewItem}>
          <Radio value={value === item.value} noTouch />
          <Text style={AppTypo.headline.regular}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { value } }) => (
        <View style={[styles.container, style]}>
          <Text style={AppTypo.headline.regular}>{title}</Text>
          <View style={styles.viewList}>
            <FlatList
              data={data}
              horizontal
              scrollEnabled={false}
              keyExtractor={(item, index) => item.value}
              // @ts-ignore
              renderItem={({ item, index }) => renderItem({ item, index, value })}
            />
          </View>
        </View>
      )}
      name={name}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingBottom: 8,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.strokeExtra,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  viewList: {
    justifyContent: 'flex-end',
  },
  viewItemRadio: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'flex-end',
  },
})
