import I18n from '@/app/controllers/languages/I18n'
import { GAlert } from 'packages/core/components/Dialog'
import { Linking, Platform } from 'react-native'
import RNPermission from 'react-native-permissions'

const nativePERMISSIONS = RNPermission.PERMISSIONS
const IOSPERS = nativePERMISSIONS.IOS
const ANPERS = nativePERMISSIONS.ANDROID

const _PERMISSIONS = {
  CAMERA: Platform.OS === 'ios' ? IOSPERS.CAMERA : ANPERS.CAMERA,
  PHOTO: Platform.OS === 'ios' ? IOSPERS.PHOTO_LIBRARY : ANPERS.READ_EXTERNAL_STORAGE,
  FACEID: IOSPERS.FACE_ID,
  // LOCATION: Platform.OS === 'ios' ? IOSPERS.LOCATION_WHEN_IN_USE : ANPERS.ACCESS_FINE_LOCATION,
}

const requestPermission = async (permission: keyof typeof _PERMISSIONS, alert = false) => {
  const keyP = _PERMISSIONS[permission] ?? ''
  if (!keyP) return false
  var status = await RNPermission.check(keyP)
  let result = false
  if (status === RNPermission.RESULTS.BLOCKED) {
    result = false
  }
  if (status === RNPermission.RESULTS.DENIED || status === 'unavailable') {
    status = await RNPermission.request(keyP)
  }
  if (status === RNPermission.RESULTS.GRANTED || status === RNPermission.RESULTS.LIMITED) {
    result = true
  }

  console.log('[CHECK PERMISISON]', permission, status)

  if (alert && result === false) {
    GAlert.show({
      title: I18n.t('confirm.title'),
      message: I18n.t('confirm.permission', { name: I18n.t(`enum.permission.${permission}`) }),
      actions: [
        { text: I18n.t('label.cancel'), type: 'cancel' },
        { text: I18n.t('label.setting'), onPress: () => Linking.openSettings() },
      ],
    })
  }
  return result
}

export const Permission = {
  request: requestPermission,
}
