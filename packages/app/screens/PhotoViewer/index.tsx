import { AppColors } from '@/app/assets'
import GImageView from 'packages/core/components/Dialog/GImageView'
import { VectorIcon } from 'packages/core/components/Icon'
import { Screen } from 'packages/core/components/Screen'
import { isEmpty } from 'lodash'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'

const PhotoViewer = (props: any) => {
  const source = props?.route?.params?.source

  const sharePhoto = async () => {
    if (!source?.uri) return

    const path = await Image.getCachePathAsync(source).catch((err) => {
      console.log(err)
    })

    if (typeof path !== 'string') return
  }

  return (
    <Screen.Container>
      <Screen.Header
        title={'Chi tiết'}
        ItemRight={
          <VectorIcon
            name={'share'}
            font={'Feather'}
            size={18}
            buttonStyle={{ width: 50, height: 40 }}
            color={AppColors.textFocus}
            onPress={sharePhoto}
          />
        }
      />
      <Screen.Content style={{ backgroundColor: AppColors.bgExtra }}>
        {!isEmpty(source) ? (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => !!source?.uri && GImageView.show({ uri: source.uri })}>
            <Image source={source} style={{ flex: 1 }} contentFit={'contain'} />
          </TouchableOpacity>
        ) : null}
      </Screen.Content>
    </Screen.Container>
  )
}

export default PhotoViewer

const styles = StyleSheet.create({})
