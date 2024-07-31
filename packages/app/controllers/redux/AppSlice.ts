import { combineReducers } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
import RemoteConfigSlice from '../remoteConfig/RemoteConfigSlice'

const initialState = {
  language: undefined,
  passIntro: false,
  isGrantedNotify: false,
  isHomeReady: false,
  isTabBarFocused: false,
  currentUser: null,
  store: null,
}

const AppSlice = createSlice({
  name: 'slice/app',
  initialState: initialState,
  reducers: {
    changeLanguage: (state, action) => {
      if (action.payload === 'vi' || action.payload === 'en') state.language = action.payload
    },
    setPassIntro: (state, action) => {
      if (action.payload) state.passIntro = action.payload
    },
    setGrantedNotify: (state, { payload }) => {
      state.isGrantedNotify = payload.granted ?? false
    },
    setHomeReady: (state, { payload }) => {
      state.isHomeReady = payload?.ready ?? true
    },
    setTabBarIsFocused: (state, action) => {
      state.isTabBarFocused = action.payload.isFocused
    },
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload
    },
    setStoreSelect: (state, { payload }) => {
      state.store = payload
    },
  },
})

export const appReducers = combineReducers({
  app: AppSlice.reducer,
  remoteConfig: RemoteConfigSlice.reducer,
})

export type RootReducer = ReturnType<typeof appReducers>

export const AppActions = { ...AppSlice.actions }
