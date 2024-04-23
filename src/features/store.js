import { createSlice, configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'
import { fetchInfos } from '../middlewares/thunks'

const localStorageUser = {
    key: 'localStorageUser',
    storage
  }
const sessionStorageAuth = {
  key: 'localStorageAuth',
  storage: storageSession
}
const localStorageUtil = {
  key: 'localStorageUtil',
  storage
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
      auth: false,
      token : '',
      id: null
  },
  reducers: {
      setAuth: (state, action)=>{
          state.auth = action.payload
      },
      setToken : (state, action)=>{
        state.token = action.payload 
      },
      setId : (state, action)=>{
        state.id = action.payload 
      }
    }
})

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    loading:'idle',
    error:null,
    userInfos:[],
    adminInfos:[],
    defunctsList: [],
    defunctSelected:[],
    numberFriends : 0,
    numberMessages: 0,
    listFriends :[]
  },
  reducers: {
    setUserInfos: (state, action)=>{
      const {id, firstname, lastname, photo, pseudo, number_road, address, postal_code, city, email, last_log} = action.payload
      state.userInfos = [{
        id: id || '',
        firstname: firstname || '',
        lastname: lastname || '',
        photo: photo || '',
        pseudo: pseudo || '',
        number_road: number_road || '',
        address: address || '',
        postal_code: postal_code || '',
        city: city || '',
        email: email || '',
        last_log: last_log || ''
      }]
    },
    setNumberFriends : (state, action)=>{
      state.numberFriends = action.payload
    },
    setNumberMessages : (state,action)=>{
      state.numberMessages = action.payload
    },
    setDefunctsList : (state, action)=>{
      state.defunctsList = action.payload
      },
    setSelectedDef : (state,action)=>{
      state.defunctSelected =action.payload
      },
    updateUserInfos : (state, action)=>{
      state.userInfos[0].photo = action.payload
    },
    setAdminInfos : (state,action)=>{
      state.adminInfos = action.payload
    },
    setListFriends : (state, action)=>{
      state.listFriends=action.payload
    },
  },
    extraReducers: (builder) => {
      builder
        .addCase(fetchInfos.pending, (state) => {
          state.loading = 'pending'
        })
        .addCase(fetchInfos.fulfilled, (state, action) => {
          state.loading = 'idle'
          state.userInfos = action.payload
        })
        .addCase(fetchInfos.rejected, (state, action) => {
          state.loading = 'idle'
          state.error = action.payload;
        })
    }
})

const utilSlice = createSlice({
  name: 'utilSlice',
  initialState: {
    idDefIdSelected: null,
    infosAdmin:[],
    listAllDefunct:[]
  },
  reducers: {
    setDefIdSelected : (state,action)=>{
      state.idDefIdSelected = action.payload
    },
    setInfosAdmin : (state, action)=>{
      state.infosAdmin = action.payload
    },
    setAllDefunct : (state, action)=>{
      state.listAllDefunct = action.payload
    }
  }
})

export const {setAuth, setToken,setId, setPwd} = authSlice.actions
export const {setUserInfos, setNumberFriends, setNumberMessages, setDefunctsList,updateUserInfos,setSelectedDef,setAdminInfos,setListFriends} = userSlice.actions
export const {setDefIdSelected,setInfosAdmin,setAllDefunct} = utilSlice.actions

const authPersistSlice = persistReducer(sessionStorageAuth, authSlice.reducer)
const userInfosPersistSlice = persistReducer(localStorageUser, userSlice.reducer)
const utilPersistSlice = persistReducer(localStorageUtil, utilSlice.reducer)

// Store configuration
export const store = configureStore({
    reducer : {
      authSlice : authPersistSlice,
      userSlice : userInfosPersistSlice,
      utilSlice : utilPersistSlice
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