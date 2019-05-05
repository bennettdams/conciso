import React from "react";

// COMPONENTS
import Count from "../components/Count";
import PageHeader from "../components/page-header/PageHeader";

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page container fade-in">
      <PageHeader title="CONTACT" />

      <section className="section">
        <Count />
      </section>
    </div>
  );
};

export default ContactPage;
