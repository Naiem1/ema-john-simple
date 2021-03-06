import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';



export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}



export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {

      const { displayName, email, photoURL } = res.user;
      const setUserInfo = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };

      return setUserInfo;
    })
    .catch(err => {
      console.log(err)
      console.log(err.message);
  })
}

export const handleSignOut = () => {
  return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        error: '',
        success: false
      }

      return signedOutUser;
    })
    .catch(err => {
      console.log(err);
  })
}


export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
      
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      
    })
}


export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res.user)
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
      })
      .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
        
    })
}


const updateUserName = name => {
  var user = firebase.auth().currentUser();
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