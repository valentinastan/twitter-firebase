import React from 'react';
import './App.css';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import { myRoutes } from './routes/routes'

function App() {
  return (
    <React.Fragment>
      {myRoutes}
      {/* <LoginPage/> */}
      {/* <HomePage/> */}
    </React.Fragment>
  );
}

export default App;
