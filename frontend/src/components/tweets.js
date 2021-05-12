import React, { useState, useEffect } from 'react'
import Tweet from './tweet'
import CreateTweet from './createTweet'
import { useStore } from '../state-management/stores/store'
import { dbCon, dbStore } from '../config/firebase'


const Tweets = () => {

  const [state, setState] = useState([]);
  const [store, dispatch] = useStore()

  const currentUser = store.userState?.user
  const storeTweets = store.tweetsState?.tweets

  console.log("lalala", currentUser)
 

  console.log(store)


  useEffect(async () => {
    let visibleTweetsRef = await dbStore.collection('tweets');

    if(currentUser && Object.keys(currentUser).length) {
      const snapshot = await visibleTweetsRef.where('user.uid', 'in',  [...currentUser.followed, currentUser.uid]).limit(10).get()
      console.log("use effect twwets snapshot", snapshot)
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      } 
      else {
        const tweets = []
        snapshot.forEach(tweet => {
          tweets.push({uid: tweet.id, ...tweet.data()})
        })
        console.log(tweets)
        dispatch({
          type: 'GET_TWEETS',
          tweets
        })
      }
    }
  }, [])

  




  // const addNewTweetToState = (newTweet) => {
  //   let newState = []
  //   Object.assign(newState, state)
  //   newState.push(newTweet) 
  //   setState(newState)
  // } //de folosit store

  return(
    <React.Fragment>
      <h1>Tweets</h1>
      {(storeTweets || []).map(tweet => <Tweet key={`idTweet_${tweet.uid}`} {...tweet}></Tweet> )}
      <CreateTweet></CreateTweet>
      
    </React.Fragment>
  )
}

export default Tweets