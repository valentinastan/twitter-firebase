import React, { useEffect, useState } from 'react'
import User from './user'
import { useStore, useDispatch } from '../state-management/stores/store'
import { dbCon, dbStore } from '../config/firebase';


const Users = () => {
  const [state, setState] = useState([]);
  const [store] = useStore()

  // const deleteAnUnfollowed = (user) => {
  //   let newState = []
  //   store.unfollowedUsers = store.unfollowedUsers.filter()


  //   Object.assign(newState, state)
  //   newState.push(newTweet) 
  //   setState(newState)
  // }

  return(
    <React.Fragment>
      <div>Follow more people</div>
      {(store.userState.unfollowedUsers || []).map(user => 
      <User key={`idUser_${user.uid}`} {...user} ></User> )}
  </React.Fragment>
  )
}

export default Users