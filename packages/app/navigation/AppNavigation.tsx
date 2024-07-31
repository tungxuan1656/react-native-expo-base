import {
  createNavigationContainerRef,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import AppSplash from './AppSplash'
import AppTabBar from './AppTabBar'
import { AppRoute } from './AppRoute'
import CommonStackWrapper from './CommonStackWrapper'
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation'

const Stack = createNativeStackNavigator()
export const appNavigationRef = createNavigationContainerRef()

export default function AppNavigation() {
  console.log('[Render] AppNavigation')

  useReactNavigationDevTools(appNavigationRef)

  return (
    <NavigationContainer ref={appNavigationRef} theme={DefaultTheme}>
      <Stack.Navigator
        initialRouteName={AppRoute.AppSplash}
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen
          name={AppRoute.AppSplash}
          component={AppSplash}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name={AppRoute.AppTabBar}
          component={AppTabBar}
          options={{ animation: 'fade' }}
        />
        {CommonStackWrapper()}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
