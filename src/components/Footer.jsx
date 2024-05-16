import React from "react";

// Footer component
function Footer() {
  return (
    <footer style={footerStyle}>
      <p>This is the footer of the page.</p>
    </footer>
  );
}

// Inline styles for the footer
const footerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
  position: "fixed",
  bottom: "0",
  width: "100%",
};

export default Footer;
