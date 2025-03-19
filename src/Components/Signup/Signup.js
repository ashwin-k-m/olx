import { useContext } from 'react';
import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useHistory } from 'react-router-dom'
import { firebaseContext } from '../../store/firebaseContext';

export default function Signup() {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(firebaseContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      result.user.updateProfile({ displayName: userName }).then(() => {
        firebase.firestore().collection('users').add({
          id: result.user.uid,
          userName: userName,
          phone: phone
        }).then(() => {
          history.push('/login')
        })
      })
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname" style={{ color: 'rgb(88, 88, 88)', fontWeight: '700', fontSize: '1rem' }}>Username:</label>
          <br />
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname" style={{ color: 'rgb(88, 88, 88)', fontWeight: '700', fontSize: '1rem' }}>Email:</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname" style={{ color: 'rgb(88, 88, 88)', fontWeight: '700', fontSize: '1rem' }}>Phone:</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname" style={{ color: 'rgb(88, 88, 88)', fontWeight: '700', fontSize: '1rem' }}>Password:</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={() => {
          history.push('/login')
        }}>Login</a>
      </div>
    </div>
  );
}
