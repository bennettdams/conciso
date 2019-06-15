import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const firestore = firebase.firestore();
const auth = firebase.auth();

const getFirebaseServerTimestamp = () =>
  firebase.firestore.FieldValue.serverTimestamp();

const signInWithEmailAndPassword = (email: string, password: string) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(signin => {
      console.log("Signed in with ", email);
      console.log("Sign in object: ", signin);
    })
    .catch(error => {
      console.log("Error when signing in: ", error);
    });
};

const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      resolve(!!user);
    });
  });
};

export {
  firestore,
  auth,
  getFirebaseServerTimestamp,
  isSignedIn,
  signInWithEmailAndPassword
};
