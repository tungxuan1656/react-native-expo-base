import { AppColors } from '@/app/assets'
import { AppStyles, AppTypo } from '@/app/constants'
import React, { useRef } from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Icon, IconSource } from '../Icon'

type ItemSwipeableProps = {
  item: any
  renderActions?: (item: any, cb?: () => void) => React.ReactNode
  children?: React.ReactNode | JSX.Element | JSX.Element[]
  style?: StyleProp<ViewStyle>
}

const ItemSwipeable = ({ item, renderActions, children, style }: ItemSwipeableProps) => {
  const refSwipeable = useRef<Swipeable>()

  return (
    <Swipeable
      containerStyle={{ backgroundColor: AppColors.white }}
      renderRightActions={() => renderActions?.(item, () => refSwipeable.current?.close?.())}
      ref={refSwipeable}>
      <View style={[{ backgroundColor: AppColors.white }, style]}>{children}</View>
    </Swipeable>
  )
}

export const SwipeableAction = ({
  icon,
  item,
  style,
  title,
  onPress,
  cb,
}: {
  item: any
  icon: IconSource
  style: StyleProp<ViewStyle>
  title: string
  onPress: (item: any) => void
  cb?: () => void
}) => {
  return (
    <TouchableOpacity
      style={[{ justifyContent: 'center', alignItems: 'center' }, style]}
      onPress={() => {
        onPress(item)
        cb?.()
      }}>
      <Icon color={AppColors.white} source={icon} size={24} />
      <Text style={{ ...AppTypo.caption.medium, color: AppColors.white, marginTop: 2 }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export const ViewSwipeable = ({
  style,
  children,
}: {
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode | JSX.Element | JSX.Element[]
}) => {
  return <View style={[AppStyles.viewSwipeable.container, style]}>{children}</View>
}

export default React.memo(ItemSwipeable)

const styles = StyleSheet.create({})
