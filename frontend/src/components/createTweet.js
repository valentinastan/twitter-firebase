import React, { useState } from 'react'
import {dbStore, dbCon} from '../config/firebase'
import { useStore, useDispatch } from '../state-management/stores/store'
// import { clearUserText } from '../helpers/functionsOnText'

const CreateTweet = (props) => {
  const dispatch = useDispatch()
  console.log("props din create ", props)

  const [tweetText, setTweetText] = useState('')
  const [store, _] = useStore()

  const currentUser = store.userState?.user
  // {
  //   user: {
  //     email: '',
  //     uid: ''
  //   },
  //   text: '',
  //   prevTweet: {

  //   },
  //   hashtags: [{}],
  // }

  const saveHashtags = async (tweetId) => {
    const tweetHashtags = tweetText.match(/#[a-z0-9_]+/g)

    for(const hashtagName of tweetHashtags) {
      const hashtagsRef = dbStore.collection('hashtags');
      let snapshot = await hashtagsRef.get()

      if(!snapshot.empty) {
        snapshot = await hashtagsRef.where('name', '==', hashtagName).get()
      }

      let createdHashtagId = ''

      if(snapshot.empty) {
        const created = await dbStore.collection('hashtags').add({
          name: hashtagName,
          tweets: [tweetId]
        })
        createdHashtagId = created.id
      }
      else {
        const existingHashtagId = snapshot.docs[0].id
        const createdHashtagRef = dbStore.collection('hashtags').doc(existingHashtagId)
        
        const currentTweetsIdRef = await createdHashtagRef.get()
        const currentTweetsId = currentTweetsIdRef.data().tweets
      
        await createdHashtagRef.update({tweets: [...currentTweetsId, tweetId]})
        createdHashtagId = existingHashtagId
      }
      updateTweetWithHashtags(tweetId, createdHashtagId)
    }
    return
  }

  const updateTweetWithHashtags = async (tweetId, createdHashtagId) => {
    const createdHashtagRef = dbStore.collection('hashtags').doc(createdHashtagId)
    const createdHashtag = await createdHashtagRef.get()
 
    console.log(createdHashtag.data(), createdHashtag.id)
    if (createdHashtag.empty) {
      console.log('No matching documents.');
      return;
    }  
    else {
      const tweetRef = dbStore.collection('tweets').doc(tweetId);

      const tweet = await tweetRef.get()
      const existingHashtags = tweet.data().hashtags
     
      await tweetRef.update({hashtags: [... existingHashtags, {...createdHashtag.data(), uid: createdHashtag.id}]})
    }
    return
  }

  const newTweet = async () => {
    const createdTweet = await dbStore.collection('tweets').add({
      user: {
        email: currentUser.email,
        uid: currentUser.uid,
      },
      text: tweetText,
      prevTweet: {},
      hashtags: [],
    }); 
    console.log("Created tweet este ", createdTweet)
    
    saveHashtags(createdTweet.id)

    const createdTweetRef = dbStore.collection('tweets').doc(createdTweet.id);
    const newTweet = await createdTweetRef.get();

    console.log("new tweet", newTweet.data())
    if (!newTweet.exists) {
      console.log('No such document!');
    } else {
      dispatch({
        type: 'NEW_TWEET',
        tweet: {uid: createdTweet.id, ...newTweet.data()}
      })
    }
  } 
  
  return(
    <React.Fragment>
      <textarea id="newTweet" rows="4" cols="30" onChange={(event) => setTweetText(event.target.value)} value={tweetText}></textarea>
      <button type='button' onClick = {() => {
        // clearUserText()
        return newTweet()
      }}>Add tweet</button>
    </React.Fragment>
  )
}

export default CreateTweet