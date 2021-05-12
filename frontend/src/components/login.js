import React, { useState } from 'react'
import {dbCon} from '../config/firebase';
import { Link } from 'react-router-dom'
import { useDispatch } from '../state-management/stores/store'
// import { clearUserInfos } from '../helpers/functionsOnText'
import {handleClose} from '../pages/homePage'
import Signup from './signup';
import Modal from '@material-ui/core/Modal';

const Login = (props) => {

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch()

  const newLogin = () => {

    dbCon.auth().signInWithEmailAndPassword(state.email , state.password)
    .then((response) => 
       dispatch({
        type: 'USER_AUTH',
        user: {
          username: response.user.username,
          uid: response.user.uid,
          email: response.user.email,
          followed: [],
          follower: []
        }
      })
    ).catch((e)=>{
      console.log("error",e)
    })
  }

  return(
    <React.Fragment>
      <h4>LOGIN PAGE</h4>
      <div className = 'login'>
        <form>
          <label for="email">Email:</label><br></br>
          <input type="text" id="email" name="email" placeholder='Your email' onChange = {(event) => setState({...state, email: event.target.value})}></input><br></br>
          <label for="password">Password:</label><br></br>
          <input type="password" id="password" name="password" placeholder='Your password' onChange = {(event) => setState({...state, password: event.target.value})}></input><br></br>
        </form>
        <button id='login' type='button' onClick = {() => {
          newLogin()
          props.handleClose()
          // return clearUserInfos()
        }}>Log In</button>
      </div>

 
      {/* <Link to={`/signup`}>Create New Account</Link> */}

    </React.Fragment>
  )
}

export default Login