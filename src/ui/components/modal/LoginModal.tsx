import React, { useState } from "react";
import Modal from "./Modal";
import { signInWithEmailAndPassword } from "../../../data/firebase";

interface LoginModalProps {
  isShowing: boolean;
  hide: () => void;
}

const LoginModal: React.FC<LoginModalProps> = props => {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  return (
    <div className="login-modal">
      {props.isShowing && (
        <Modal
          title="LOGIN"
          buttonText="LOG IN"
          hide={props.hide}
          mainButtonClick={() =>
            signInWithEmailAndPassword(inputEmail, inputPassword)
          }
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
