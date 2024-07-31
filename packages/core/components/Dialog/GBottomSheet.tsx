import { AppColors } from '@/app/assets'
import { AppTypo } from '@/app/constants'
import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Screen } from '../Screen'

// https://github.com/react-native-modal/react-native-modal

/**
 * Styles action sheet
 */
const styles = StyleSheet.create({
  defaultContentStyle: {
    backgroundColor: AppColors.bgMain,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    minHeight: 300,
    overflow: 'hidden',
  },
})
/**
 * End styles
 */

export type GBottomSheetProp = {
  children?: React.ReactNode
  visible?: boolean
  style?: ViewStyle
  onPressClose?: () => void
  moreDialogProps?: object
}

export const GBottomSheet = ({
  children,
  visible,
  style,
  onPressClose,
  moreDialogProps = {},
}: GBottomSheetProp) => {
  const insets = useSafeAreaInsets()

  return (
    <Modal
      isVisible={!!visible}
      onBackdropPress={onPressClose}
      onBackButtonPress={onPressClose}
      swipeDirection={['down']}
      onSwipeComplete={onPressClose}
      propagateSwipe
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      useNativeDriverForBackdrop
      scrollOffsetMax={100}
      {...moreDialogProps}
      // @ts-ignore
      style={{ justifyContent: 'flex-end', margin: 0, ...moreDialogProps?.style }}>
      <View style={[styles.defaultContentStyle, { paddingBottom: insets.bottom }, style]}>
        {children}
      </View>
    </Modal>
  )
}

type GBottomSheetHeaderProp = {
  style?: ViewStyle
  ItemLeft?: React.ReactNode
  ItemRight?: React.ReactNode
  title?: string
  onClose?: () => void
}

export const GBottomSheetHeader = ({
  style,
  ItemLeft,
  ItemRight,
  title,
  onClose,
}: GBottomSheetHeaderProp) => {
  return (
    <Screen.Header
      safeTop={false}
      style={[{ height: 48 }, style]}
      onClose={onClose}
      hasBack={false}
      hasClose={true}
      ItemLeft={ItemLeft}
      ItemRight={ItemRight}
      title={title}
      titleStyle={AppTypo.headline.semiBold}
    />
  )
}
