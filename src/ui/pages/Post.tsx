import React from "react";
import Count from "../components/Count";

const Post: React.FC = () => {
  return (
    <div className="post">
      <section className="section">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-1 is-family-secondary">POST</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <Count />
      </section>
    </div>
  );
};

export default Post;
