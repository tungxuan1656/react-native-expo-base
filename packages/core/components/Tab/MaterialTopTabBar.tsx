import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs'
import { Text } from 'react-native'
import { AppColors } from '@/app/assets'
import { AppTypo } from '@/app/constants'
import React from 'react'

export const MaterialTopTabBarLabel = ({ focused, label }: { focused: boolean; label: string }) => {
  return (
    <Text
      style={[
        AppTypo.headline.regular,
        focused && { color: AppColors.textActivate },
        { paddingBottom: 12, paddingHorizontal: 6 },
      ]}>
      {label}
    </Text>
  )
}

export const materialTopTabDefaultOption: MaterialTopTabNavigationOptions = {
  tabBarStyle: { height: 40 },
  lazy: true,
  tabBarItemStyle: { width: 'auto' },
  tabBarScrollEnabled: true,
  tabBarIndicatorStyle: { backgroundColor: AppColors.textActivate },
  tabBarLabel: (props) => <MaterialTopTabBarLabel focused={props.focused} label={props.children} />,
}
