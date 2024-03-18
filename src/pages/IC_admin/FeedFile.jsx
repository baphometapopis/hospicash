import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../../assets/img/hospicashcoverimage.jpeg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { DatePicker } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { SearchContainer } from "../../components/dashboardcomponent/SearchContainer";
import { Select } from "antd";
import { getFilterListApi } from "../../Api/getFilters";
import { FileURL } from "../../Api/api_Endpoint";
const { RangePicker } = DatePicker;

export default function FeedFile() {
  const [filterOptions, setfilterOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [IsDownloadButtonClicked, setIsDownloadButtonClicked] = useState(null);

  const [dateRange, setDateRange] = useState([]);

  const getFilterList = useCallback(async () => {
    try {
      const filterRes = await getFilterListApi("feedfile");
      if (filterRes?.status) {
        setfilterOptions(filterRes.filter_data);
      }
    } catch (error) {
      console.error("Error fetching filter list:", error);
    }
  }, []); // Empty dependency array because this function doesn't depend on props or state
  const handleDateChange = (dates, dateStrings) => {
    console.log(selectedOption);
    // console.log("Selected Dates:", dates);
    // console.log("Formatted Dates:", dateStrings);
    setDateRange(dateStrings);
  };
  const handleOptionChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };
  const handleDownloadPDF = async () => {
    try {
      const href_url = `${FileURL}/downloadFeedfile?endorsement_type=${selectedOption}&start_date=${dateRange[0]}&end_date=${dateRange[1]}`;
      window.open(href_url, "_blank");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Download Failed,Try again Later", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const handleDownloadFeedFile = () => {
    // Disable the button
    setIsDownloadButtonClicked(true);

    handleDownloadPDF();
    setTimeout(() => {
      // Enable the button after 10 seconds
      setIsDownloadButtonClicked(false);
    }, 10000); // 10 seconds in milliseconds
  };
  useEffect(() => {
    getFilterList();
  }, [getFilterList]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="  -z-10 w-full">
        <img
          src={coverImage}
          className="w-full h-36 object-cover"
          alt="cover_image"
        />
      </div>
      {/* <div className=" flex justify-center w-full p-8 mx md:w-[75%] max-w-[95%] bg-white lg:max-h-80 min-h-fit -mt-20 border border-neutral-light rounded mb-4 ">
        <LineChart />
      </div> */}

      <div className="-mt-20 md:w-[75%] w-[95%] mb:px-8 mb-20 bg-white border border-neutral-light rounded">
        <div className="container mx-auto p-4">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <h1 className="text-2xl font-bold mb-4">Feed File</h1>
            </div>
          </div>

          {/* {isMobile && <SearchContainer />} */}
          {false && <SearchContainer removeSearchFilter={true} />}
          <div className="flex flex-row justify-around">
            <div className="flex flex-row ">
              <div
                style={{
                  paddingLeft: "30px",
                  width: "300px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <p className="px-2">Select Fields</p>{" "}
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
              <RangePicker
                onChange={handleDateChange}
                allowClear // Show clear button
                style={{
                  border: "5px solid #fffff",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  marginLeft: "20px",
                }} // Custom border style
              />
            </div>
            <Tippy
              content={IsDownloadButtonClicked ? "wait 10 sec " : " Feed File"}
              placement="right"
              arrow={true}
              className="rounded-sm text-xs"
            >
              <p
                onClick={handleDownloadFeedFile}
                className={`bg-primary p-1 rounded text-white cursor-pointer ${
                  IsDownloadButtonClicked ? "opacity-50" : ""
                }`}
              >
                Download
              </p>
            </Tippy>
          </div>
        </div>
      </div>
    </div>
  );
}
