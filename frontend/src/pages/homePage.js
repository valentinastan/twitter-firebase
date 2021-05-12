import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Tweets from '../components/tweets'
import Logout from '../components/logout'
import { useState } from '../state-management/stores/store'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Login from '../components/login'
import Signup from '../components/signup'

import { useDispatch } from '../state-management/stores/store'
import {dbCon, dbStore} from '../config/firebase';
import CreateTweet from '../components/createTweet'
import Users from '../components/users'


const HomePage = () => {
  const currentUser = useState().userState.user
  const dispatch = useDispatch()

  console.log("currentUser", currentUser)

  const [openLogIn, setOpenLogIn] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);

  useEffect(() => {
    dbCon.auth().onAuthStateChanged(async function(user) {
      console.log('STATE CHANGED')
      if (user != null) {
        const currentUserDb = await dbStore.collection('users').doc(user.uid).get()
        dispatch({
          type: 'USER_AUTH',
          user: {...currentUserDb.data(), uid: user.uid}
        })
        const usersRef = dbStore.collection('users');
        const snapshot = await usersRef.where('uid', 'not-in', [...currentUserDb.data()?.followed, user?.uid]).limit(5).get()
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        else {
          const unfollowedUsers = []
          snapshot.forEach(doc => {
            unfollowedUsers.push(doc.data())
          })
          dispatch({
            type: 'UNFOLLOWED_USERS',
            unfollowedUsers
          })
        }  
      } else {
        dispatch({
          type: 'USER_AUTH',
          user: {}
        })
      }
    });
  }, [])

  const handleOpenLogIn = () => {
    setOpenLogIn(true);
  };

  const handleCloseLogIn = () => {
    setOpenLogIn(false);
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };


  const bodyLogIn = (
    <div className="paper">
      <h2 id="simple-modal-title">Login</h2>
      <Login handleClose={handleCloseLogIn}/>
    </div>
  );

  const bodySignUp = (
    <div className="paper">
      <h2 id="simple-modal-title-2">SignUp</h2>
      <Signup handleClose={handleCloseSignUp}/>
    </div>
  );

  return(
    <React.Fragment>
      <div>HOME PAGE</div>
      <div>{currentUser?.username}</div>

      <div>
        <button type="button" onClick={handleOpenLogIn}>Login</button>
        <Modal
          open={openLogIn}
          onClose={handleCloseLogIn}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {bodyLogIn}
        </Modal>
      </div>
      <div>
      <button type="button" onClick={handleOpenSignUp}>Create New Account</button>
        <Modal
          open= {openSignUp}
          onClose={handleCloseSignUp}
          aria-labelledby="simple-modal-title-2"
          aria-describedby="simple-modal-description"
        >
        {bodySignUp}
        </Modal>
      </div>
      <Logout />
      <Users />
      {(Object.keys(currentUser).length > 0) && (<Tweets/>)}
    </React.Fragment>
  )
}

export default HomePage