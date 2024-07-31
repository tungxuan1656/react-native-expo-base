import { createSlice } from '@reduxjs/toolkit'
// import remoteConfig from '@react-native-firebase/remote-config'
import { store } from '../redux/AppStore'

export const fetchFBRemoteConfig = async () => {
  // lệnh này lấy dữ liệu server trả về và là quan trọng nhất
  // await remoteConfig()
  // 	.fetch(600)
  // 	.then((res) => console.log('[RemoteConfig]', res))
  // 	.catch((err) => console.log('[RemoteConfig]', err))
  // await remoteConfig().activate() // kệ nó trả về false or true. Android bị lỗi như thế
  // const sConfig = remoteConfig().getValue('AppConfig').asString()
  // try {
  // 	const config = JSON.parse(sConfig)
  // 	store.dispatch(RemoteConfigActions.setRemoteConfig(config))
  // } catch (error) {
  // 	console.log('[RemoteConfig]', error)
  // }
}

type InitialStateProps = {
  config?: { [k: string]: any }
}

const initialState: InitialStateProps = {}

const RemoteConfigSlice = createSlice({
  name: 'slice/config',
  initialState: initialState,
  reducers: {
    setRemoteConfig: (state, { payload }) => {
      state.config = { ...state.config, ...payload }
    },
  },
})

export default RemoteConfigSlice
export const RemoteConfigActions = RemoteConfigSlice.actions
