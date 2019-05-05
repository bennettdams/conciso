import React from "react";
import Modal from "./Modal";

type LoginModalProps = {
  isShowing: boolean;
  hide: () => void;
};

const LoginModal: React.FC<LoginModalProps> = props => {
  return (
    <div className="login-modal">
      <Modal
        isShowing={props.isShowing}
        title="LOGIN"
        buttonText="LOG IN"
        hide={props.hide}
      >
        Log in to <strong>conciso</strong>
      </Modal>
    </div>
  );
};

export default LoginModal;
