import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './api/user'
import { userReducer } from './slices/user/user-slice'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const authPersistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: authPersistedReducer,
    [userApi.reducerPath]: userApi.reducer
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({ serializableCheck: false }).concat(
  //     userApi.middleware
  //   )
  middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
    }
})
setupListeners(store.dispatch)
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>

