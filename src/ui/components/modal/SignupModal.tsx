import React from "react";
import Modal from "./Modal";

type SignupModalProps = {
  isShowing: boolean;
  hide: () => void;
};

const SignupModal: React.FC<SignupModalProps> = props => {
  return (
    <div className="login-modal">
      <Modal
        isShowing={props.isShowing}
        title="SIGN UP"
        buttonText="SIGN UP"
        hide={props.hide}
        mainButtonClick={() => console.log("sign up")}
      >
        Sign up to <strong>conciso</strong>
      </Modal>
    </div>
  );
};

export default SignupModal;
