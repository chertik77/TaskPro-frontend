import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { sidebarReducer } from './sidebar.slice'
import { userReducer } from './user.slice'

const persistConfig = { key: 'root', storage }

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  sidebar: persistReducer(persistConfig, sidebarReducer)
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
