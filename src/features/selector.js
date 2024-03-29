// Selector for authentification
export const selectAuth = (state) => state.authSlice.auth

// Selector for user informations
export const selectUserInfos = (state) =>state.userSlice.userInfos
export const selectNumberFriends = (state)=>state.userSlice.numberFriends
export const selectNumberMessages = (state)=>state.userSlice.numberMessages
export const selectDefunctsList = (state)=>state.userSlice.defunctsList