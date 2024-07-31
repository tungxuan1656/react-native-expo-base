import React, { useEffect, useState } from 'react'
import {
  Platform,
  StyleProp,
  StyleSheet,
  Switch,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { AppColors, AppIcons } from '@/app/assets'
import { Divider } from '../Screen/Divider'
import { HStack } from './HStack'
import { AppTypo } from '@/app/constants'
import { Icon } from '../Icon'

type SectionInputProps = {
  style?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  keepChildren?: JSX.Element | JSX.Element[] | React.ReactNode
  children?: JSX.Element | JSX.Element[] | React.ReactNode
  title?: string
  titleStyle?: StyleProp<TextStyle>
  showContent?: boolean
  hidden?: boolean
  hiddenSwitch?: boolean
  showArrow?: boolean
  name?: string
  onChangeShowContent?: (isShow: boolean, name?: string) => void
}

export const SectionInput = ({
  style,
  contentStyle,
  keepChildren,
  children,
  title,
  titleStyle,
  showContent = true,
  hidden = false,
  hiddenSwitch = false,
  showArrow = false,
  name,
  onChangeShowContent,
}: SectionInputProps) => {
  if (hidden) return null
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    setIsShow(showContent)
  }, [showContent])

  const _onValueChange = (value: boolean) => {
    onChangeShowContent?.(value, name)
  }

  return (
    <View style={[styles.container, style]}>
      {title ? (
        <>
          <HStack style={{ alignItems: 'center', height: 48 }}>
            <Text style={[AppTypo.headline.semiBold, { flex: 1 }, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
            {hiddenSwitch ? null : (
              <Switch
                value={isShow}
                onValueChange={_onValueChange}
                trackColor={{ false: AppColors.switchTrackFalse, true: AppColors.switchTrackTrue }}
                thumbColor={AppColors.switchThumb}
                style={Platform.OS === 'ios' && styles.switchIOS}
              />
            )}
            {showArrow ? (
              <Icon
                source={isShow ? AppIcons.ico_arrow_up : AppIcons.ico_arrow_down}
                onPress={() => _onValueChange(!isShow)}
              />
            ) : null}
          </HStack>
          {isShow ? <Divider style={{ backgroundColor: AppColors.strokeExtra }} /> : null}
        </>
      ) : null}
      {keepChildren}
      {isShow ? <View style={[styles.content, contentStyle]}>{children}</View> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.bgMain,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: AppColors.strokeMain,
    paddingHorizontal: 12,
    marginTop: 16,
    marginHorizontal: 16,
  },
  content: {
    gap: 12,
    paddingVertical: 12,
  },
  switchIOS: { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }, { translateX: 6 }] },
})
