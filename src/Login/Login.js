import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './Login.css'
import { UserContext } from '../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

function Login() {
  // =======================
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
  isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false
  })

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {

        const { displayName, email, photoURL } = res.user;
        const setUserInfo = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }

        setUser(setUserInfo);
      })
      .catch(err => {
        console.log(err);
    })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        setUser({
          isSignedOut: false,
          photo: '',
          name: '',
          email: ''
      })
      })
      .catch(err => {
        console.log(err);
    })
  }


  const handleBlur = e => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = (isPasswordValid && passwordHasNumber);
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
}

  

  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          console.log('signedInUserInfo>>>', res.user);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          
      })
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          console.log(res.user)
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log('sign in user info>>', res.user);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          
      })
    }
    
    e.preventDefault();
}

  const updateUserName = name => {
    var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: name
        
      }).then(res => {
        // Update successful.
        console.log('user name updated successfully')
      }).catch( error => {
        // An error happened.
        console.log(error);
      });
  }
  
  // =======================


  

  return (
    <div className="login">
     


          {
            user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button>
              : <button onClick={handleSignIn} className="google__btn">Sign In</button>
          }
          {
            user.isSignedIn && <div className="login__img">
              <h4>Welcome, {user.name}</h4>
              <h4>Email: {user.email}</h4>
              <img src={user.photo} alt=""/>
            </div>
          }




          <h1>Our Own authentication</h1>
          <br/>
          <br/>
          <br />
          <h4>Name: {user.name}</h4>
          <br/>
          <h4>Email: {user.email}</h4>
          <h4>password: {user.password}</h4>
          <br />
          <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
          <label htmlFor="">Sign Up For New User</label>
          <br/>
          <form action="">
            {newUser && <div><label htmlFor="">Name: </label>
            <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name..." /></div>}
            <br/>
            <label htmlFor="">Email: </label>
            <input type="text" onBlur={handleBlur} name="email" placeholder="Your Email..." required/>
            <br />
            <label htmlFor="">Password: </label>
            <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Your Password..." />
            <br />
            <input type="submit" className="submit__btn" onClick={handleSubmit} value={newUser ? 'Sign Up' : 'Sign In'}/>
          </form>
          {
            user.success ? <h4 className='success__message'>User {newUser ? 'Created' : 'Logged In'} Successfully</h4>
              : <h4 className='error__message'>{user.error}</h4>
          }


    </div>
  );
}

export default Login;

/* 
1.-> import file
2.-> create a fire for firebase.config.js & import this file
3.-> initialize firebase outside of component of function
4.-> Create google/ any other provider object 
5.-> for google/fb... create popup 
6.-> create google access token

*/




