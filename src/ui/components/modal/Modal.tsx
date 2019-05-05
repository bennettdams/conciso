import React from "react";
import ReactDOM from "react-dom";

// type ModalType = {
//   isShowing: boolean;
//   hide: () => void;
// };

// @ts-ignore
const Modal = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className={["modal", isShowing ? "is-active" : ""].join(" ")}>
            <div onClick={hide} className="modal-background" />
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Modal title</p>
                <button className="delete" aria-label="close" />
              </header>
              <section className="modal-card-body">CONTENT</section>
              <footer className="modal-card-foot">
                <button onClick={hide} className="button is-success">
                  LOG IN
                </button>
                <button onClick={hide} className="button">
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
