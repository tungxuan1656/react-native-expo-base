import React, { useLayoutEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, Text, View, TextStyle, ViewStyle } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Divider } from '../Screen/Divider'
import { AppColors } from '@/app/assets'
import { AppTypo } from '@/app/constants'
import { sleep } from 'packages/core/utils/Common'
import { Button } from '../Button'

export type GActionSheetTheme = {
  content: ViewStyle
  title: TextStyle
  message: TextStyle
  button: ViewStyle
  text: TextStyle
  textCancel: TextStyle
  textDestructive: TextStyle
}

type SheetAction = {
  text: string
  type?: 'cancel' | 'default' | 'destructive'
  onPress?: () => void
}

type GActionSheetShowProps = {
  title?: string
  message?: string
  actions: SheetAction[]
  onPress?: (index: number) => void
  onClose?: () => void
}

type GActionSheetProps = {
  show: (prop: GActionSheetShowProps) => void
  hide: () => void
}

const GActionSheetRef = React.createRef<GActionSheetProps | null>()

export function GActionSheetComponent({
  theme,
  dividerStyle,
}: {
  theme?: GActionSheetTheme
  dividerStyle?: ViewStyle
}) {
  const [visible, setVisible] = useState(false)
  const [actions, setActions] = useState<SheetAction[]>([])
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const insets = useSafeAreaInsets()

  const onCloseRef = useRef<Function | undefined>(undefined)
  const onPressRef = useRef<Function | undefined>(undefined)

  useLayoutEffect(() => {
    // @ts-ignore
    GActionSheetRef.current = {
      show: ({ title, message, actions = [], onPress, onClose }: GActionSheetShowProps) => {
        setActions(actions)
        onCloseRef.current = onClose
        onPressRef.current = onPress
        setTitle(title ?? '')
        setMessage(message ?? '')

        setVisible(true)
      },
      hide: () => setVisible(false),
    }
  }, [])

  const onCloseDialog = () => {
    setVisible(false)
    if (typeof onCloseRef.current === 'function') onCloseRef.current()
  }

  return (
    <ReactNativeModal
      isVisible={visible}
      backdropOpacity={0.4}
      onBackdropPress={onCloseDialog}
      onBackButtonPress={onCloseDialog}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      style={{ justifyContent: 'flex-end', margin: 0 }}>
      <View style={[styles.content, { paddingBottom: insets.bottom }, theme?.content]}>
        {title ? <Text style={[styles.title, theme?.title]}>{title}</Text> : null}
        {message ? <Text style={[styles.message, theme?.message]}>{message}</Text> : null}
        {title && !!message ? <Divider style={dividerStyle} /> : null}
        {Array.isArray(actions) &&
          actions.map((action, index) => {
            return (
              <View key={index}>
                <Button
                  title={action.text}
                  onPress={async () => {
                    onCloseDialog()
                    await sleep(500)
                    action.onPress?.()
                    onPressRef.current?.(index)
                  }}
                  theme={{
                    button: [styles.button, theme?.button],
                    title: [
                      styles.text,
                      theme?.text,
                      action.type === 'cancel' && [styles.textCancel, theme?.textCancel],
                      action.type === 'destructive' && [
                        styles.textDestructive,
                        theme?.textDestructive,
                      ],
                    ],
                  }}
                />
                {index === actions.length - 1 ? null : <Divider style={dividerStyle} />}
              </View>
            )
          })}
      </View>
    </ReactNativeModal>
  )
}

export const GActionSheet = {
  show: ({ title, message, actions, onPress, onClose }: GActionSheetShowProps) => {
    Keyboard.dismiss()
    GActionSheetRef.current?.show({ title, message, actions, onPress, onClose })
  },
  hide: () => {
    GActionSheetRef.current?.hide()
  },
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: AppColors.bgMain,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // paddingBottom: 8,
  },
  title: {
    ...AppTypo.caption.medium,
    color: AppColors.textDisabled,
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 12,
  },
  message: {
    ...AppTypo.caption.regular,
    color: AppColors.textDisabled,
    textAlign: 'center',
    marginBottom: 6,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    height: 48,
  },
  text: { ...AppTypo.body.regular, color: AppColors.textFocus },
  textCancel: {
    ...AppTypo.body.semiBold,
    color: AppColors.textFocus,
  },
  textDestructive: {
    ...AppTypo.body.regular,
    color: AppColors.textValidate,
  },
})
