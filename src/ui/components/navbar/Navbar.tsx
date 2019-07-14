import React, { useState } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../../constants/routes";

// COMPONENTS
import useModal from "../../hooks/useModal";
import LoginModal from "../modal/LoginModal";
import SignupModal from "../modal/SignupModal";
import useFirebase from "../../../services/firebase/useFirebase";
import Button from "../button/Button";
import ButtonSecondary from "../button/ButtonSecondary";

const Navbar: React.FC = () => {
  const { isSignedIn, signOut } = useFirebase();
  const { isShowing: isShowingLogin, toggle: toggleLogin } = useModal();
  const { isShowing: isShowingSignup, toggle: toggleSignup } = useModal();
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);

  const handleBurgerMenuClick = (): void => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const handleNavMenuClick = (): void => {
    setIsBurgerOpen(false);
  };

  const handleLogout = (): void => {
    signOut();
  };

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
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
          {isSignedIn ? (
            <Link className="navbar-item" to={ROUTES.POST_CREATE}>
              <Button>Create Post</Button>
            </Link>
          ) : (
            <Link className="navbar-item" to={ROUTES.ABOUT}>
              About
            </Link>
          )}
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
          <div className="user-management">
            {isSignedIn ? (
              <div className="navbar-item">
                <Link className="navbar-item" to={ROUTES.PROFILE}>
                  Profile
                </Link>
                <Button callback={handleLogout}>Logout</Button>
              </div>
            ) : (
              <div className="navbar-item">
                <div className="buttons">
                  <Button callback={toggleSignup}>Signup</Button>
                  <ButtonSecondary callback={toggleLogin}>
                    Log in
                  </ButtonSecondary>
                </div>
              </div>
            )}
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
