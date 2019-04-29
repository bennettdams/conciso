import React from "react";

const Navbar: React.FC = () => {
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
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">Home</div>

          <div className="navbar-item">Documentation</div>

          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">More</div>

            <div className="navbar-dropdown">
              <div className="navbar-item">About</div>
              <div className="navbar-item">Jobs</div>
              <div className="navbar-item">Contact</div>
              <hr className="navbar-divider" />
              <div className="navbar-item">Report an issue</div>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-primary">
                <strong>Sign up</strong>
              </button>
              <button className="button is-light">Log in</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
