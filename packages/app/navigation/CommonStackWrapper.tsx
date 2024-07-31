import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PhotoViewer from '@/app/screens/PhotoViewer'

const Stack = createNativeStackNavigator()

export enum CommonRoute {
  PhotoViewer = 'Common_PhotoViewer',
}

const CommonStackWrapper = () => {
  return (
    <>
      <Stack.Screen name={CommonRoute.PhotoViewer} component={PhotoViewer} />
    </>
  )
}

export default CommonStackWrapper

const styles = StyleSheet.create({})
