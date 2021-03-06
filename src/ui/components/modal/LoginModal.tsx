import React, { useState } from "react";
import Modal from "./Modal";
import useFirebase from "../../../services/firebase/useFirebase";

interface LoginModalProps {
  isShowing: boolean;
  hide: () => void;
}

const LoginModal: React.FC<LoginModalProps> = props => {
  const { signInWithEmailAndPassword } = useFirebase();
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  const handleLoginClick = (): void => {
    signInWithEmailAndPassword(inputEmail, inputPassword);
  };

  return (
    <div className="login-modal">
      {props.isShowing && (
        <Modal
          title="LOGIN"
          buttonText="LOG IN"
          hide={props.hide}
          mainButtonClick={handleLoginClick}
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
          Log in to <strong>conciso</strong>
        </Modal>
      )}
    </div>
  );
};

export default LoginModal;
