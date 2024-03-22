import { createSlice, configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'

const localStoragePersistConfig = {
    key: 'localStorageSlice',
    storage: storage,
    whitelist: ['']
  }
  
const sessionStoragePersistConfig = {
key: 'sessionStorageSlice',
storage: storageSession,
whitelist: ['authSlice']
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        auth: false
    },
    reducers: {
        setIsAuth: (state,action)=>{
            state.auth = action.payload
        }
    }
})

export const {setIsAuth} = authSlice.actions

const authPersistSlice = persistReducer(sessionStoragePersistConfig, authSlice.reducer)

// Store configuration
export const store = configureStore({
    reducer : {
      authSlice : authPersistSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // Excludes the "persist/PERSIST" action from the serialization check, action is special and managed internally by Redux Persist during the persisted data recovery process
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      })
})
// persist store
export const persistor = persistStore(store)