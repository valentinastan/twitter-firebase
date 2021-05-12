export default function userReducer(state, action) {

  switch(action.type) {
    case 'USER_AUTH':
      state.user = {...action.user}
 
      return {...state}
    case 'USER_LOGOUT':
      state.user = {}

      return {...state}
    case 'UNFOLLOWED_USERS':
      state.unfollowedUsers = action.unfollowedUsers

      return {...state}
    case 'NEW_FOLLOW':
      console.log("state------", state, action)
    
      state.user.followed = [...action.followRelation.currentUserFollowed]
      state.unfollowedUsers = state.unfollowedUsers.filter(user => user.uid !== action.followRelation.followedUserUid.toString())
   
      console.log("state------", state, action)
      return {...state}
    default:

      return {...state}
  }
}