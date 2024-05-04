import type { UserInitialState } from './user.slice'

import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { userReducer } from './user.slice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['_persist']
}

export const store = configureStore({
  reducer: {
    user: persistReducer<UserInitialState>(persistConfig, userReducer)
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
