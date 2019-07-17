import React, { FormEvent, useEffect } from "react";
import {
  useProfileState,
  useProfileDispatch
} from "../../../data/context/profile-context";
import FormInput from "../../components/form-elements/FormInput";
import useFirebase from "../../../services/firebase/useFirebase";

interface ProfileUserInformationProps {
  edit: boolean;
}

const ProfileUserInformation: React.FC<ProfileUserInformationProps> = props => {
  const { user } = useFirebase();
  const { username, name } = useProfileState();
  const dispatch = useProfileDispatch();

  // set local state initially
  useEffect(() => {
    if (user && user.displayName) {
      dispatch({ type: "update_name", name: user.displayName });
    }
  }, [user, dispatch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("A username was submitted: " + username);
  };

  const handleChangeName = (newName: string): void => {
    dispatch({ type: "update_name", name: newName });
    if (user) {
      user.updateProfile({ displayName: newName }).catch(error => {
        throw new Error(error);
      });
    }
  };

  return (
    <div className="profile-user-information columns is-multiline">
      {user && props.edit ? (
        <form onSubmit={handleSubmit}>
          <div className="column">
            <FormInput
              label="Username"
              placeholder="Username"
              input={username}
              callback={changed =>
                dispatch({ type: "update_username", username: changed })
              }
            />
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
        user && (
          <ul>
            <li>
              <h1 className="title is-1">{user.displayName}</h1>
            </li>
            <li>
              <h3 className="title is-3">{user.email}</h3>
            </li>
            <li>
              <h3 className="title is-3">
                {user.emailVerified ? "verified" : "not verified"}
              </h3>
            </li>
            <li>
              created
              <h5 className="title is-5">{user.metadata.creationTime}</h5>
            </li>
            <li>
              Last signin
              <h5 className="title is-5">{user.metadata.lastSignInTime}</h5>
            </li>
          </ul>
        )
      )}
    </div>
  );
};

export default ProfileUserInformation;
