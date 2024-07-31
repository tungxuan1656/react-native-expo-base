import { AppColors } from '@/app/assets'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type ItemSectionProps = {
  style?: StyleProp<ViewStyle>
  type?: 'first' | 'middle' | 'last'
  children?: React.ReactNode | JSX.Element | JSX.Element[]
}

export const ItemSection = ({ type, style, children }: ItemSectionProps) => {
  return (
    <View
      style={[
        type === 'first' ? styles.viewFirst : type === 'last' ? styles.viewLast : styles.viewMiddle,
        style,
      ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  viewFirst: {
    backgroundColor: AppColors.bgMain,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: AppColors.strokeMain,
  },
  viewLast: {
    backgroundColor: AppColors.bgMain,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: AppColors.strokeMain,
    marginBottom: 16,
  },
  viewMiddle: {
    backgroundColor: AppColors.bgMain,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: AppColors.strokeMain,
  },
})
