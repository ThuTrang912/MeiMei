import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import { SelectedOptionsProvider } from './components/SelectedOptionsContext';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import CardManages from './components/CardManages/CardManages';
import Main from './components/HomePage/Main';

function App() {

  return (
    <AuthProvider>
      <SelectedOptionsProvider>
        <Router>
          <Switch>
            <Route path={`/main/:contact_id`} component={Main} />
            <Route path="/signUpPage" component={SignUpPage} />
            <Route path="/cardManages" component={CardManages} />
            <Route component={LoginPage} />
          </Switch>
        </Router>
      </SelectedOptionsProvider>
    </AuthProvider>
  );
}


export default App;
