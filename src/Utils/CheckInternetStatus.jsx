import React, { useState, useEffect } from "react";

const InternetStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showModal, setShowModal] = useState(false);

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {isOnline && (
        <div
          style={{ zIndex: 100, position: "absolute" }}
          className={`fixed inset-0 flex items-center justify-center ${
            showModal ? "" : "hidden"
          }`}
        >
          <div
            className={`fixed inset-0 transition-opacity ${
              showModal ? "bg-black opacity-75" : "bg-transparent"
            }`}
            aria-hidden="true"
            onClick={handleCloseModal}
          ></div>

          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <h2>No Internet Connection</h2>
            <p>Please </p>
            {/* <button onClick={handleCloseModal}>Close</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default InternetStatus;
