import { Dispatch, Action, UnknownAction } from 'redux'
import { appReducers, RootReducer } from './AppSlice'
import { thunk, ThunkDispatch } from 'redux-thunk'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import devtoolsEnhancer from 'redux-devtools-expo-dev-plugin'
import { Storage } from 'redux-persist'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value)
    return Promise.resolve(true)
  },
  getItem: (key) => {
    const value = storage.getString(key)
    return Promise.resolve(value)
  },
  removeItem: (key) => {
    storage.delete(key)
    return Promise.resolve()
  },
}

const blacklistReduxActionLog = []

function logger({ getState, dispatch }: any) {
  return (next: any) => (action: any) => {
    if (blacklistReduxActionLog.indexOf(action.type) === -1) {
      console.log('[Redux]', action.type)
    }
    const returnValue = next(action)
    return returnValue
  }
}

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  transforms: [],
  whitelist: ['app'],
}

const getMiddlewares = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger, thunk)
/**
 * @param {Store} store
 */
export const store = configureStore({
  reducer: persistReducer<RootReducer>(persistConfig, appReducers),
  devTools: false,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devtoolsEnhancer()),
  middleware: getMiddlewares,
})

// gDM({
//   serializableCheck: {
//     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//   },
// }).concat(logger, thunk),

export const persistor = persistStore(store, {}, () => {})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = Dispatch<Action | UnknownAction> &
  ThunkDispatch<RootState, null, Action | UnknownAction>
