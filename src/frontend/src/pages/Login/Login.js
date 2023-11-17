import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logoteste from '../../assets/testelogo.png'
import Fundologin from '../../assets/fundologin.jpeg'

function Login() {
  return (
    <div className="login-container">
      <div className="login-image">
        {/* Placeholder for the image on the left. Replace with your desired image */}
        <img src={Fundologin} alt="Placeholder Image"></img>
      </div>
      <div className="login-card">
        <img src={logoteste} alt="Logo"></img>
        <h2>Log into your account</h2>
        
        <label>Enter your email</label>
        <input type="email" placeholder="Enter your email" />
        
        <label>Enter your password</label>
        <input type="password" placeholder="Enter your password" />
        
        <Link to="/home"><button className="login-button">Log in</button></Link>
        <div className="divider"></div>
        <Link to="/request-access"><button className="request-access-button">Request access</button></Link>
      </div>
    </div>
  );  
}

export default Login;
