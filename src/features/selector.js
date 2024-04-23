// Selector for authentification
export const selectAuth = (state) => state.authSlice.auth
export const selectToken = (state) =>state.authSlice.token
export const selectUserId = (state) => state.authSlice.id


// Selector for user informations
export const selectUserInfos = (state) =>state.userSlice.userInfos[0]
export const selectNumberFriends = (state)=>state.userSlice.numberFriends
export const selectNumberMessages = (state)=>state.userSlice.numberMessages
export const selectDefunctsList = (state)=>state.userSlice.defunctsList
export const selectDefunct = (state)=>state.userSlice.defunctSelected
export const selectAdminInfos = (state) => state.userSlice.adminInfos
export const selectListFriends = (state) => state.userSlice.listFriends[0]

// Selector for others informations
export const selectIdDef = (state)=>state.utilSlice.idDefIdSelected
export const selectNewAdmin = (state)=>state.utilSlice.infosAdmin
export const selectAllDefunct = (state)=>state.utilSlice.listAllDefunct