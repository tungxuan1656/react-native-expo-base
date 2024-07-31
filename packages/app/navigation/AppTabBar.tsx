import { AppColors, AppFontSize, AppIcons } from '@/app/assets'
import { AppTypo } from '@/app/constants'
import I18n from '@/app/controllers/languages/I18n'
import { AppActions } from '@/app/controllers/redux'
import Home from '@/home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useIsFocused } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import { useDispatch } from 'react-redux'

const Tab = createBottomTabNavigator()

export enum AppTabBarRoute {
  TabDashboard = 'TabBar_TabDashboard',
  TabMoney = 'TabBar_TabMoney',
  TabHabit = 'TabBar_TabHabit',
  TabPlan = 'TabBar_TabPlan',
  TabSetting = 'TabBar_TabSetting',
  TabWalletQR = 'TabBar_TabWalletQR',
  TabMoneyTransactions = 'TabBar_TabMoneyTransactions',
  TabMoneyStatistic = 'TabBar_TabMoneyStatistic',
  TabMoneyGroups = 'TabBar_TabMoneyGroups',
}

const Empty = () => {
  return null
}

export default function AppTabBar() {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  console.log('[Render] AppTabBar')

  useEffect(() => {
    dispatch(AppActions.setTabBarIsFocused({ isFocused }))
  }, [isFocused])

  const renderIcon = useCallback(({ color, source }: any) => {
    return <Image source={source} style={{ width: 28, height: 28, tintColor: color }} />
  }, [])

  const renderLabel = useCallback(({ focused, color, value }: any) => {
    return (
      <Text
        style={[
          focused ? AppTypo.caption.semiBold : AppTypo.caption.regular,
          { color, fontSize: AppFontSize.x_small, lineHeight: undefined },
        ]}>
        {value}
      </Text>
    )
  }, [])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: AppColors.buttonFocus,
        tabBarInactiveTintColor: AppColors.buttonDisabled,
        tabBarItemStyle: { paddingVertical: 2 },
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: { overflow: 'hidden' },
        lazy: false,
      })}>
      <Tab.Screen
        name={AppTabBarRoute.TabDashboard}
        component={Home}
        options={{
          tabBarLabel: ({ focused, color }) =>
            renderLabel({ color, focused, value: I18n.t('tabBar.dashboard') }),
          tabBarIcon: ({ color }) => renderIcon({ color, source: AppIcons.ico_home }),
        }}
      />
      <Tab.Screen
        name={AppTabBarRoute.TabMoneyTransactions}
        component={Home}
        options={{
          tabBarLabel: ({ focused, color }) =>
            renderLabel({ color, focused, value: I18n.t('tabBar.transactions') }),
          tabBarIcon: ({ color }) => renderIcon({ color, source: AppIcons.ico_paper }),
        }}
      />
      <Tab.Screen
        name={AppTabBarRoute.TabMoneyStatistic}
        component={Home}
        options={{
          tabBarLabel: ({ focused, color }) =>
            renderLabel({ color, focused, value: I18n.t('tabBar.statistic') }),
          tabBarIcon: ({ color }) => renderIcon({ color, source: AppIcons.ico_chart1 }),
        }}
      />
      <Tab.Screen
        name={AppTabBarRoute.TabHabit}
        component={Home}
        options={{
          tabBarLabel: ({ focused, color }) =>
            renderLabel({ color, focused, value: I18n.t('tabBar.habit') }),
          tabBarIcon: ({ color }) => renderIcon({ color, source: AppIcons.ico_attribute }),
        }}
      />
      <Tab.Screen
        name={AppTabBarRoute.TabSetting}
        component={Home}
        options={{
          tabBarLabel: ({ focused, color }) =>
            renderLabel({ color, focused, value: I18n.t('tabBar.setting') }),
          tabBarIcon: ({ color }) => renderIcon({ color, source: AppIcons.ico_setting }),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})
