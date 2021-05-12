import React, { useState } from 'react'
import {dbCon} from '../config/firebase';
import { useDispatch } from '../state-management/stores/store'

const Logout = () => {

  const dispatch = useDispatch()

  const signOut = () => {
    if(dbCon.auth().currentUser) {
      dbCon.auth().signOut()
      .then(() => {
        dispatch({
          type: 'USER_LOGOUT',
        })
      })
      .catch((e)=>{
      console.log("error",e)
      })
    } else console.log("You are not logged")
  }

  return(
    <React.Fragment>
      <button onClick={() => signOut()}>LogOut</button>
    </React.Fragment>
  )
}

export default Logout