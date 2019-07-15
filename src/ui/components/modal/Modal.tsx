import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import Section from "../layout/Section";

interface ModalProps {
  hide: () => void;
  title: string;
  buttonText: string;
  mainButtonClick: () => void;
}

const Modal: React.FC<ModalProps> = props => {
  const mainButtonClick = () => {
    props.mainButtonClick();
    props.hide();
  };

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className={["modal", "fade-in-fast", "is-active"].join(" ")}>
        <div onClick={props.hide} className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{props.title}</p>
          </header>
          <Section cssName="modal-card-body">{props.children}</Section>
          <footer className="modal-card-foot">
            <button onClick={mainButtonClick} className="button is-primary">
              {props.buttonText}
            </button>
            <button onClick={props.hide} className="button">
              CANCEL
            </button>
          </footer>
        </div>
      </div>
    </React.Fragment>,
    document.body
  );
};

export default Modal;
