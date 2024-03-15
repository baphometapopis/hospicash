import React, { useState, useEffect } from "react";

const TimeDifferenceTimer = ({ createDate }) => {
  const [timeDifference, setTimeDifference] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const createdTime = new Date(createDate);
      const currentTime = new Date();

      const difference = currentTime - createdTime;
      const seconds = Math.floor(difference / 1000);

      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      //   const formattedTimeDifference = `${days} days, ${hours} hours, ${minutes} minutes, ${remainingSeconds} seconds`;
      const formattedTimeDifference = `${hours}:${minutes}:${remainingSeconds}`;

      setTimeDifference(formattedTimeDifference);
    }, 1000);

    return () => clearInterval(interval);
  }, [createDate]);

  return <div>{timeDifference}</div>;
};

export default TimeDifferenceTimer;
