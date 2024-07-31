import React, { useCallback, useRef, useState } from 'react'
import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { AppColors } from '@/app/assets'
import { AppTypo } from '@/app/constants'

export type TopTabBarItemData = {
  value: any
  displayText: string
  quantity: number
}

export type TopTabBarProps = {
  data: TopTabBarItemData[]
  initValue?: any
  onChangeValue?: (value: any) => void
}

export const TopTabBar: React.FC<TopTabBarProps> = React.memo(
  ({ data, initValue, onChangeValue }) => {
    const [activeValue, setActiveValue] = useState(initValue ?? null)
    const listRef = useRef<FlatList>(null)

    const onPressTab = useCallback(
      (value: any) => {
        onChangeValue?.(value)
        setActiveValue(value)
        const index = data.findIndex((d) => d.value === value)
        if (index >= 0) {
          listRef.current?.scrollToIndex({ animated: true, index, viewPosition: 0.5 })
        }
      },
      [onChangeValue, data, listRef.current],
    )

    const renderItem = useCallback(
      ({ item }: { item: TopTabBarItemData }) => {
        return (
          <TopTabBarItem
            isActive={item.value === activeValue}
            label={`${item.displayText} (${item.quantity})`}
            onPress={onPressTab}
            value={item.value}
          />
        )
      },
      [activeValue],
    )

    if (data?.length === 0) return null

    return (
      <View style={{ height: 40 }}>
        <FlatList
          ref={listRef}
          style={styles.list}
          data={data}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `TopTabBar_${item.value ?? index}`}
          windowSize={3}
          keyboardShouldPersistTaps={'handled'}
        />
      </View>
    )
  },
)

type TopTabBarItemProps = {
  isActive?: boolean
  style?: StyleProp<ViewStyle>
  value?: any
  onPress?: (value: any) => void
  label?: string
  labelStyle?: StyleProp<TextStyle>
}

const TopTabBarItem: React.FC<TopTabBarItemProps> = React.memo(
  ({ isActive, style, value, onPress, label, labelStyle }) => {
    return (
      <TouchableOpacity
        style={[
          styles.itemTab,
          {
            borderBottomWidth: isActive ? 2 : 1,
            borderBottomColor: isActive ? AppColors.textActivate : AppColors.strokeMain,
          },
          style,
        ]}
        onPress={() => onPress?.(value)}>
        <Text
          style={[
            AppTypo.headline.regular,
            styles.title,
            { color: isActive ? AppColors.textActivate : AppColors.textMain },
            labelStyle,
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    )
  },
)

const styles = StyleSheet.create({
  list: {
    height: 40,
  },
  title: {},
  itemTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
