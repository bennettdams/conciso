import React from "react";

const Contact: React.FC = () => {
  return (
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
          <button className="button is-primary">Primary</button>
          <button className="button is-link">Link</button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
