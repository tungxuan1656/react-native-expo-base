import { AppIcons } from '@/app/assets'
import { AppStyles } from '@/app/constants'
import { AppActions, store } from '@/app/controllers/redux'
import { Button } from '@/core/components/Button'
import { GActionSheet, GAlert, GToast } from '@/core/components/Dialog'
import GImageView from '@/core/components/Dialog/GImageView'
import { NumberField, TextField } from '@/core/components/Input'
import { Tag } from '@/core/components/Tag'
import axios from 'axios'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Home = (props: any) => {
  return (
    <View style={[{ justifyContent: 'center', flex: 1, padding: 20, gap: 20 }]}>
      <Button
        title="toast"
        onPress={() => {
          GToast.success({ title: '123', message: '456' })
        }}
      />
      <Button
        title="alert"
        onPress={() => {
          GAlert.show({
            title: '123',
            message: '234',
            actions: [{ text: 'OK' }, { text: 'Cancel', type: 'cancel' }],
          })
        }}
      />
      <Button
        title="image view"
        onPress={() => {
          GImageView.show({
            uri: 'https://images.baoangiang.com.vn/image/fckeditor/upload/2023/20230708/images/33819496330535181382890083376021658616063328n-10512809.jpg',
          })
        }}
      />

      <Button
        title="action redux"
        onPress={() => {
          store.dispatch(AppActions.setCurrentUser({ name: 'trung' }))
        }}
      />
      <TextField label="hello" />
      <NumberField label="money" />
      <Tag text="123" icon={AppIcons.ico_add} onPress={() => {}} />
      <Button
        title="call api"
        onPress={async () => {
          console.log('call api')
          // const res = await axios.get('https://customer-v2.emddi.com/api/info/version')
          const res = await fetch('https://customer-v2.emddi.com/api/info/version')
          console.log('res api')
          console.log(res)
        }}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
