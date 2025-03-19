import React, { useState, useContext } from 'react';
import { firebaseContext } from '../../store/firebaseContext';
import { useHistory } from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(firebaseContext)
  const handleLogin = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      alert('Logged in Successfully')
      history.push('/')
    }).catch((error) => {
      alert(error.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin} style={{ color: 'rgb(88, 88, 88)', fontWeight: '700', fontSize: '1rem' }}>
          <label htmlFor="fname">Email:</label>
          <br />
          <input
            className="input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password:</label>
          <br />
          <input
            className="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={() => {
          history.push('/signup')
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
