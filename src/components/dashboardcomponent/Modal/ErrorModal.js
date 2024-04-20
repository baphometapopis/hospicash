import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../../assets/Icons/Error.png";

const ErrorModal = ({ isOpen, onClose, message }) => {
  console.log();
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
          <strong className="text-[20px]"></strong>
          <img
            src={Error}
            className="w-6 h-6 object-cover"
            alt="cover_image"
          />
        </span>
        <p>{message}</p>{" "}
        <button className="bg-[red] px-4 rounded text-white" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
