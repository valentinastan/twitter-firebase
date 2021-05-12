export default function userReducer(state, action) {

  switch(action.type) {
    case 'NEW_TWEET':
      console.log("tweetul din reducer", action.tweet)
      state.tweets.push(action.tweet)
 
      return {...state}
    case 'GET_TWEETS':
      console.log("LAAL tweet reducer", state)
      state.tweets = action.tweets
      console.log("tweets in store", state)
 
      return {...state}

    default:

      return {...state}
  }
}