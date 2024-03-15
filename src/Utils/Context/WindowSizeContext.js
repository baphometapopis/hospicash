import React, { createContext, useState, useEffect } from "react";

const WindowSizeContext = createContext();

export const WindowSizeProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Update context only if size has changed
    if (windowSize.width !== newWidth || windowSize.height !== newHeight) {
      setWindowSize({
        width: newWidth,
        height: newHeight,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Call the handler right away so state gets updated with initial window size
    handleResize();

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export default WindowSizeContext;
