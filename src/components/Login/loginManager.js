import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import firebaseConfig from './firebaseConfig';

export const initializeFirebaseApp = () => {
     firebase.initializeApp(firebaseConfig);
}

export const signInWithGoogle = () => {
     const provider = new firebase.auth.GoogleAuthProvider();
     return firebase.auth().signInWithPopup(provider)
          .then(res => {
               const { displayName, photoURL, email } = res.user;
               const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    success: true,
               }
               return signedInUser;
          }).catch(error => {
               console.log(error);
               console.log(error.message);
          })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
     return firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(res => {
               const newUserInfo = { ...res.user };
               newUserInfo.error = '';
               newUserInfo.success = true;
               newUserInfo.isSignedIn = true;
               updateUserName(name);
               return newUserInfo;
          }).catch(error => {
               const newUserInfo = {};
               newUserInfo.error = error.message;
               newUserInfo.success = false;
               return newUserInfo;
          })
}

export const signInWithEmailAndPassword = (email, password) => {
     return firebase.auth().signInWithEmailAndPassword(email, password)
          .then(res => {
               const newUserInfo = res.user;
               newUserInfo.error = '';
               newUserInfo.success = true;
               newUserInfo.isSignedIn = true;
               return newUserInfo;
          }).catch(error => {
               const newUserInfo = {};
               newUserInfo.success = false;
               newUserInfo.error = error.message;
               return newUserInfo;
          });
}

export const signOutUser = () => {
     return firebase.auth().signOut()
          .then(() => {
               const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                    success: false,
               }
               return signedOutUser;
          }).catch(error => {
               console.log(error.message);
          })
}

const updateUserName = (name) => {
     const user = firebase.auth().currentUser;
     user.updateProfile({
          displayName: name,
     }).then(() => {
          console.log('username is updated successfully');
     }).catch(error => {
          console.log(error.message);
     })
}


