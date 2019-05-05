import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../../constants/routes";

// COMPONENTS
import useModal from "../../hooks/useModal";
import LoginModal from "../modal/LoginModal";
import SignupModal from "../modal/SignupModal";

const Navbar: React.FC = () => {
  const { isShowing: isShowingLogin, toggle: toggleLogin } = useModal();
  const { isShowing: isShowingSignup, toggle: toggleSignup } = useModal();

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

          <Link className="navbar-item" to={ROUTES.POSTS}>
            Posts
          </Link>

          <Link className="navbar-item" to={ROUTES.POST_CREATE}>
            <button className="button is-primary">
              <strong>Create Post</strong>
            </button>
          </Link>
        </div>

        <div className="navbar-end">
          <Link className="navbar-item" to={ROUTES.CONTACT}>
            Contact
          </Link>

          <Link className="navbar-item" to={ROUTES.ABOUT}>
            About
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">More</div>

            <div className="navbar-dropdown">
              <a className="navbar-item" href="/legal">
                Legal
              </a>
              <a
                className="navbar-item"
                href="https://github.com/bennettdams"
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub
              </a>
              <hr className="navbar-divider" />
              <a
                className="navbar-item"
                href="https:twitter.com/BennettDams"
                target="_blank"
                rel="noreferrer noopener"
              >
                Twitter
              </a>
            </div>
          </div>

          {/* SIGNUP AND LOGIN */}
          <div className="navbar-item">
            <div className="buttons">
              <button onClick={toggleSignup} className="button is-primary">
                <strong>Sign up</strong>
              </button>
              <button onClick={toggleLogin} className="button is-light">
                Log in
              </button>
            </div>
          </div>
          <LoginModal isShowing={isShowingLogin} hide={toggleLogin}>
            Content of Login Modal
          </LoginModal>
          <SignupModal isShowing={isShowingSignup} hide={toggleSignup}>
            Content of Signup Modal
          </SignupModal>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
