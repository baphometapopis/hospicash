import React, { useEffect, useState } from "react";
import SearchIcon from "../../assets/Icons/icons8-search-64.png";
import Select from "react-select";
import { DatePicker } from "antd";
import { getFilterListApi } from "../../Api/getFilters";

const { RangePicker } = DatePicker;

export const SearchContainer = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTextboxEnabled, setIsTextboxEnabled] = useState(false);
  const [filterOptions, setfilterOptions] = useState([]);

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setIsTextboxEnabled(true); // Enable text box when an option is selected
  };

  const handleDateChange = (dates, dateStrings) => {
    console.log("Selected Dates:", dates);
    console.log("Formatted Dates:", dateStrings);
  };
  const getFilterList = async () => {
    const filterRes = await getFilterListApi();
    if (filterRes?.status) {
      setfilterOptions(filterRes.filter_data);
    }
    console.log(filterRes.filter_data);
  };

  const handleTextboxClick = () => {
    if (!selectedOption) {
      alert("Please select an option from the dropdown.");
    }
  };

  useEffect(() => {
    getFilterList();
  }, []);
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "50px",
          marginBottom: "20px",
          marginTop: "5px",
          // paddingTop:'2px',
          // paddingBor:'2px',
          border: "1px solid",
          // width: "fit-content",
          // paddingLeft: "20px",
          // marginLeft: "auto",
          justifyContent: "space-between",
          zIndex: 5,
        }}
        className="flex sticky top-12"
      >
        <div className="flex items-center w-full justify-between ">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ paddingLeft: "30px", width: "250px" }} >
              <Select
                options={filterOptions}
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
            {/* <div
            style={{ color: "#aaaaaa" }}
            className=" border border- h-[25px] mx-4"
          /> */}
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
              style={{
                border: "5px solid #fffff",
                borderRadius: "4px",
                backgroundColor: "white",
                // border: '0px solid #ffffff'
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
              marginLeft: "5px",
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
        {/* <div
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
        </div> */}
      </div>
    </>
  );
};
