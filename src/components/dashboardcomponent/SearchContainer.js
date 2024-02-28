import React from "react";
import SearchIcon from "../../assets/Icons/icons8-search-64.png";
import Select from "react-select";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

export const SearchContainer = () => {
  const handleDateChange = (dates, dateStrings) => {
    console.log("Selected Dates:", dates);
    console.log("Formatted Dates:", dateStrings);
  };

  const options = [
    { value: "Option1", label: "Option1" },
    { value: "Bank B", label: "Bank B" },
    { value: "Bank C", label: "Bank C" },
  ];
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "50px",
          marginBottom: "20px",
          marginTop: "5px",
          border: "1px solid",
          // width: "fit-content",
          paddingLeft: "20px",
          marginLeft: "auto",
          zIndex: 5,

          //   boxShadow:
          //     "rgba(0, 137, 209, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        }}
        className=" flex sticky top-12 "
      >
        <div style={{ padding: "10px" }} className=" flex items-center w-full ">
          <input
            style={{ border: 0, outline: "none", width: "120px" }}
            placeholder="transaction ID"
          />
          <div
            style={{ color: "#aaaaaa" }}
            className="border-[0.5px] h-[25px]  mx-4"
          />
          <Select
            options={options}
            styles={{
              option: (provided) => ({
                ...provided,
                zIndex: 9999, // Set your desired z-index value
              }),
              control: (provided) => ({
                ...provided,
                border: "none", // Remove the border
                outline: "none", // Remove the outline
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "#0089d1", // Set the arrow color to blue
              }),
            }}
            // other props as needed
          />

          <RangePicker
            onChange={handleDateChange}
            allowClear // Show clear button
            bordered="0px solid #ffff"
            style={{
              border: "5px solid #fffff",
              borderRadius: "4px",
              backgroundColor: "white",
            }} // Custom border style
          />
        </div>
        <div
          style={{
            backgroundColor: "#0089d1",
            width: "100px",
            borderTopRightRadius: "50px",
            borderBottomRightRadius: "50px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={SearchIcon}
            className="w-[50px]  object-cover"
            alt="search_image"
          />
        </div>
      </div>
    </>
  );
};
