import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { sidebarReducer } from './sidebar.slice'
import { userReducer } from './user.slice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['_persist']
}

export const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, userReducer),
    sidebar: persistReducer(persistConfig, sidebarReducer)
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)
