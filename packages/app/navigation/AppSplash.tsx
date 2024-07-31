import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const AppSplash = (props: any) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <ActivityIndicator size={'small'} />
    </View>
  )
}

export default AppSplash

const styles = StyleSheet.create({})
