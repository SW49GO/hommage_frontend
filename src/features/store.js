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
      auth: false,
      token : '',
      pwd : ''
  },
  reducers: {
      setIsAuth: (state, action)=>{
          state.auth = action.payload
      },
      setToken : (state, action)=>{
        state.token = action.payload 
      },
      setPwd : (state, action)=>{
        state.pwd = action.payload 
      }
    }
})

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    userInfos:[],
    defunctsList: [],
    numberFriends : 0,
    numberMessages: 0
  },
  reducers: {
    setUserInfos: (state, action)=>{
      const {firstName, lastName, photo, pseudo, numberRoad, address, cp, city, email} = action.payload
      state.userInfos.push({
        firstName : firstName || '',
        lastName : lastName || '',
        photo : photo || '',
        pseudo : pseudo || '',
        numberRoad : numberRoad || '',
        address : address || '',
        cp : cp || '',
        city : city || '',
        email : email || ''
      })
    },
    setNumberFriends : (state, action)=>{
      state.numberFriends = action.payload
    },
    setNumberMessages : (state,action)=>{
      state.numberMessages = action.payload
    },
    setDefunctsList : (state, action)=>{
      const {lastName,firstName} = action.payload
      state.defunctsList.push({
        lastName : lastName || '',
        firstName : firstName || ''
      })
    }
  }
})

export const {setIsAuth, setToken, setPwd} = authSlice.actions
export const {setUserInfos, setNumberFriends, setNumberMessages, setDefunctsList} = userSlice.actions

const authPersistSlice = persistReducer(sessionStoragePersistConfig, authSlice.reducer)
const userInfosPersistSlice = persistReducer(localStoragePersistConfig, userSlice.reducer)

// Store configuration
export const store = configureStore({
    reducer : {
      authSlice : authPersistSlice,
      userSlice : userInfosPersistSlice
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