import React, { useState } from 'react'
import {dbCon, dbStore} from '../config/firebase'
import { useDispatch } from '../state-management/stores/store'
// import { clearUserSignUp } from '../helpers/functionsOnText'

const Signup = (props) => {

  const [state, setState] = useState({
    username: '',
    email: '',
    password: ''
  })

  const dispatch = useDispatch()

  const newUser = () => {
    dbCon.auth().createUserWithEmailAndPassword(state.email , state.password)
    .then(async (response) => {
      await dbStore.collection('users').doc(response.user.uid).set({
        uid: response.user.uid,
        username: state.username,
        email: state.email,
        password: state.password,
        follower: [],
        followed: []
      })
      console.log("respose user", response.user)
      dispatch({
        type: 'USER_AUTH',
        user: {
          username: state.username,
          uid: response.user.uid,
          email: response.user.email,
          followed: [],
          follower: []
        }
      })
    }).catch((e)=>{
    console.log("error",e)
    })
  }

  return(
    <React.Fragment>
      <div className = 'signup'>
        <h4>SIGN UP</h4>
        <form>
          <label for="username">Username:</label><br></br>
          <input type="text" id="username" name="username" placeholder="Your Username" onChange={(event) => setState({...state, username: event.target.value})}></input><br></br>
          <label for="email">Email:</label><br></br>
          <input type="text" id="email" name="email" placeholder="YourEmail@gmail.com" onChange={(event) => setState({...state, email: event.target.value})}></input><br></br>
          <label for="password">Password:</label><br></br>
          <input type="password" id="password" name="password" placeholder='Your Password' onChange={(event) => setState({...state, password: event.target.value})}></input><br></br>
        </form>
        <button id='signup' type='button' onClick={() => {
          newUser()
          props.handleClose()
          // return clearUserSignUp()
        }}>Sign Up</button>
      </div>
    </React.Fragment>
  )
}

export default Signup