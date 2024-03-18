import React, { useEffect, useState } from "react";
import SearchIcon from "../../assets/Icons/icons8-search-64.png";
import Select from "react-select";
import { DatePicker } from "antd";
import { getFilterListApi } from "../../Api/getFilters";

const { RangePicker } = DatePicker;

export const SearchContainer = ({ removeSearchFilter, getSearchValue }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [dateRange, setDateRange] = useState([]);

  const [isTextboxEnabled, setIsTextboxEnabled] = useState(false);
  const [filterOptions, setfilterOptions] = useState([]);

  const handleOptionChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
    setIsTextboxEnabled(true); // Enable text box when an option is selected
  };

  const handleDateChange = (dates, dateStrings) => {
    // console.log("Selected Dates:", dates);
    // console.log("Formatted Dates:", dateStrings);
    setDateRange(dateStrings);
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
            {!removeSearchFilter && (
              <>
                <div style={{ paddingLeft: "30px", width: "250px" }}>
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
                  value={searchValue ?? ""}
                  disabled={!isTextboxEnabled}
                  onClick={handleTextboxClick}
                  onChange={(text) => setSearchValue(text.target.value)}
                  className="mx-4"
                />
              </>
            )}
            <RangePicker
              onChange={handleDateChange}
              allowClear // Show clear button
              style={{
                border: "5px solid #fffff",
                borderRadius: "4px",
                backgroundColor: "white",
                marginLeft: "20px",
                // border: '0px solid #ffffff'
              }} // Custom border style
            />
          </div>
          <div
            onClick={() => {
              const data = {
                param: selectedOption?.value,
                searchvalue: searchValue,
                start_date: dateRange[0] ?? "",
                end_date: dateRange[1] ?? "",
              };
              //passingvalue to parent component
              getSearchValue(data);
            }}
            style={{
              cursor: "pointer",
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
      </div>
    </>
  );
};
