import React, { useState } from "react";
import "./PageHeader.scss";

type PageHeaderProps = {
  title: string;
};

const PageHeader: React.FC<PageHeaderProps> = props => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onMouseEnterHandler = () => {
    setIsHovered(true);
  };
  const onMouseLeaveHandler = () => {
    setIsHovered(false);
  };

  return (
    <div className="page-header container">
      <section className="section">
        <div
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          className={[
            "hero-body",
            isHovered ? "flow-to-right" : "flow-to-right-reset"
          ].join(" ")}
        >
          <h1 className="title page-header-title is-size-1 has-text-primary">
            {props.title}
          </h1>
          {props.title && <hr />}
        </div>
      </section>
    </div>
  );
};

export default PageHeader;
