import React, { createRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { Button } from '../Button'
import { sleep } from 'packages/core/utils/Common'
import { AppColors } from '@/app/assets'
import { AppTypo } from '@/app/constants'
import { Divider, Screen } from '../Screen'

type Action = {
  text: string
  type?: 'cancel' | 'default'
  onPress?: (values: string[]) => void
}

type GInputDialogShowProps = {
  title?: string
  message: string
  inputFields: TextInputProps[]
  actions: Action[]
  onClose?: () => void
}

type GInputDialogProps = {
  show: (prop: GInputDialogShowProps) => void
  hide: () => void
}

const GInputDialogRef = createRef<GInputDialogProps | null>()

export const GInputDialog = {
  show: (props: GInputDialogShowProps) => {
    Keyboard.dismiss()
    GInputDialogRef.current?.show(props)
  },
  hide: () => {
    GInputDialogRef.current?.hide()
  },
}

export function GInputDialogComponent() {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [actions, setActions] = useState<Action[]>([])
  const [inputFields, setInputFields] = useState<TextInputProps[]>([])
  const [arrValue, setArrValue] = useState([])

  const onCloseRef = useRef(null)
  const refText = useRef<TextInput>(null)

  useLayoutEffect(() => {
    // @ts-ignore
    GInputDialogRef.current = {
      show: ({ title, message, inputFields, actions, onClose }: GInputDialogShowProps) => {
        if (inputFields.length === 0 || actions.length === 0) return

        setTitle(title)
        setMessage(message)
        setActions(actions)
        setInputFields(inputFields)
        setArrValue(Array(inputFields.length).fill(''))
        if (typeof onClose === 'function') onCloseRef.current = onClose
        else onCloseRef.current = null

        setVisible(true)
      },
      hide: () => setVisible(false),
    }
  }, [])

  useEffect(() => {
    if (visible) {
      refText.current?.focus()
    }
  }, [visible])

  const onCloseDialog = useCallback(() => {
    if (typeof onCloseRef.current === 'function') onCloseRef.current()
    setVisible(false)
  }, [])

  const updateValue = (value: string, index: number) => {
    const a = [...arrValue]
    a[index] = value
    setArrValue(a)
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
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={{ justifyContent: 'center', margin: 0 }}>
      <Screen.Content style={[styles.content]} useKeyboard>
        {!!title && <Text style={styles.defaultTitleStyle}>{title}</Text>}
        {!!message &&
          (typeof message === 'string' ? (
            <Text style={[styles.defaultMessageStyle]}>{message}</Text>
          ) : (
            message
          ))}
        {Array.isArray(inputFields) && inputFields.length > 0 ? (
          <View style={styles.viewInputs}>
            {inputFields.map((input, i) => (
              <View key={`${i}`}>
                <TextInput
                  {...input}
                  clearButtonMode={'while-editing'}
                  onChangeText={(v) => {
                    updateValue(v, i)
                    input.onChangeText?.(v)
                  }}
                  style={[
                    AppTypo.body.medium,
                    {
                      height: 44,
                      marginLeft: 12,
                      marginRight: 4,
                      paddingVertical: 0,
                      lineHeight: undefined,
                    },
                  ]}
                  numberOfLines={1}
                  placeholderTextColor={AppColors.textDisabled}
                  key={`${i}`}
                  ref={i === 0 ? refText : undefined}
                />
                {i != inputFields.length - 1 ? (
                  <Divider style={{ backgroundColor: AppColors.strokeMain }} />
                ) : null}
              </View>
            ))}
          </View>
        ) : null}
        <View style={styles.viewActions}>
          {Array.isArray(actions) &&
            actions.map((action, index) => {
              return (
                <Button
                  title={action.text}
                  key={`${index}`}
                  onPress={async () => {
                    onCloseDialog()
                    await sleep(500)
                    action.onPress?.(arrValue)
                  }}
                  theme={{
                    button: [styles.button, action.type === 'cancel' && styles.buttonCancel],
                    title: [styles.text, action.type === 'cancel' && styles.textCancel],
                  }}
                />
              )
            })}
        </View>
      </Screen.Content>
    </ReactNativeModal>
  )
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'stretch',
    backgroundColor: AppColors.white,
    borderRadius: 24,
    marginHorizontal: 20,
    paddingVertical: 20,
    flex: undefined,
    marginTop: '40%',
  },
  viewInputs: {
    borderWidth: 1,
    borderColor: AppColors.strokeMain,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
  },
  defaultTitleStyle: {
    ...AppTypo.h4.semiBold,
    textAlign: 'center',
    marginBottom: 8,
    marginHorizontal: 20,
  },
  defaultMessageStyle: {
    ...AppTypo.headline.regular,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  viewActions: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 16,
    marginTop: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 16,
    height: 48,
  },
  buttonCancel: { backgroundColor: AppColors.bgBlur },
  text: { ...AppTypo.headline.medium, color: AppColors.white },
  textCancel: {
    ...AppTypo.headline.medium,
    color: AppColors.buttonBlur,
  },
})
