import React, { useState } from 'react'
import { ActivityIndicator, FlatList, FlatListProps, StyleProp, ViewStyle } from 'react-native'
import { AppColors } from '@/app/assets'
import { useDidUpdateEffect } from 'packages/core/hooks'
import { EmptyView } from './EmptyView'

type AppFlatListProps = {
  style?: StyleProp<ViewStyle>
  data: Array<any>
  hasMore?: boolean
  isLoading?: boolean
  hiddenOnFirstTime?: boolean
} & FlatListProps<any>

export const AppFlatList = ({
  style,
  data,
  hasMore,
  isLoading,
  onEndReached,
  hiddenOnFirstTime,
  contentContainerStyle,
  ListEmptyComponent,
  ...props
}: AppFlatListProps) => {
  const [isFirstTime, setIsFirstTime] = useState(true)

  if (hiddenOnFirstTime) {
    useDidUpdateEffect(() => {
      setIsFirstTime(false)
    }, [data])
  }

  const ListFooterComponent = () => {
    return hasMore ? (
      <ActivityIndicator
        color={AppColors.buttonMain}
        size={'small'}
        style={{ marginTop: 8, marginBottom: 16 }}
      />
    ) : null
  }

  const renderEmpty = () => {
    return isLoading ? <ActivityIndicator style={{ marginVertical: 16 }} /> : <EmptyView />
  }

  const _onEndReached = (e: any) => {
    if (hasMore) onEndReached?.(e)
  }

  if (isFirstTime && hiddenOnFirstTime) return null

  return (
    <FlatList
      style={style}
      extraData={data}
      data={data}
      onEndReached={_onEndReached}
      ListFooterComponent={ListFooterComponent}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={ListEmptyComponent ?? renderEmpty}
      removeClippedSubviews={false}
      contentContainerStyle={
        ListEmptyComponent
          ? contentContainerStyle
          : data.length === 0
            ? { flexGrow: 1 }
            : contentContainerStyle
      }
      {...props}
    />
  )
}
