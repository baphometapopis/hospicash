import React from "react";
import Check from "../assets/Icons/icons8-check-48.png";

const PlanCard = ({
  title,
  data,
  price,
  backgroundColor,
  onBuyClick,
  button,
}) => {
  return (
    <div
      className="flex flex-col justify-between plan p-6 rounded-lg mb-4 md:mb-0 transform hover:scale-105 transition-transform duration-300 ease-in-out items-center"
      style={{
        backgroundColor: backgroundColor ?? "white",
        minWidth: "250px",
        boxShadow:
          " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
      }}
    >
      <div>
        <h2
          style={{ color: "#a6a9ae" }}
          className=" font-bold mb-2 text-center"
        >
          {title}
        </h2>

        <p
          style={{ color: "#0089d2" }}
          className=" font-bold text-3xl	  text-center	"
        >
          ₹{price}
          <span className="text-base">/year</span>
        </p>
        <div style={{ color: "#a6a9ae" }} className="border-b  mb-6 mt-2"></div>
      </div>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {Array.isArray(data?.features) &&
          data?.features.length > 0 &&
          data?.features.map((feature, index) => (
            <div style={{ display: "flex" }}>
              <img
                src={Check}
                style={{ width: "25px", marginRight: "10px" }}
                alt="cover_image"
              />
              <p>
                {feature.label} :{feature.value}
              </p>
            </div>
          ))}
        {/* <div style={{ display: "flex" }}>
          <img
            src={Check}
            style={{ width: "25px", marginRight: "10px" }}
            alt="cover_image"
          />
          <p>RSA Tenure : 1 Year</p>
        </div>
        <div style={{ display: "flex" }}>
          <img
            src={Check}
            style={{ width: "25px", marginRight: "10px" }}
            alt="cover_image"
          />
          <p>RSA Covered Kms : {data?.rsa_cover_km}</p>
        </div>
        <div style={{ display: "flex" }}>
          <img
            src={Check}
            style={{ width: "25px", marginRight: "10px" }}
            alt="cover_image"
          />
          <p>Tenure : 1 Year</p>
        </div>
        <div style={{ display: "flex" }}>
          <img
            src={Check}
            style={{ width: "25px", marginRight: "10px" }}
            alt="cover_image"
          />
          <p>Sum Insured : 15 lakh</p>
        </div> */}
      </div>
      {button && (
        <button
          onClick={onBuyClick}
          className="text-white py-2 px-4 mt-4 rounded-full"
          style={{ backgroundColor: "#F59E0B" }}
        >
          Buy This Plan
        </button>
      )}
    </div>
  );
};

export default PlanCard;
