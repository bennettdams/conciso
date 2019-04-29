import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>CONCISO</strong> by{" "}
          <a href="https://github.com/bennettdams/conciso">Bennett Dams</a>. The
          source code is licensed{" "}
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
