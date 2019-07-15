import React, { useState } from "react";
import "./PageHeader.scss";
import Section from "../layout/Section";

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
    <div className="page-header">
      <Section>
        <div
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
          className={[isHovered ? "flow-to-right" : "flow-to-right-reset"].join(
            " "
          )}
        >
          <h1 className="title page-header-title is-size-1 has-text-primary">
            {props.title}
          </h1>
          <hr />
        </div>
      </Section>
    </div>
  );
};

export default PageHeader;
