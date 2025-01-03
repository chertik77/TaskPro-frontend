import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { sidebarReducer } from 'features/sidebar/sidebar.slice'
import { userReducer } from 'features/user/user.slice'

const rootReducer = combineReducers({
  user: persistReducer({ key: 'user', storage }, userReducer),
  sidebar: persistReducer({ key: 'sidebar', storage }, sidebarReducer)
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
