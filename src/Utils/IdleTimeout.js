import { useEffect, useState } from "react";

export const IdleTimeout = ({ timeout, onTimeout }) => {
  const [timer, setTimer] = useState(null);
  const [timeoutExpired, setTimeoutExpired] = useState(false);

  // Function to reset the timer
  const resetTimer = () => {
    if (timer) {
      console.log("Timer reset");
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      // Timeout happened, call the callback if timeout hasn't expired yet
      if (!timeoutExpired) {
        onTimeout();
        setTimeoutExpired(true);
        console.log("pkojihugyft");
      }
    }, timeout);

    setTimer(newTimer);
  };

  // Attach event listeners to reset the timer on user activity
  const onUserActivity = () => {
    resetTimer();
  };

  useEffect(() => {
    // Set up event listeners when the component mounts
    window.addEventListener("mousemove", onUserActivity);
    window.addEventListener("keypress", onUserActivity);

    // Start the initial timer
    resetTimer();

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener("mousemove", onUserActivity);
      window.removeEventListener("keypress", onUserActivity);

      // Clear the timeout when unmounting
      clearTimeout(timer);
    };
  }, []);

  return null; // This component doesn't render anything, it just manages the timeout
};
