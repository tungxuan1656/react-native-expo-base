import ImageCropPicker, { ImageOrVideo, Options } from 'react-native-image-crop-picker'
import { Permission } from './Permission'
import I18n from '@/app/controllers/languages/I18n'

let defaultOptions = {
  cropperChooseText: I18n.t('label.select'),
  cropperCancelText: I18n.t('label.cancel'),
  includeBase64: false,
  cropperToolbarTitle: I18n.t('label.editPhoto'),
  loadingLabelText: I18n.t('label.processing'),
}

type Props = {
  crop?: boolean
  freeCrop?: boolean
  width?: number
  height?: number
  quality?: number
  front?: boolean
} & Options

export type ImagePickerResult = ImageOrVideo

const pickPhoto = ({ crop = true, freeCrop = false, width, height, quality, ...props }: Props) => {
  return new Promise<ImageOrVideo>((resolve, reject) => {
    Permission.request('PHOTO', true)
      .then((isPer) => {
        if (isPer) {
          ImageCropPicker.openPicker({
            ...defaultOptions,
            mediaType: 'photo',
            cropping: crop,
            freeStyleCropEnabled: freeCrop,
            width: width,
            height: height,
            compressImageQuality: quality,
            ...props,
          })
            .then((value) => resolve(value))
            .catch(reject)
        } else {
          reject('Permission failed')
        }
      })
      .catch(reject)
  })
}

const takePhoto = ({
  crop = true,
  freeCrop = false,
  width,
  height,
  quality,
  front,
  ...props
}: Props) => {
  return new Promise<ImageOrVideo>((resolve, reject) => {
    Permission.request('CAMERA', true)
      .then((isPer) => {
        if (isPer) {
          ImageCropPicker.openCamera({
            ...defaultOptions,
            mediaType: 'photo',
            cropping: crop,
            freeStyleCropEnabled: freeCrop,
            width: width,
            height: height,
            compressImageQuality: quality,
            useFrontCamera: front ?? false,
            ...props,
          })
            .then((value) => resolve(value))
            .catch(reject)
        } else {
          reject('Permission failed')
        }
      })
      .catch(reject)
  })
}

const pickVideo = async ({ width, height, quality, ...props }: Props) => {
  if (await Permission.request('PHOTO', true))
    return ImageCropPicker.openPicker({
      ...defaultOptions,
      mediaType: 'video',
      cropping: false,
      freeStyleCropEnabled: false,
      width: width,
      height: height,
      compressImageQuality: quality,
      ...props,
    })
}

export const ImagePicker = {
  takePhoto,
  pickPhoto,
  pickVideo,
  defaultOptions,
}
