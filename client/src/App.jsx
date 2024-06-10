import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import { AuthProvider } from './components/AuthContext';
import { SelectedOptionsProvider } from './components/Body/UpdateData/SelectedOptionsContext';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';

function App() {

  return (
    <AuthProvider>
    <SelectedOptionsProvider>
      <Router>
        <Switch>
          <Route path="/main" component={Main} />
          <Route path="/signUpPage" component={SignUpPage} />
          <Route path="/loginPage" component={LoginPage} />
          <LoginPage/>
        </Switch>
      </Router>
      </SelectedOptionsProvider>
    </AuthProvider>
);
}


export default App;
