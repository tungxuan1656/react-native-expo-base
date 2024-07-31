export default {}
// import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
// import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
// import ReactNativeModal from 'react-native-modal'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import { AppColors } from '@/app/assets'
// import Const from 'src/constants/Const'
// import { Divider } from '../Screen/Divider'
// import Button from '../Button/Button'
// import Styles from 'src/constants/Styles'
// import { GBottomSheetHeader } from './GBottomSheet'
// import CheckBox from '../Button/CheckBox'
// import HStack from '../View/HStack'
// import { AppFont, AppFontSize } from 'src/assets/AppFont'
// import SearchField from '../Search/SearchField'
// import AppFlatList from '../FlatList/AppFlatList'

// export type GMultiplePickerTheme = {
// 	content: ViewStyle
// 	title: TextStyle
// 	message: TextStyle
// 	buttonDone: ViewStyle
// 	textDone: TextStyle
// 	buttonCancel: ViewStyle
// 	textCancel: TextStyle
// }

// type PickerDataItem = {
// 	label: string
// 	value: string
// }

// type GMultiplePickerShowProps = {
// 	title?: string
// 	enableSearch?: boolean
// 	placeholderSearch?: string
// 	data?: PickerDataItem[]
// 	initSelectedValues?: string[]
// 	onDone?: (values: string[]) => void
// 	onClose?: () => void
// 	onTextSearchChange?: (text: string) => void
// 	onListLoadMore?: () => void
// 	hasMore?: boolean
// }

// type GMultiplePickerProps = {
// 	show: (prop: GMultiplePickerShowProps) => void
// 	hide: () => void
// 	update: ({ data, hasMore }: { data: PickerDataItem[]; hasMore?: boolean }) => void
// }

// const GMultiplePickerRef = React.createRef<GMultiplePickerProps | null>()

// export function GMultiplePickerComponent({
// 	theme,
// 	labelDone,
// 	labelCancel,
// }: {
// 	theme?: GMultiplePickerTheme
// 	labelDone?: string
// 	labelCancel?: string
// }) {
// 	const insets = useSafeAreaInsets()
// 	const [visible, setVisible] = useState(false)

// 	const [data, setData] = useState<PickerDataItem[]>([])
// 	const [title, setTitle] = useState('')
// 	const [enabledSearch, setEnabledSearch] = useState(false)
// 	const [placeholderSearch, setPlaceholderSearch] = useState('')
// 	const [hasMore, setHasMore] = useState(false)

// 	const [initSelectedValues, setInitSelectedValues] = useState<string[]>([])

// 	const selectedValuesRef = useRef<string[]>([])

// 	const onCloseRef = useRef<Function | undefined>(undefined)
// 	const onListLoadMoreRef = useRef<(() => void) | undefined>(undefined)
// 	const onTextSearchChangeRef = useRef<((text: string) => void) | undefined>(undefined)
// 	const onDoneRef = useRef<Function | undefined>(undefined)

// 	useLayoutEffect(() => {
// 		// @ts-ignore
// 		GMultiplePickerRef.current = {
// 			show: ({
// 				title,
// 				enableSearch,
// 				placeholderSearch,
// 				data,
// 				initSelectedValues,
// 				hasMore,
// 				onDone,
// 				onTextSearchChange,
// 				onListLoadMore,
// 				onClose,
// 			}: GMultiplePickerShowProps) => {
// 				setTitle(title ?? '')
// 				setData(data ?? [])
// 				setEnabledSearch(enableSearch ?? false)
// 				setPlaceholderSearch(placeholderSearch ?? '')
// 				setHasMore(hasMore ?? false)
// 				setInitSelectedValues(initSelectedValues ?? [])

// 				onDoneRef.current = onDone
// 				onListLoadMoreRef.current = onListLoadMore
// 				onTextSearchChangeRef.current = onTextSearchChange
// 				onCloseRef.current = onClose
// 				selectedValuesRef.current = []

// 				setVisible(true)
// 			},
// 			hide: () => setVisible(false),
// 			update: ({ data, hasMore }: { data: PickerDataItem[]; hasMore?: boolean }) => {
// 				setData(data)
// 				setHasMore(hasMore ?? false)
// 				setInitSelectedValues(selectedValuesRef.current)
// 			},
// 		}
// 	}, [])

// 	const onCloseDialog = () => {
// 		setVisible(false)
// 		if (typeof onCloseRef.current === 'function') onCloseRef.current()
// 	}

// 	const renderItem = useCallback(
// 		({ item }: { item: PickerDataItem }) => {
// 			return (
// 				<ItemGMultiplePicker
// 					label={item.label}
// 					initCheck={initSelectedValues.includes(item.value)}
// 					onChange={(isCheck) => {
// 						if (isCheck) addSelectedValue(item.value)
// 						else removeSelectedValue(item.value)
// 					}}
// 				/>
// 			)
// 		},
// 		[initSelectedValues],
// 	)

// 	const addSelectedValue = (value: string) => {
// 		selectedValuesRef.current.push(value)
// 	}

// 	const removeSelectedValue = (value: string) => {
// 		var index = selectedValuesRef.current.findIndex((v) => v === value)
// 		if (index >= 0) selectedValuesRef.current.splice(index, 1)
// 	}

// 	return (
// 		<ReactNativeModal
// 			isVisible={visible}
// 			backdropOpacity={0.4}
// 			onBackdropPress={onCloseDialog}
// 			onBackButtonPress={onCloseDialog}
// 			useNativeDriver={true}
// 			useNativeDriverForBackdrop={true}
// 			hideModalContentWhileAnimating={true}
// 			animationIn={'slideInUp'}
// 			animationOut={'slideOutDown'}
// 			style={{ justifyContent: 'flex-end', margin: 0 }}>
// 			<View
// 				style={[
// 					styles.content,
// 					{
// 						paddingBottom: insets.bottom ? insets.bottom : 12,
// 						height: Const.windowHeight - Const.statusBarHeight - 64,
// 					},
// 				]}>
// 				{title ? <GBottomSheetHeader title={title} onClose={onCloseDialog} /> : null}
// 				{enabledSearch ? (
// 					<SearchField
// 						onChange={onTextSearchChangeRef.current}
// 						placeholder={placeholderSearch}
// 						theme={{ container: { marginHorizontal: 16, marginVertical: 8 } }}
// 					/>
// 				) : null}
// 				<AppFlatList
// 					data={data}
// 					hasMore={hasMore}
// 					renderItem={renderItem}
// 					contentContainerStyle={{ flexGrow: 1 }}
// 					keyExtractor={(item) => item.value}
// 					ItemSeparatorComponent={() => <Divider />}
// 					onEndReached={onListLoadMoreRef.current}
// 				/>
// 				{/* <FlatList
// 					data={data}
// 					renderItem={renderItem}
// 					contentContainerStyle={{ flexGrow: 1 }}
// 					keyExtractor={(item) => item.value}
// 					ItemSeparatorComponent={() => <Divider />}
// 				/> */}
// 				<Divider />
// 				<HStack gap={16} style={{ marginHorizontal: 16, marginTop: 6 }}>
// 					<Button
// 						theme={{
// 							button: [styles.buttonDone, theme?.buttonCancel],
// 							text: [styles.textDone, theme?.textDone],
// 						}}
// 						title={labelDone ?? 'Done'}
// 						onPress={() => {
// 							onDoneRef.current?.(selectedValuesRef.current)
// 							onCloseDialog()
// 						}}
// 					/>
// 					<Button
// 						theme={{
// 							button: [styles.buttonCancel, theme?.buttonDone],
// 							text: [styles.textCancel, theme?.textCancel],
// 						}}
// 						title={labelCancel ?? 'Cancel'}
// 						onPress={onCloseDialog}
// 					/>
// 				</HStack>
// 			</View>
// 		</ReactNativeModal>
// 	)
// }

// const GMultiplePicker = {
// 	show: (props: GMultiplePickerShowProps) => GMultiplePickerRef.current?.show?.(props),
// 	hide: () => GMultiplePickerRef.current?.hide?.(),
// 	update: (params: { data: PickerDataItem[]; hasMore?: boolean }) =>
// 		GMultiplePickerRef.current?.update?.(params),
// }

// export default GMultiplePicker

// const ItemGMultiplePicker = ({
// 	label,
// 	initCheck,
// 	onChange,
// }: {
// 	label: string
// 	initCheck?: boolean
// 	onChange?: (isCheck: boolean) => void
// }) => {
// 	const [isCheck, setIsCheck] = useState(initCheck ?? false)

// 	return (
// 		<HStack gap={8} style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
// 			<CheckBox
// 				checked={isCheck ?? false}
// 				setChecked={(value) => {
// 					setIsCheck(value)
// 					onChange?.(value)
// 				}}
// 			/>
// 			<Text style={AppTypo.body.medium} numberOfLines={2}>
// 				{label}
// 			</Text>
// 		</HStack>
// 	)
// }

// const styles = StyleSheet.create({
// 	content: {
// 		backgroundColor: AppColors.bgMain,
// 		borderTopLeftRadius: 8,
// 		borderTopRightRadius: 8,
// 		overflow: 'hidden',
// 	},
// 	title: {
// 		...AppTypo.body.medium,
// 		color: AppColors.textDisabled,
// 		textAlign: 'center',
// 		marginBottom: 6,
// 	},
// 	message: {
// 		...AppTypo.body.regular,
// 		color: AppColors.textDisabled,
// 		textAlign: 'center',
// 		marginBottom: 12,
// 	},
// 	buttonDone: {
// 		height: 44,
// 		alignItems: 'center',
// 		borderRadius: 8,
// 		flexDirection: 'row',
// 		flexGrow: 1,
// 		justifyContent: 'center',
// 		backgroundColor: AppColors.buttonMain,
// 	},
// 	textDone: { color: AppColors.bgMain, fontFamily: AppFont.semiBold, fontSize: AppFontSize.large },
// 	buttonCancel: {
// 		height: 44,
// 		alignItems: 'center',
// 		borderRadius: 8,
// 		borderWidth: 1,
// 		borderColor: AppColors.buttonMain,
// 		flexDirection: 'row',
// 		backgroundColor: AppColors.bgMain,
// 		flexGrow: 1,
// 		justifyContent: 'center',
// 	},
// 	textCancel: {
// 		color: AppColors.textFocus,
// 		fontFamily: AppFont.semiBold,
// 		fontSize: AppFontSize.large,
// 	},
// })
