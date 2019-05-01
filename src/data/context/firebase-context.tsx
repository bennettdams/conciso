import * as React from "react";

//
// import app from "firebase/app";

// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
// };

// class Firebase {
//   constructor() {
//     app.initializeApp(config);
//   }
// }

// export default Firebase;
//

// type FirebaseContextValue = {
//   firebase: any;
// };

// const FirebaseContext = React.createContext<FirebaseContextValue | undefined>(
//   undefined
// );

// type FirebaseProviderProps = {
//   firebase?: FirebaseContextValue;
// };

// function FirebaseProvider(props: FirebaseProviderProps) {
//   const [firebase] = React.useState(null);
//   const value = React.useMemo(() => {
//     return {
//       firebase,
//     };
//   }, [firebase]);
//   return <FirebaseContext.Provider firebase={value} />;
// }

// function useFirebase() {
//   const context = React.useContext(FirebaseContext);
//   if (!context) {
//     throw new Error("useCount must be used within a CountProvider");
//   }
//   const { count, setCount } = context;
//   const increment = () => setCount(c => c + 1);
//   return {
//     count,
//     increment
//   };
// }

// export { FirebaseProvider, useFirebase };
