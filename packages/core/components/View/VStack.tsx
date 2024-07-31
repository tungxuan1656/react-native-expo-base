import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type Props = {
  style?: StyleProp<ViewStyle>
  gap?: number | undefined
  center?: boolean
  centerRow?: boolean
  centerCol?: boolean
  spaceRow?: boolean
  children?: React.ReactNode
}

export const VStack = ({ style, gap, center, centerCol, centerRow, spaceRow, children }: Props) => {
  return (
    <View
      style={[
        { gap: gap },
        center && { justifyContent: 'center', alignItems: 'center' },
        centerCol && { alignItems: 'center' },
        centerRow && { justifyContent: 'center' },
        spaceRow && { justifyContent: 'space-between' },
        style,
      ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({})
