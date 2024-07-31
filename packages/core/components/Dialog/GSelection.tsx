import { AppColors, AppIcons } from '@/app/assets'
import { AppTypo } from '@/app/constants'
import { toLowerCaseNonAccentVietnamese } from 'packages/core/utils/NonAccentVietnamese'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  DimensionValue,
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Divider } from '../Screen/Divider'
import { GBottomSheetHeader } from './GBottomSheet'
import { SearchField } from '../Input'
import { Icon } from '../Icon'

export type GSelectionTheme = {
  viewItem?: StyleProp<ViewStyle>
  textItem?: StyleProp<TextStyle>
}

type GSelectionItem = {
  label: string
  value: string
}

type GSelectionShowProps = {
  title?: string
  data?: GSelectionItem[]
  valueSelected?: string
  height?: DimensionValue
  enableSearch?: boolean
  placeholderSearch?: string
  onSelected?: (item: GSelectionItem) => void
  onClose?: () => void
}

type GSelectionProps = {
  show: (prop: GSelectionShowProps) => void
  hide: () => void
}

const GSelectionRef = React.createRef<GSelectionProps | null>()

export function GSelectionComponent({ theme }: { theme?: GSelectionTheme }) {
  const insets = useSafeAreaInsets()
  const [visible, setVisible] = useState(false)
  const [height, setHeight] = useState<DimensionValue>('70%')

  const [title, setTitle] = useState('')
  const [data, setData] = useState<GSelectionItem[]>([])
  const [enabledSearch, setEnabledSearch] = useState(false)
  const [placeholderSearch, setPlaceholderSearch] = useState('')
  const [value, setValue] = useState('')

  const [textSearch, setTextSearch] = useState('')
  const [dataSearch, setDataSearch] = useState<GSelectionItem[]>([])
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const onCloseRef = useRef<Function | undefined>(undefined)
  const onSelectedRef = useRef<((item: GSelectionItem) => void) | undefined>(undefined)

  useLayoutEffect(() => {
    // @ts-ignore
    GSelectionRef.current = {
      show: ({
        title,
        enableSearch,
        height,
        placeholderSearch,
        data,
        valueSelected,
        onSelected,
        onClose,
      }: GSelectionShowProps) => {
        setTitle(title ?? '')
        setData(data ?? [])
        setTextSearch('')
        setEnabledSearch(enableSearch ?? false)
        setPlaceholderSearch(placeholderSearch ?? '')
        setHeight(height ?? '70%')
        setValue(valueSelected ?? '')

        onSelectedRef.current = onSelected
        onCloseRef.current = onClose
        setVisible(true)
      },
      hide: () => setVisible(false),
    }
  }, [])

  const _onClose = () => {
    setVisible(false)
    onCloseRef.current?.()
  }

  const _onPressItem = useCallback((item: GSelectionItem) => {
    onSelectedRef.current?.(item)
    _onClose()
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: GSelectionItem }) => {
      return (
        <ItemGSelection
          item={item}
          theme={theme}
          onPress={_onPressItem}
          selected={value === item.value}
        />
      )
    },
    [value],
  )

  useEffect(() => {
    clearTimeout(searchTimeoutRef.current)
    if (textSearch === '') setDataSearch([])
    else {
      searchTimeoutRef.current = setTimeout(() => {
        setDataSearch(search(data, textSearch))
      }, 200)
    }
  }, [textSearch, data])

  const search = useCallback((data: GSelectionItem[], text: string) => {
    return data.filter((d) =>
      toLowerCaseNonAccentVietnamese(d.label).includes(toLowerCaseNonAccentVietnamese(text)),
    )
  }, [])

  const renderDivider = useCallback(() => {
    return <Divider />
  }, [])

  return (
    <ReactNativeModal
      isVisible={visible}
      backdropOpacity={0.4}
      onBackdropPress={_onClose}
      onBackButtonPress={_onClose}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      style={{ justifyContent: 'flex-end', margin: 0 }}>
      <View
        style={[
          styles.content,
          {
            paddingBottom: insets.bottom ? insets.bottom : 12,
            height: height,
          },
        ]}>
        {title ? <GBottomSheetHeader title={title} onClose={_onClose} /> : null}
        {enabledSearch ? (
          <SearchField
            onChangeText={setTextSearch}
            placeholder={placeholderSearch}
            theme={{ container: { marginHorizontal: 16, marginVertical: 8 } }}
          />
        ) : null}
        <FlatList
          data={textSearch ? dataSearch : data}
          renderItem={renderItem}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}
          keyExtractor={(item) => item.value}
          ItemSeparatorComponent={renderDivider}
          windowSize={3}
        />
      </View>
    </ReactNativeModal>
  )
}

export const GSelection = {
  show: (props: GSelectionShowProps) => GSelectionRef.current?.show?.(props),
  hide: () => GSelectionRef.current?.hide?.(),
}

export default GSelection

const ItemGSelection = React.memo(
  ({
    item,
    selected,
    onPress,
    theme,
  }: {
    item: GSelectionItem
    selected?: boolean
    onPress?: (item: GSelectionItem) => void
    theme?: GSelectionTheme
  }) => {
    return (
      <TouchableOpacity style={[styles.viewItem, theme?.viewItem]} onPress={() => onPress?.(item)}>
        <Text style={[styles.textItem, theme?.textItem]} numberOfLines={3}>
          {item.label}
        </Text>
        {selected ? <Icon source={AppIcons.ico_check} color={AppColors.buttonMain} /> : null}
      </TouchableOpacity>
    )
  },
)

const styles = StyleSheet.create({
  content: {
    backgroundColor: AppColors.bgMain,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  title: {
    ...AppTypo.body.medium,
    color: AppColors.textDisabled,
    textAlign: 'center',
    marginBottom: 6,
  },
  textItem: {
    ...AppTypo.body.regular,
    flex: 1,
  },
  viewItem: {
    paddingVertical: 12,
    flexDirection: 'row',
  },
})
