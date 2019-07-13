import React, { FormEvent, useEffect } from "react";
import {
  useProfileState,
  useProfileDispatch
} from "../../../data/context/profile-context";
import FormInput from "../../components/form-elements/FormInput";
import useFirebase from "../../../services/firebase/useFirebase";
import { auth } from "../../../services/firebase/firebase-service";

interface ProfileUserInformationProps {
  edit: boolean;
}

const ProfileUserInformation: React.FC<ProfileUserInformationProps> = props => {
  const { isSignedIn } = useFirebase();
  const { username, name } = useProfileState();
  const dispatch = useProfileDispatch();

  useEffect(() => {
    console.log(isSignedIn());
    auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("log");
        console.log(user);
      } else {
        console.log("not");
      }
    });
  }, [isSignedIn]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("A username was submitted: " + username);
  };

  return (
    <div className="profile-user-information columns is-multiline">
      {props.edit ? (
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
        <div>{auth.currentUser}</div>
      )}
    </div>
  );
};

export default ProfileUserInformation;
