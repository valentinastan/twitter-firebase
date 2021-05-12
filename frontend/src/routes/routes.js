import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../components/login';
import Logout from '../components/logout';
import Signup from '../components/signup';
import HomePage from '../pages/homePage';

export const myRoutes = (
  <Switch>
    {/* <Route exact={true} path="/login" component={Login} />
    <Route exact={true} path="/signup" component={Signup} />
    <Route exact={true} path="/logout" component={Logout} /> */}
    <Route path="/" component={HomePage} />
  </Switch>
);