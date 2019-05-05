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
};

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

type FirebaseProviderProps = {
  value?: FirebaseContextValue;
  children: React.ReactNode;
};

const FirebaseProvider = (props: FirebaseProviderProps) => {
  // create firebase app
  const [firebaseImpl] = useState(firebase.initializeApp(config));

  // firestore
  const [firestore] = useState<firebase.firestore.Firestore>(
    firebaseImpl.firestore()
  );

  // auth
  const [auth] = useState(firebaseImpl.auth());
  auth.setPersistence(firebase.auth.Auth.Persistence.NONE);

  const email = process.env.REACT_APP_FIREBASE_USER as string;
  const password: string = process.env.REACT_APP_FIREBASE_PASSWORD as string;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(signin => {
      console.log("Signed in with ", email);
      console.log("Sign in object: ", signin);
    })
    .catch(error => {
      console.log("Error when signing in: ", error);
    });

  const value = useMemo(() => {
    return {
      firestore
    };
  }, [firestore]);
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

export { FirebaseProvider, useFirestore, getServerTimestamp };
