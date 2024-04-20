import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SessionTimeout from "../../../assets/Icons/sessionTimeout.png";

const IdleModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) {
      navigate("login");
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

      <div className="flex flex-col gap-2 items-center  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 ">
        <span className="flex flex-row justify-center items-center">
          <strong className="text-[20px]">Your session has timed out!</strong>
          <img
            src={SessionTimeout}
            className="w-6 h-6 object-cover"
            alt="cover_image"
          />
        </span>
        <p>Please log in again to continue</p>
        <button className="bg-[red] px-4 rounded text-white" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default IdleModal;
