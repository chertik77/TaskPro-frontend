import type { Action } from '@reduxjs/toolkit'
import type { FilterInitialState } from './filter.slice'
import type { UserInitialState } from './user.slice'

import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { filterReducer } from './filter.slice'
import { userReducer } from './user.slice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['_persist']
}

export const store = configureStore({
  reducer: {
    filter: persistReducer<FilterInitialState, Action>(
      persistConfig,
      filterReducer
    ),
    user: persistReducer<UserInitialState, Action>(persistConfig, userReducer)
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)
