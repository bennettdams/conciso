import React from "react";
import PageHeader from "../page-header/PageHeader";

interface PageProps {
  name: string;
  title?: string;
}

const Page: React.FC<PageProps> = props => {
  return (
    <div className={props.name + " container fade-in"}>
      {props.title && <PageHeader title={props.title} />}
      <div className="page-content container">{props.children}</div>
    </div>
  );
};

export default Page;
