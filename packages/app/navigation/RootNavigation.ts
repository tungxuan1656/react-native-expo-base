import { StackActions } from '@react-navigation/native'
import { appNavigationRef } from './AppNavigation'

function navigate(name: string, params?: object) {
  if (appNavigationRef.isReady()) {
    // @ts-ignore
    appNavigationRef.navigate(name, params)
  }
}

// function navigateStack(name: string, screen: string, params?: object) {
// 	if (appNavigationRef.isReady()) {
// 		// @ts-ignore
// 		appNavigationRef.navigate(name, { screen, ...params })
// 	}
// }

function push(name: string, params?: object) {
  if (appNavigationRef.isReady()) {
    appNavigationRef.dispatch(StackActions.push(name, params))
  }
}

function replace(name: string, params?: object) {
  if (appNavigationRef.isReady()) {
    appNavigationRef.dispatch(StackActions.replace(name, params))
  }
}

function goBack() {
  if (appNavigationRef.isReady() && appNavigationRef.canGoBack()) {
    appNavigationRef.goBack()
  }
}

const reset = (name: string, params?: object, index = 0, routes = []) => {
  if (appNavigationRef.isReady() && appNavigationRef?.getCurrentRoute()?.name !== name) {
    appNavigationRef.reset({
      index,
      routes: [...routes, { name, params }],
    })
  }
}

export const RootNavigation = {
  push,
  navigate,
  replace,
  reset,
  goBack,
}
