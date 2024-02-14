import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userApi } from './api/user'
import { boardReducer } from './slices/board/board-slice'
import { boardsReducer } from './slices/boards/boards-slice'
import { userReducer } from './slices/user/user-slice'
import type { UserInitialState } from './slices/user/user-types'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
  blacklist: ['_persist']
}

export const store = configureStore({
  reducer: {
    user: persistReducer<UserInitialState>(persistConfig, userReducer),
    board: boardReducer,
    boards: boardsReducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      userApi.middleware
    )
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
