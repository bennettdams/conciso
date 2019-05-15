import React, { useState } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../../constants/routes";

// COMPONENTS
import useModal from "../../hooks/useModal";
import LoginModal from "../modal/LoginModal";
import SignupModal from "../modal/SignupModal";

const Navbar: React.FC = () => {
  const { isShowing: isShowingLogin, toggle: toggleLogin } = useModal();
  const { isShowing: isShowingSignup, toggle: toggleSignup } = useModal();
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);

  const handleBurgerMenuClick = (): void => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const handleNavMenuClick = (): void => {
    setIsBurgerOpen(false);
  };

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
          onClick={handleBurgerMenuClick}
          className={[
            "navbar-burger",
            "button",
            "is-light",
            isBurgerOpen ? "is-active" : ""
          ].join(" ")}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarConciso"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div
        onClick={handleNavMenuClick}
        id="navbarConciso"
        className={["navbar-menu", isBurgerOpen ? "is-active" : ""].join(" ")}
      >
        <div className="navbar-start">
          <Link className="navbar-item" to={ROUTES.HOME}>
            Home
          </Link>

          <Link className="navbar-item" to={ROUTES.POSTS}>
            Posts
          </Link>

          <Link className="navbar-item" to={ROUTES.POST_CREATE}>
            <button className="button is-primary ripple">
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

          <Link className="navbar-item" to={ROUTES.PROFILE}>
            Profile
          </Link>

          {/* SIGNUP AND LOGIN */}
          <div className="navbar-item">
            <div className="buttons">
              <button
                onClick={toggleSignup}
                className="button is-primary ripple"
              >
                <span className="has-text-weight-light is-uppercase">
                  Sign up
                </span>
              </button>
              <button onClick={toggleLogin} className="button">
                <span className="has-text-weight-light is-uppercase">
                  Log in
                </span>
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
