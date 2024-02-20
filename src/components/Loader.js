import React from "react";
import loaderGif from "../assets/Gif/Loader.gif";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.99)", // Add a semi-transparent background
        zIndex: 9999, // Ensure it appears on top of other content
      }}
    >
      <img src={loaderGif} alt="loader" />
    </div>
  );
};

export default Loader;
