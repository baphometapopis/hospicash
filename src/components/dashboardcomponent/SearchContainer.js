import React, { useState } from "react";
import SearchIcon from "../../assets/Icons/icons8-search-64.png";
import Select from "react-select";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

export const SearchContainer = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTextboxEnabled, setIsTextboxEnabled] = useState(false);

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setIsTextboxEnabled(true); // Enable text box when an option is selected
  };

  const handleDateChange = (dates, dateStrings) => {
    console.log("Selected Dates:", dates);
    console.log("Formatted Dates:", dateStrings);
  };

  const options = [
    { value: "transaction_no", label: "Transaction No" },
    { value: "status", label: "Status" },
    { value: "transaction_type", label: "Transaction Type" },
  ];

  const handleTextboxClick = () => {
    if (!selectedOption) {
      alert("Please select an option from the dropdown.");
    }
  };

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
        }}
        className="flex sticky top-12"
      >
        <div style={{ padding: "10px" }} className="flex items-center w-full">
          <div style={{ paddingRight: "25px", width: "250px" }}>
            <Select
              options={options}
              placeholder="Select Option"
              onChange={handleOptionChange}
              styles={{
                option: (provided) => ({
                  ...provided,
                  zIndex: 9999, // Set your desired z-index value
                }),
                control: (provided) => ({
                  ...provided,
                  width: "100%",
                  outline: "none", // Remove the outline
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: "#0089d1", // Set the arrow color to blue
                }),
              }}
            />
          </div>
          <div
            style={{ color: "#aaaaaa" }}
            className=" border border- h-[25px] mx-4"
          />
          <input
            style={{
              outline: "none",
              width: "180px",
              cursor: !isTextboxEnabled ? "not-allowed" : "",
              border: "1px solid #6d6d6d",
              padding: "4px",
              borderRadius: "4px",
            }}
            placeholder={
              isTextboxEnabled
                ? `search ${selectedOption?.label}`
                : "select Options"
            }
            disabled={!isTextboxEnabled}
            onClick={handleTextboxClick}
            className="mx-4"
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
            minWidth: "50px",
            borderTopRightRadius: "50px",
            borderBottomRightRadius: "50px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={SearchIcon}
            className="w-[50px] object-cover h-[50px]"
            alt="search_image"
          />
        </div>
      </div>
    </>
  );
};
