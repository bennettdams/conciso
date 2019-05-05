import React from "react";
import Count from "../components/Count";

const HomePage: React.FC = () => {
  return (
    <div className="home-page container fade-in">
      <section className="section">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-1 is-family-secondary">CONCISO</h1>
            <h2 className="subtitle is-size-3 is-italic is-family-primary">
              INFORMATION THAT HONORS YOUR TIME.
            </h2>
          </div>
        </div>
      </section>

      <section className="section">
        <Count />
      </section>
    </div>
  );
};

export default HomePage;
