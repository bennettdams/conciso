import React from "react";

type PageHeaderProps = {
  title: string;
};

const PageHeader: React.FC<PageHeaderProps> = props => {
  return (
    <div className="about-page container">
      <section className="section">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-1 is-family-secondary">
              {props.title}
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageHeader;
