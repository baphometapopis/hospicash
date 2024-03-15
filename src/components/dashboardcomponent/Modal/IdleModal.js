import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IdleModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) {
        navigate('login')
      localStorage.removeItem("Acemoney_Cache");

      console.log("lkjghyftg");
    }
  }, [isOpen]);
  return (
    <div
      style={{ zIndex: 100, position: "absolute" }}
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className={`fixed inset-0 transition-opacity ${
          isOpen ? "bg-black opacity-75" : "bg-transparent"
        }`}
        aria-hidden="true"
        onClick={onClose}
      ></div>

      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <h2>Your session has timed out</h2>
        <p>Please log in again to continue</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default IdleModal;
