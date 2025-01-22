import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <p className="footer-text">© {new Date().getFullYear()} Unmatched Matchmaker. All rights reserved.</p>
      <p className="footer-tagline">"Victory is unmatched, but teamwork is legendary!"</p>
    </footer>
  );
};

export default Footer;
