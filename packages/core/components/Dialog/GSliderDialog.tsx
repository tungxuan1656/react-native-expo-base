import React, { createRef, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { Button } from '../Button'
import { sleep } from 'packages/core/utils/Common'
import { AppColors } from '@/app/assets'
import { AppTypo } from '@/app/constants'
import { Screen } from '../Screen'
import Slider, { SliderProps } from '@react-native-community/slider'
import { HStack } from '../View'

type Action = {
  text: string
  type?: 'cancel' | 'default'
  onPress?: (value: number) => void
}

type GSliderDialogShowProps = {
  title?: string
  message: string
  unit?: string
  actions: Action[]
  onClose?: () => void
} & SliderProps

type GSliderDialogProps = {
  show: (prop: GSliderDialogShowProps) => void
  hide: () => void
}

const GSliderDialogRef = createRef<GSliderDialogProps | null>()

export const GSliderDialog = {
  show: (props: GSliderDialogShowProps) => {
    Keyboard.dismiss()
    GSliderDialogRef.current?.show(props)
  },
  hide: () => {
    GSliderDialogRef.current?.hide()
  },
}

export function GSliderDialogComponent() {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState({ title: '', message: '' })
  const [actions, setActions] = useState<Action[]>([])
  const [value, setValue] = useState(100)
  const [unit, setUnit] = useState('')
  const [props, setProps] = useState<any>(null)

  const onCloseRef = useRef(null)

  useLayoutEffect(() => {
    // @ts-ignore
    GSliderDialogRef.current = {
      show: ({
        title,
        message,
        value,
        actions,
        unit,
        onClose,
        ...props
      }: GSliderDialogShowProps) => {
        setLabel({ title, message })
        setValue(value)
        setActions(actions)
        setProps(props)
        setUnit(unit)
        if (typeof onClose === 'function') onCloseRef.current = onClose
        else onCloseRef.current = null

        setVisible(true)
      },
      hide: () => setVisible(false),
    }
  }, [])

  const onCloseDialog = useCallback(() => {
    if (typeof onCloseRef.current === 'function') onCloseRef.current()
    setVisible(false)
  }, [])

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
      <Screen.Content style={[styles.content]}>
        {label.title && <Text style={styles.defaultTitleStyle}>{label.title}</Text>}
        {label.message &&
          (typeof label.message === 'string' ? (
            <Text style={[styles.defaultMessageStyle]}>{label.message}</Text>
          ) : (
            label.message
          ))}
        <HStack centerRow style={{ gap: 12, marginHorizontal: 16, marginTop: 8 }}>
          <Slider
            style={{ height: 40, flex: 1 }}
            minimumTrackTintColor={AppColors.textFocus}
            maximumTrackTintColor={AppColors.bgBlur}
            onValueChange={setValue}
            value={value}
            {...props}
          />
          <Text style={[AppTypo.body.semiBold]}>
            {value}
            {unit}
          </Text>
        </HStack>
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
                    action.onPress?.(value)
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
