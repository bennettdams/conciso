import React from "react";

// COMPONENTS
import Count from "../components/Count";

const ContactPage: React.FC = () => {
  return (
    <div className="contact container">
      <section className="section">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-1 is-family-secondary">CONTACT</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <Count />
      </section>
    </div>
  );
};

export default ContactPage;
