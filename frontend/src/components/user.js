import React from 'react'
import { dbStore } from '../config/firebase'
import { useStore} from '../state-management/stores/store'

const User = (props) => {
  const [store, dispatch] = useStore()
  const currentUser = store?.userState?.user

  const followThisUser = async () => {
    const currentUserRef = dbStore.collection('users').doc(currentUser.uid);
    let updatedCurrentUser = await currentUserRef.get();
    await currentUserRef.update({followed: [...updatedCurrentUser.data().followed, props.uid]})
    updatedCurrentUser = await currentUserRef.get();

    const followedUserRef = dbStore.collection('users').doc(props.uid);
    let followedUser = await followedUserRef.get()
    await followedUserRef.update({follower: [...followedUser.data().follower, currentUser.uid]})
    followedUser = await followedUserRef.get()



    if (!updatedCurrentUser.exists || !followedUser.exists) {
      console.log('No such document!');
    } 
    else {
      console.log("current user", updatedCurrentUser.data())
      console.log("urmaritul ", followedUser.data())
      dispatch({
        type: 'NEW_FOLLOW',
        followRelation: {
          currentUserFollowed: updatedCurrentUser.data().followed,
          followedUserUid: props.uid
        } 
      })
    }
  }

  
  return(
    <React.Fragment>
      <div>{props.username}</div>
      <button type='button' onClick = {() => {
        // clearUserText()
        return followThisUser()
      }}>Follow</button><br/>
    </React.Fragment>
  )
}

export default User