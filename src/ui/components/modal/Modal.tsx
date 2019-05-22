import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

type ModalProps = {
  isShowing: boolean;
  hide: () => void;
  title: string;
  buttonText: string;
};

// @ts-ignore
const Modal: React.FC<ModalProps> = props =>
  props.isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className={[
              "modal",
              "fade-in-fast",
              props.isShowing ? "is-active" : ""
            ].join(" ")}
          >
            <div onClick={props.hide} className="modal-background" />
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">{props.title}</p>
              </header>
              <section className="modal-card-body">{props.children}</section>
              <footer className="modal-card-foot">
                <button onClick={props.hide} className="button is-primary">
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
      )
    : null;

export default Modal;