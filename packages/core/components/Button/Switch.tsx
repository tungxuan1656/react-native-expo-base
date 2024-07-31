import { AppColors } from '@/app/assets'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Switch as RNSwitch, SwitchProps as RNSwitchProps } from 'react-native'

export type SwitchProps = RNSwitchProps

export const Switch = ({ style, ...props }: SwitchProps) => {
  return (
    <RNSwitch
      trackColor={{ false: AppColors.switchTrackFalse, true: AppColors.switchTrackTrue }}
      thumbColor={AppColors.switchThumb}
      style={[Platform.OS === 'ios' && styles.switchIOS, style]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  switchIOS: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }, { translateX: 0 }, { translateY: 0 }],
  },
})
