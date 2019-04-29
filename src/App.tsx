import React from "react";
import "./App.scss";
// import "bulma";
import "./ui/styles/global.scss";

import Home from "./ui/pages/Home";
import Navbar from "./ui/components/navbar/Navbar";
import Footer from "./ui/components/footer/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <section>
        <Navbar />
      </section>
      {/*  */}
      <section className="hero">
        <Home />
      </section>
      {/*  */}
      <section className="section">
        <div className="container">
          <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="Input" />
            </div>
          </div>

          <div className="field">
            <p className="control">
              <span className="select">
                <select>
                  <option>Select dropdown</option>
                </select>
              </span>
            </p>
          </div>

          <div className="buttons">
            <a className="button is-primary">Primary</a>
            <a className="button is-link">Link</a>
          </div>
        </div>
      </section>
      {/*  */}
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default App;
