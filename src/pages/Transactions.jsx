import React, { useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import { get_Insurance_Companies_List } from "../Api/getInsuranceCompaniesList";

export default function Transactions() {
  const [insuranceCompaniesList, setInsuranceCompaniesList] = useState([]);

  const getinsCompaniesList = async () => {
    const data = await get_Insurance_Companies_List();
    console.log(data);
    if (data?.status) {
      setInsuranceCompaniesList(data?.data);
    }
  };
  useEffect(() => {
    getinsCompaniesList();
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="  -z-10 w-full">
        <img
          src={coverImage}
          className="w-full h-36 object-cover"
          alt="cover_image"
        />
      </div>
      <div className=" grid  grid-cols-2  justify-center w-full  gap-2 mx md:w-[85%] max-w-[95%  lg:max-h-80 min-h-fit -mt-20  rounded mb-4 ">
        <div className="bg-white h-64 overflow-x-scroll p-2">
          {" "}
          {insuranceCompaniesList.map((data, index) => (
            <div className={`relative w-full h-fit border mb-1`}>
              <div
                style={{
                  backgroundColor: data.bgColor,
                }}
                className={`rounded-lg p-4`}
              >
                <h3
                  style={{ zIndex: 2, position: "relative" }}
                  // className="text-white  "
                >
                  {data.name}
                </h3>

                <img
                  src={data.icon}
                  alt={data.title}
                  className="w-8 h-10 mx-auto mb-4 "
                  style={{ position: "absolute", right: 5, bottom: -10 }}
                />
                <p className="text-white text-xl ">{data.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white">;olikhugjyfhtgdrs</div>
      </div>
      <div className=" flex md:flex-row  flex-col justify-between 	md:w-[75%] w-[95%] 	 mb-5  gap-2">
        {/* Map through the data and render a Card for each item */}
        {/* {cardsData.map((data, index) => (
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
        ))} */}
      </div>
    </div>
  );
}
