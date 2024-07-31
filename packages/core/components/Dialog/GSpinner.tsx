import { AppTypo } from '@/app/constants'
import React, { useLayoutEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextStyle, View } from 'react-native'

export type GSpinnerTheme = {
  label?: TextStyle
}

type GSpinnerShowProps = {
  label?: string
  timeout?: number
}

type GSpinnerProps = {
  show: (props?: GSpinnerShowProps) => void
  hide: () => void
}

const GSpinnerRef = React.createRef<GSpinnerProps | null>()

export const GSpinnerComponent = ({ theme }: { theme?: GSpinnerTheme }) => {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('')

  useLayoutEffect(() => {
    // @ts-ignore
    GSpinnerRef.current = {
      show: ({ label, timeout = 20 }: GSpinnerShowProps = {}) => {
        setVisible(true)
        setLabel(label ?? '')
        setTimeout(() => {
          setVisible(false)
        }, timeout * 1000)
      },
      hide: () => setVisible(false),
    }
  }, [])

  return visible ? (
    <View style={styles.container}>
      <ActivityIndicator style={{ flex: 1 }} color={'#fff'} />
      {label ? (
        <Text
          style={[AppTypo.body.medium, { color: '#fff', marginHorizontal: 36 }, theme?.label]}
          numberOfLines={2}>
          {label}
        </Text>
      ) : null}
    </View>
  ) : null
}

export const GSpinner = {
  show: (props?: GSpinnerShowProps) => GSpinnerRef.current?.show?.(props),
  hide: () => GSpinnerRef.current?.hide?.(),
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000098',
  },
})
