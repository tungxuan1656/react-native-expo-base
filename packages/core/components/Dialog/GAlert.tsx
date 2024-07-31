import { Alert, AlertButton } from 'react-native'

type GAlertButton = {
  text: string
  onPress?: () => void
  type?: 'default' | 'cancel' | 'destructive'
}

type GAlertProps = {
  title: string
  message?: string
  actions?: GAlertButton[]
}

const show = ({ title, message, actions = [] }: GAlertProps) => {
  const buttons: AlertButton[] = actions?.map((a) => {
    return {
      text: a.text,
      onPress: a.onPress,
      style: a.type,
      isPreferred: true,
    }
  })
  Alert.alert(title, message, buttons, { cancelable: true, userInterfaceStyle: 'light' })
}

export const GAlert = {
  show,
}
