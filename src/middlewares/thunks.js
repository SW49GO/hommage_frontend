import { createAsyncThunk } from "@reduxjs/toolkit"
import  {setUserInfos, setAdminInfos, setAuth} from "../features/store"
import * as api  from "../services/api"

export const fetchInfos = createAsyncThunk('userSlice/infosUser', async (data, thunkAPI) => {
console.log('dataTHUNK:', data)
  const state = thunkAPI.getState()
    console.log('state:', state.authSlice)
    const {id, token, idDef, ctrl, other} = data
    try{
      const response = await api.getInfos(id, token, idDef, ctrl, other)
      console.log('responseTHUNK:', response)
      if(response){
        thunkAPI.dispatch(setAuth(true))
        console.log('coucou')
        thunkAPI.dispatch(setUserInfos(response.userData[0]))
        const adminInfos = response.userData.filter((item, index) => index !== 0)
        thunkAPI.dispatch(setAdminInfos(adminInfos))
      }
      // Update the connexion informations
      if (!state.authSlice.auth){
          api.updater(id,token,null, 'updateLastLogin')
          api.updater(id, token,null,'updateNewLogin')
          api.updater(id,token,1,'updateOnline')
      }
      return response.userData
    }catch(error){
      return error
    }
})