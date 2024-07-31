import { AppImages } from '@/app/assets'
import { AppStyles, AppTypo } from '@/app/constants'
import I18n from '@/app/controllers/languages/I18n'
import React from 'react'
import { Image, ImageStyle, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'

type EmptyViewProps = {
  hideImage?: boolean
  imageStyle?: StyleProp<ImageStyle>
  textStyle?: StyleProp<TextStyle>
  text?: string
  style?: StyleProp<ViewStyle>
}

export const EmptyView = ({ hideImage, imageStyle, textStyle, text, style }: EmptyViewProps) => {
  return (
    <View
      style={[{ flex: 1, paddingBottom: 60, paddingTop: 20 }, AppStyles.view.contentCenter, style]}>
      {!hideImage ? (
        <Image source={AppImages.img_empty_box} style={[{ width: 250, height: 250 }, imageStyle]} />
      ) : null}
      <Text
        style={[
          AppTypo.body.medium,
          { marginTop: 20, marginHorizontal: 20, textAlign: 'center' },
          textStyle,
        ]}>
        {text ?? I18n.t('data.emptyLoad')}
      </Text>
    </View>
  )
}
