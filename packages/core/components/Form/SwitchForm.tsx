export default {}
// import React from 'react'
// import { Controller, useFormContext } from 'react-hook-form'
// import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native'
// import { RegisterOptions } from 'react-hook-form/dist/types/validator'

// type SwitchFormProps = {
// 	name: string
// 	style?: StyleProp<ViewStyle>
// 	rules?: RegisterOptions
// 	title: string
// 	styleItem?: StyleProp<ViewStyle>
// 	onPress: (value: boolean) => void
// } & ItemSwichProps

// export const SwitchForm: React.FC<SwitchFormProps> = ({
// 	name,
// 	style,
// 	rules,
// 	title,
// 	onPress,
// 	styleItem,
// 	theme,
// 	...props
// }) => {
// 	const { control, formState } = useFormContext()
// 	let message = formState.errors[name]?.message?.toString()
// 	formState.isSubmitSuccessful
// 	return (
// 		<Controller
// 			control={control}
// 			rules={rules}
// 			render={({ field: { value } }) => (
// 				<ItemSwitch
// 					theme={{
// 						container: [styles.container, styleItem],
// 						content: styles.content,
// 						title: { ...AppTypo.headline.regular },
// 						...theme,
// 					}}
// 					setState={(switchState) => onPress(switchState)}
// 					state={value}
// 					title={title}
// 					{...props}
// 				/>
// 			)}
// 			name={name}
// 		/>
// 	)
// }
// export default SwitchForm

// const styles = StyleSheet.create({
// 	container: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		flex: 1,
// 		paddingBottom: 8,
// 		borderBottomWidth: 1,
// 		borderColor: AppColors.strokeExtra,
// 		minHeight: 56,
// 	},
// 	content: {
// 		flex: 1,
// 		justifyContent: 'flex-end',
// 	},
// })
