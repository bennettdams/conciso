import React, { FormEvent } from "react";
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("A username was submitted: " + username);
  };

  return (
    <div className="profile-user-information columns is-multiline">
      {user && props.edit ? (
        <form onSubmit={handleSubmit}>
          <div className="column">
            <FormInput
              label="Username"
              input={username}
              callback={changed =>
                dispatch({ type: "update_username", username: changed })
              }
            />
          </div>
          <div className="column">
            <FormInput
              label="Name"
              input={name}
              callback={changed =>
                dispatch({ type: "update_name", name: changed })
              }
            />
          </div>

          <input type="submit" value="Submit" />
        </form>
      ) : (
        user && (
          <ul>
            <li>
              <span>Name:</span>
              <span>{user.displayName}</span>
            </li>
            <li>
              <span>Email:</span>
              <span>{user.email}</span>
            </li>
            <li>
              <span>Verified:</span>
              <span>{user.emailVerified}</span>
            </li>
            <li>
              <span>Created:</span>
              <span>{user.metadata.creationTime}</span>
            </li>
            <li>
              <span>Last signin:</span>
              <span>{user.metadata.lastSignInTime}</span>
            </li>
          </ul>
        )
      )}
    </div>
  );
};

export default ProfileUserInformation;
