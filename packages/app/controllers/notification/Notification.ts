export {}
// import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
// import { useEffect, useState } from 'react'
// import GToast from 'src/shared/components/Dialog/GToast'
// import { useAppDispatch, useAppSelector } from 'src/shared/hooks/ReduxHooks'
// import { PermissionsAndroid, Platform } from 'react-native'
// import { AppActions } from 'src/controllers/redux/AppSlice'
// import DeviceInfo from 'react-native-device-info'

// const Notification = () => {
// 	const dispatch = useAppDispatch()
// 	const isRegisterNotify = useAppSelector((s) => s.app.isGrantedNotify)
// 	const isHomeReady = useAppSelector((s) => s.app.isHomeReady)
// 	const [deviceToken, setDeviceToken] = useState('')

// 	useEffect(() => {
// 		requestNotifyPermission()
// 	}, [])

// 	useEffect(() => {
// 		if (!isRegisterNotify) return
// 		getFCMToken()

// 		messaging().onNotificationOpenedApp(handleOpenBackgroundMessage)
// 		const unsubscribe = messaging().onMessage(handleReceivedMessage)
// 		return unsubscribe
// 	}, [isRegisterNotify])

// 	const getFCMToken = async () => {
// 		const token = await messaging()
// 			.getToken()
// 			.catch((err) => console.log(err))
// 		console.log('FCM TOKEN', token)
// 		if (typeof token === 'string') {
// 			setDeviceToken(token)
// 		}
// 	}

// 	const handleReceivedMessage = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
// 		console.log('Receive remote messsage', remoteMessage)
// 		const data = remoteMessage.data
// 		const notification = remoteMessage.notification
// 		// handle -> show message or not
// 		const title = notification?.title
// 		const body = notification?.body
// 		if (title && body) {
// 			GToast.info({
// 				title: title,
// 				message: body,
// 				onPress: () => {
// 					handleOpenBackgroundMessage(remoteMessage)
// 				},
// 			})
// 		}
// 	}

// 	const handleOpenBackgroundMessage = async (
// 		remoteMessage: FirebaseMessagingTypes.RemoteMessage,
// 	) => {
// 		console.log('Open background message', remoteMessage)
// 	}

// 	const requestNotifyPermission = async () => {
// 		if (Platform.OS === 'ios') {
// 			messaging()
// 				.requestPermission()
// 				.then((authStatus) => {
// 					const enabled =
// 						authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
// 						authStatus === messaging.AuthorizationStatus.PROVISIONAL
// 					dispatch(AppActions.setGrantedNotify({ granted: enabled }))
// 				})
// 				.catch((error) => {
// 					console.log(error)
// 					dispatch(AppActions.setGrantedNotify({ granted: false }))
// 				})
// 		} else if (Platform.OS === 'android' && DeviceInfo.getApiLevelSync() >= 33) {
// 			PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
// 				.then((authStatus) => {
// 					console.log('requestNotifyPermission', authStatus)
// 					dispatch(AppActions.setGrantedNotify({ granted: authStatus === 'granted' }))
// 				})
// 				.catch((error) => console.log('requestNotifyPermission', error))
// 		} else {
// 			dispatch(AppActions.setGrantedNotify({ granted: true }))
// 		}
// 	}

// 	useEffect(() => {
// 		if (deviceToken != '' && isHomeReady) {
// 			updateDeviceToken(deviceToken)
// 		}
// 	}, [deviceToken, isHomeReady])

// 	const updateDeviceToken = (token: string) => {
// 		console.log('UPDATE DEVICE TOKEN')
// 	}

// 	return null
// }

// export default Notification
