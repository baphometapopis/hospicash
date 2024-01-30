import React from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import Total from "../assets/Icons/icons8-rupee-64.png";
import Pending from "../assets/Icons/icons8-pending-50.png";
import Success from "../assets/Icons/icons8-card-payment-80.png";
import concile from "../assets/Icons/icons8-rupees-64.png";

import LineChart from "../components/dashboardcomponent/TransactionChart";

export default function Transactions() {
  const cardsData = [
    {
      icon: Total,
      title: "Total",
      value: "1000",
      bgColor: "#78c8cf",
    },
    {
      icon: Pending,
      title: "Pending",
      value: "50",
      bgColor: "#5888e8",
    },
    {
      icon: Success,
      title: "Success",
      value: "900",
      bgColor: "#e06f7f",
    },
    {
      icon: concile,
      title: "Coincile",
      value: "20",
      bgColor: "#f5c149",
    },
  ];

  return (
    <div className="flex flex-col w-full items-center">
      <div className="  -z-10 w-full">
        <img
          src={coverImage}
          className="w-full h-36 object-cover"
          alt="cover_image"
        />
      </div>
      <div className=" flex justify-center w-full p-8 mx md:w-[75%] max-w-[95%] bg-white lg:max-h-80 min-h-fit -mt-20 border border-neutral-light rounded mb-4 ">
        <LineChart />
      </div>
      <div className=" flex md:flex-row  flex-wrapflex-col justify-between 	md:w-[75%] w-[95%] 	 mb-5  gap-2">
        {/* Map through the data and render a Card for each item */}
        {cardsData.map((data, index) => (
          <div className={`relative w-1/2 lg:w-1/4 h-fit`}>
            <div
              style={{ backgroundColor: data.bgColor }}
              className={`rounded-lg p-4`}
            >
              <h3
                style={{ zIndex: 2, position: "relative" }}
                className="text-white  "
              >
                {data.title}
              </h3>

              <img
                src={data.icon}
                alt={data.title}
                className="w-16 h-16 mx-auto mb-4 "
                style={{ position: "absolute", right: 5, bottom: -10 }}
              />
              <p className="text-white text-xl ">{data.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
