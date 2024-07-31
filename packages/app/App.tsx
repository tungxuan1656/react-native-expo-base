import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AppLaunching from './navigation/AppLaunching'
import AppNavigator from './navigation/AppNavigation'
import {
  GActionSheetComponent,
  GDateTimePickerComponent,
  GInputDialogComponent,
  GSelectionComponent,
  GSliderDialogComponent,
  GSpinnerComponent,
  GToastComponent,
} from 'packages/core/components/Dialog'
import { persistor, store } from './controllers/redux'
import { GImageViewComponent } from 'packages/core/components/Dialog/GImageView'

const GlobalComponents = () => {
  return (
    <>
      <GDateTimePickerComponent />
      <GSelectionComponent />
      <GActionSheetComponent />
      <GSpinnerComponent />
      <GToastComponent />
      <GInputDialogComponent />
      <GSliderDialogComponent />
      <GImageViewComponent />
    </>
  )
}

const MyApp = () => {
  console.log('App')
  console.log('====================================')

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <AppLaunching />
            <AppNavigator />
            <GlobalComponents />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  )
}

let App: any
if (__DEV__) {
  App = MyApp
} else {
  App = MyApp
}

export default App
