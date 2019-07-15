import React from "react";

interface SectionProps {
  cssName?: string;
}

const Section: React.FC<SectionProps> = props => {
  return props.cssName ? (
    <section className={["section", props.cssName].join(" ")}>
      {props.children}
    </section>
  ) : (
    <section className="section">{props.children}</section>
  );
};

export default Section;
