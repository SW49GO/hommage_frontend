// Selector for authentification
export const selectAuth = (state) => state.authSlice.auth
export const selectToken = (state) =>state.authSlice.token
export const selectUserId = (state) => state.authSlice.id


// Selector for user informations
export const selectUserInfos = (state) =>state.userSlice.userInfos
export const selectNumberFriends = (state)=>state.userSlice.numberFriends
export const selectNumberMessages = (state)=>state.userSlice.numberMessages
export const selectDefunctsList = (state)=>state.userSlice.defunctsList
export const selectDefunct = (state)=>state.userSlice.defunctSelected[0]
export const selectAdminInfos = (state) => state.userSlice.adminInfos

// Selector for others informations
export const selectIdDef = (state)=>state.utilSlice.idDefIdSelected