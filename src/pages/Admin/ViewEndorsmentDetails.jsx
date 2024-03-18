/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../../assets/img/hospicashcoverimage.jpeg";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewEndorsmentDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="flex flex-col w-full items-center overflow-auto">
        <div className=" -z-10 top-12 w-full">
          <img
            src={coverImage}
            className="w-full h-36 object-cover"
            alt="cover_image"
          />
        </div>
        <div className="flex flex-col md:flex-row ">
          {" "}
          <div className="mx-6 md:min-w-fit md:w-1/2 bg-white h-full -mt-20 border border-neutral-light rounded mb-20">
            <div className="bg-base-white h-24 border-b border-neutral-light rounded-t p-4">
              <p className="text-2xl">Endorsment Details</p>

              {/* <p>Start punching policy by filling in the User's details</p> */}
            </div>
            asdsadasd
          </div>
        </div>
      </div>
    </>
  );
}
