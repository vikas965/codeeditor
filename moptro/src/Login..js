import React, { useState } from 'react';
import './App.css';
import loginlogo from "./assets/loginlogo.png"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'user@gmail.com' && password === 'user1234') {
      // Navigate to the dashboard page (you can implement this logic)
      navigate('/dashboard')
      toast('Login successful')
    } else {
      // Show toast message for wrong credentials
      toast('Wrong Credentials')
    }
  };

  return (
    <div className="App">
      <div style={{ background: "black" }} className="app-body">
        <div className="form">
          <center>
            <img src={loginlogo} alt="" />
            <br />
            <p style={{ color: "green" }}>We Are Electric</p>
          </center>
          <br />
          <br />
          <form onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder='Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <br />
            <input 
              type="password" 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <br />
            <button type="submit">Login</button>
            <br />
            <center><p style={{ color: "green" }}>Forgot password ?</p></center>
          </form>
         
        </div>
      </div>
    </div>
  );
}

export default Login;
