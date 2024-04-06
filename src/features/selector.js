// Selector for authentification
export const selectAuth = (state) => state.authSlice.auth
export const selectToken = (state) =>state.authSlice.token
export const selectUserId = (state) => state.authSlice.id


// Selector for user informations
export const selectUserInfos = (state) =>state.userSlice.userInfos
export const selectNumberFriends = (state)=>state.userSlice.numberFriends
export const selectNumberMessages = (state)=>state.userSlice.numberMessages
export const selectDefunctsList = (state)=>state.userSlice.defunctsList