import React, { useContext, useState } from 'react';
import './Login.css'
import { UserContext } from '../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';


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

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  // google signIn
  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
  }

  // handle signOut
  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false);
        // setUser(res);
        // setLoggedInUser(res);
    })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
   }
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
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
          // setUser(res);
          // setLoggedInUser(res);
          // history.replace(from);
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
          // setUser(res);
          // setLoggedInUser(res);
          // history.replace(from);
      })
    }
    
    e.preventDefault();
}

  
  
  // =======================


  

  return (
    <div className="login">
     


          {
            user.isSignedIn ? <button onClick={signOut}>Sign Out</button>
              : <button onClick={googleSignIn} className="google__btn">Sign In</button>
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




