import * as React from "react";
import { createContext, useState, useMemo, useContext } from "react";

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

type FirebaseContextValue = {
  firestore: firebase.firestore.Firestore;
  auth: firebase.auth.Auth;
};

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

type FirebaseProviderProps = {
  value?: FirebaseContextValue;
  children: React.ReactNode;
};

// if (!firebase.apps.length) {
//   firebase.initializeApp({});
// }

const firebaseImpl = firebase.initializeApp(config);

const FirebaseProvider = (props: FirebaseProviderProps) => {
  // create firebase app
  // const [firebaseImpl] = useState(firebase.initializeApp(config));

  // firestore
  const [firestore] = useState<firebase.firestore.Firestore>(
    firebaseImpl.firestore()
  );

  // auth
  const [auth] = useState<firebase.auth.Auth>(firebaseImpl.auth());
  auth.setPersistence(firebase.auth.Auth.Persistence.NONE);

  const value = useMemo(() => {
    return {
      firestore,
      auth
    };
  }, [firestore, auth]);
  return <FirebaseContext.Provider value={value} {...props} />;
};

const getServerTimestamp = (): firebase.firestore.FieldValue => {
  return firebase.firestore.FieldValue.serverTimestamp();
};

const useFirestore = (): firebase.firestore.Firestore => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirestore must be used within a FirebaseProvider");
  }
  return context.firestore;
};

const useFirebaseAuth = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebaseAuth must be used within a FirebaseProvider");
  }

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const signInWithEmail = (email: string, password: string): void => {
    context.auth
      .signInWithEmailAndPassword(email, password)
      .then(signin => {
        setIsSignedIn(true);
        console.log("Signed in with ", email);
        console.log("Sign in object: ", signin);
      })
      .catch(error => {
        setIsSignedIn(false);
        console.log("Error when signing in: ", error);
      });
  };

  return { isSignedIn, signInWithEmail };
};

// export { FirebaseProvider, useFirestore, useFirebaseAuth, getServerTimestamp };
