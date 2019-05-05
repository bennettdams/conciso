import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../../constants/routes";

// COMPONENTS
import Modal from "../modal/Modal";
import useModal from "../../hooks/useModal";

const Navbar: React.FC = () => {
  const { isShowing: isShowingLogin, toggle: toggleLogin } = useModal();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://conciso.com">
          {/* <img
            src="https://...png"
            width="112"
            height="28"
          /> */}
        </a>

        <button
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarConciso"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div id="navbarConciso" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to={ROUTES.HOME}>
            Home
          </Link>

          <Link className="navbar-item" to={ROUTES.CONTACT}>
            Contact
          </Link>

          <Link className="navbar-item" to={ROUTES.ABOUT}>
            About
          </Link>

          <Link className="navbar-item" to={ROUTES.POST}>
            Post
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">More</div>

            <div className="navbar-dropdown">
              <a className="navbar-item" href="/about">
                About
              </a>
              <a className="navbar-item" href="/legal">
                Legal
              </a>
              <a className="navbar-item" href="/github">
                GitHub
              </a>
              <hr className="navbar-divider" />
              <a className="navbar-item" href="/issue">
                Bennett
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-primary">
                <strong>Sign up</strong>
              </button>
              <button className="button is-light" onClick={toggleLogin}>
                Log in
              </button>
            </div>
          </div>
        </div>
        <Modal isShowing={isShowingLogin} hide={toggleLogin} />
      </div>
    </nav>
  );
};

export default Navbar;
