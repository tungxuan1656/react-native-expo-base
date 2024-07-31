import React, { createRef, useLayoutEffect, useState } from 'react'
import { Button, Dimensions, Keyboard, Platform, Text, TouchableOpacity, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import ImageZoom from 'react-native-image-pan-zoom'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

type GInputDialogShowProps = {
  uri: string
}

type GImageViewProps = {
  show: (prop: GInputDialogShowProps) => void
  hide: () => void
}

const GImageViewRef = createRef<GImageViewProps | null>()

export default {
  /**
   * @param {object} params
   * @param {string} params.uri
   */
  show: ({ uri }) => {
    Keyboard.dismiss()
    GImageViewRef.current?.show({ uri })
  },
  hide: () => GImageViewRef.current?.hide(),
}

export const GImageViewComponent = () => {
  const [imageUri, setImageUri] = useState('')
  const [width, setWidth] = useState(windowWidth)
  const [height, setHeight] = useState(windowWidth)
  const insets = useSafeAreaInsets()

  useLayoutEffect(() => {
    // @ts-ignore
    GImageViewRef.current = {
      show: ({ uri }) => {
        if (typeof uri === 'string') {
          setImageUri(uri)
        } else setImageUri('')
      },
      hide: () => setImageUri(''),
    }
  }, [])

  return (
    <ReactNativeModal
      isVisible={!!imageUri}
      onBackdropPress={() => setImageUri('')}
      onBackButtonPress={() => setImageUri('')}
      useNativeDriver={Platform.OS == 'android'}
      style={{ margin: 0 }}
      backdropOpacity={0.85}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
        }}>
        {/* @ts-ignore */}
        <ImageZoom
          cropWidth={windowWidth}
          cropHeight={windowHeight}
          imageWidth={windowWidth}
          imageHeight={(windowWidth / width) * height}
          enableSwipeDown={true}
          onSwipeDown={() => setImageUri('')}
          maxScale={10}
          minScale={1}>
          <Image
            source={{ uri: imageUri }}
            onLoad={(e) => {
              setWidth(e.source.width)
              setHeight(e.source.height)
            }}
            style={{ flex: 1, width: '100%', height: '100%' }}
          />
        </ImageZoom>
        <TouchableOpacity
          onPress={() => setImageUri('')}
          style={{ position: 'absolute', right: 0, top: insets.top }}>
          <Text style={{ color: '#fff', paddingHorizontal: 16, paddingBottom: 16, fontSize: 20 }}>
            ✕
          </Text>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  )
}
