import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type Props = {
  style?: StyleProp<ViewStyle>
  gap?: number | undefined
  center?: boolean
  centerRow?: boolean
  centerCol?: boolean
  spaceCol?: boolean
  children?: React.ReactNode
}

export const HStack = ({ style, gap, center, centerCol, centerRow, spaceCol, children }: Props) => {
  return (
    <View
      style={[
        { flexDirection: 'row', gap: gap },
        center && { justifyContent: 'center', alignItems: 'center' },
        centerCol && { justifyContent: 'center' },
        centerRow && { alignItems: 'center' },
        spaceCol && { justifyContent: 'space-between' },
        style,
      ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({})
