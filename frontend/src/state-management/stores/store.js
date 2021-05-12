import React from 'react';
import {dbCon} from '../../config/firebase';
import tweetReducer from '../reducers/tweetReducer'
import userReducer from '../reducers/userReducer'

// const localStorageToken = JSON.parse(localStorage.getItem('userLogged')).authToken
const initialState = {
  tweetsState: {
    tweets: [],
  },
  userState: {
    user: {},
    unfollowedUsers: [],
  }
}

const Store = React.createContext();
const Dispatch = React.createContext();

const combinedReducers = (state, action) => ({
  tweetsState: tweetReducer(state.tweetsState, action),
  userState: userReducer(state.userState, action),
})

function StateProvider({ children }) {
  const [state, dispatch] = React.useReducer(combinedReducers, initialState)

  return (
    <Store.Provider value={state}>
      <Dispatch.Provider value={dispatch}>
        {children}
      </Dispatch.Provider>
    </Store.Provider>
  )
}

function useState() {
  const context = React.useContext(Store)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

function useDispatch() {
  const context = React.useContext(Dispatch)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}

function useStore() {
  return [useState(), useDispatch()]
}

export { StateProvider, useState, useDispatch, useStore }