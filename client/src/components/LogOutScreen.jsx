import React from 'react';
import { useAuth } from './AuthContext';
import './LogOutScreen.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function LogOutScreen() {
  const { login } = useAuth();

  return (
    <div className='logout-container'>
      <div className='header'><a href='#'>ログイン</a></div>
      <div className='body'>
          <div className='card'>
              <div className='child-card'>CARD</div>
          </div>
          <button style={{border:'none',backgroundColor:'transparent'}} onClick={login}><div className='text-style'><Link to="/main">始める</Link></div></button>
      </div>
    </div>
  );
}

export default LogOutScreen;
