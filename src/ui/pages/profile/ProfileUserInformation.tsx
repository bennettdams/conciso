import React, { FormEvent, useEffect, useState } from "react";
import {
  useProfileState,
  useProfileDispatch
} from "../../../data/context/profile-context";
import FormInput from "../../components/form-elements/FormInput";
import useFirebase from "../../../services/firebase/useFirebase";
import { IUser } from "../../../types/IUser";
import { firestore } from "../../../services/firebase/firebase-service";
import Button from "../../components/button/Button";

interface ProfileUserInformationProps {
  edit: boolean;
}

const ProfileUserInformation: React.FC<ProfileUserInformationProps> = props => {
  const { userFirebase } = useFirebase();
  const { username, name } = useProfileState();
  const [inputUsername, setInputUsername] = useState<string>("");
  const dispatch = useProfileDispatch();

  // set local state initially
  useEffect(() => {
    if (userFirebase && userFirebase.displayName) {
      dispatch({ type: "update_name", name: userFirebase.displayName });
    }
  }, [userFirebase, dispatch]);

  // get user from auth UID
  useEffect(() => {
    console.log("get user from firestore");

    let unsubscribe: any;

    if (userFirebase) {
      unsubscribe = firestore
        .collection("users")
        .doc(userFirebase.uid)
        .onSnapshot(doc => {
          if (doc.exists) {
            const data = doc.data();
            console.log(data);
            if (data) {
              dispatch({ type: "update_username", username: data.username });
            }
          } else {
            console.log("No such document!");
          }
        });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userFirebase, dispatch, username]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (userFirebase) {
      updateUserFirebaseDisplayName(name);
      const user: IUser = { uid: userFirebase.uid, username: inputUsername };
      updateFirestoreUser(user);
    }
  };

  const handleChangeName = (newName: string): void => {
    dispatch({ type: "update_name", name: newName });
  };

  const updateUserFirebaseDisplayName = (name: string) => {
    if (userFirebase) {
      console.log("upd user firebase display name");
      userFirebase.updateProfile({ displayName: name }).catch(error => {
        throw new Error(error);
      });
    }
  };

  const updateFirestoreUser = (user: IUser): void => {
    // TODO update instead of add
    console.log("upd firestore user: ", user);
    if (userFirebase) {
      firestore
        .collection("users")
        .doc(userFirebase.uid)
        .set(user);
    }
  };

  return (
    <div className="profile-user-information columns is-multiline">
      {userFirebase && props.edit ? (
        <form onSubmit={handleSubmit}>
          <div className="column">
            <FormInput
              label="Username"
              placeholder="Username"
              input={inputUsername}
              callback={newUsername => setInputUsername(newUsername)}
            />
            <Button>Update</Button>
          </div>
          <div className="column">
            <FormInput
              label="Name"
              placeholder="Name"
              input={name}
              callback={newName => handleChangeName(newName)}
            />
          </div>
        </form>
      ) : (
        userFirebase && (
          <ul>
            <li>
              <h1 className="title is-1">{userFirebase.displayName}</h1>
            </li>
            <li>
              <h3 className="title is-3">{userFirebase.email}</h3>
            </li>
            <li>
              <h3 className="title is-3">{username}</h3>
            </li>
            <li>
              <h3 className="title is-3">
                {userFirebase.emailVerified ? "verified" : "not verified"}
              </h3>
            </li>
            <li>
              created
              <h5 className="title is-5">
                {userFirebase.metadata.creationTime}
              </h5>
            </li>
            <li>
              Last signin
              <h5 className="title is-5">
                {userFirebase.metadata.lastSignInTime}
              </h5>
            </li>
          </ul>
        )
      )}
    </div>
  );
};

export default ProfileUserInformation;
