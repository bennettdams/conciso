import { auth, firestore } from "./firebase-service";
import "firebase/firestore";
import { useState, useEffect } from "react";

const useFirebase = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userFirebase, setUserFirebase] = useState<firebase.User | null>(null);

  // SIGNED IN
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userFirebase => {
      if (userFirebase) {
        setUserFirebase(userFirebase);
        setIsSignedIn(true);
        console.log(userFirebase);
      } else {
        setUserFirebase(null);
        setIsSignedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const getFirebaseServerTimestamp = () =>
    // @ts-ignore
    firestore.FieldValue.serverTimestamp();

  const signInWithEmailAndPassword = (email: string, password: string) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(credentials => {
        console.log("Signed in with ", email);
        console.log("Sign in credentials: ", credentials);
      })
      .catch(error => {
        console.log("Error when signing in: ", error);
      });
  };

  const createUser = (email: string, password: string): void => {
    auth.createUserWithEmailAndPassword(email, password).catch(error => {
      console.log("Error while signup:" + error);
    });
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      console.log("signed out");
    } catch (e) {
      console.log("error while signing out: " + e);
    }
  };

  return {
    getFirebaseServerTimestamp,
    signInWithEmailAndPassword,

    isSignedIn,
    signOut,
    createUser,
    userFirebase
  };
};

export default useFirebase;
