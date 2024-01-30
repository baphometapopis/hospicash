import React from "react";
import pageNotFound from "../assets/img/page_not_found.svg";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <div className="flex justify-center mt-12">
        <div className="flex flex-col text-center">
          <img src={pageNotFound} className="w-72" alt="page_not_found" />
          <p className="mt-8  text-lg">Page not Found!</p>
          <Link to="/login">
            <p className="mt-2 underline">Back to Login</p>
          </Link>
        </div>
      </div>
    </>
  );
}
