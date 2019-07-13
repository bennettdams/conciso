import { firebase, auth } from "./firebase-service";

const useFirebase = () => {
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
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        return true;
      } else {
        return false;
      }
    });
  };

  return { getFirebaseServerTimestamp, signInWithEmailAndPassword, isSignedIn };
};

export default useFirebase;
