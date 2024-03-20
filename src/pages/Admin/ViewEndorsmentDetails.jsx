/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../../assets/img/hospicashcoverimage.jpeg";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewEndorsmentDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  // Sample data for previous and updated endorsement details (dynamic)
  const previousEndorsementData = {
    policyNumber: "ABC123XYZ",
    holderName: "John Doe",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    amountInsured: "$100,000",
    premium: "$500",
    status: "Active",
    // Add more dynamic fields here as needed
  };

  const updatedEndorsementData = {
    policyNumber: "ABC123XYZ",
    holderName: "Jane Smith",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    amountInsured: "$120,000",
    premium: "$550",
    status: "Active",
    // Add more dynamic fields here as needed
  };

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
        <div className="flex flex-col md:flex-row w-full justify-center">
          <div className="mx-6  bg-white h-full -mt-20 border border-neutral-light rounded mb-20 w-2/4">
            <div className="bg-base-white h-24 border-b border-neutral-light rounded-t p-4">
              <p className="text-2xl">Endorsement Details</p>
            </div>
            {/* Display previous and updated endorsement data */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              className="p-4"
            >
              <div className="w-1/2">
                <p className="text-lg font-bold text-center">Previous Details</p>
                {Object.entries(previousEndorsementData).map(([key, value]) => (
                  <p key={key} className="my-2">
                    <span className="inline-block w-36">{key}:</span>{" "}
                    <span>{value}</span>
                  </p>
                ))}
              </div>
              {/* Display updated endorsement data */}
              <div className="w-1/2">
                <p className="text-lg font-bold text-center">Updated Details:</p>
                {Object.entries(updatedEndorsementData).map(([key, value]) => (
                  <p key={key} className="my-2">
                    <span className="inline-block w-36">{key}:</span>{" "}
                    <span>{value}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
