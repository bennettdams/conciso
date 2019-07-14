import React, { useState } from "react";
import Modal from "./Modal";
import useFirebase from "../../../services/firebase/useFirebase";
import { auth } from "firebase";

interface SignupModalProps {
  isShowing: boolean;
  hide: () => void;
}

const SignupModal: React.FC<SignupModalProps> = props => {
  const { createUser } = useFirebase();
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  const handleSignupClick = (): void => {
    createUser(inputEmail, inputPassword);
  };

  return (
    <div className="signup-modal">
      {props.isShowing && (
        <Modal
          title="SIGN UP"
          buttonText="SIGN UP"
          hide={props.hide}
          mainButtonClick={handleSignupClick}
        >
          <input
            name="inputEmail"
            autoComplete="off"
            className="input is-size-5"
            type="text"
            placeholder="Enter a username.."
            value={inputEmail}
            onChange={e => setInputEmail(e.target.value)}
          />
          <input
            name="inputPassword"
            autoComplete="off"
            className="input is-size-5"
            type="password"
            placeholder="Enter a password.."
            value={inputPassword}
            onChange={e => setInputPassword(e.target.value)}
          />
          Sign up to <strong>conciso</strong>
        </Modal>
      )}
    </div>
  );
};

export default SignupModal;
