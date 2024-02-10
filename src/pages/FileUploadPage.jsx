import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import AddPAyment from "../assets/Icons/icons8-add-payment-24.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { get_Insurance_Companies_List } from "../Api/getInsuranceCompaniesList";
import { getBankTransactionList } from "../Api/getBankTransactionList";
import { decryptData } from "../Utils/cryptoUtils";
import SearchIcon from "../assets/Icons/icons8-search-64.png";
import Select from "react-select";
// import "./Transaction.css";
import Excel from "../assets/Icons/icons8-microsoft-excel-50.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaymentModal from "../components/dashboardcomponent/Modal/PaymentModal";
import DataGridExample from "../components/dashboardcomponent/ReactDatagrid/ReactDataGrid";
import { MyDropzoneComponent } from "../components/dashboardcomponent/FileDropZone";
import { Box, Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { fileUpload } from "../Api/fileUpload";
import { BarLoader } from "react-spinners";
import DataTable from "../components/dashboardcomponent/DataTable";
import BasicTable from "../components/dashboardcomponent/DataTable";

export default function MonthlyFileUpload() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [LoginData, setLoginData] = useState();

  const [insuranceCompaniesList, setInsuranceCompaniesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [data, setData] = useState();
  const [totalRecords, setTotalRecords] = useState();
  const [bankTransactionList, setBankTransactionList] = useState([]);
  const [selectedIC, setSelectedIC] = useState();
  const [indexOfLastRecord, setIndexOfLastRecord] = useState(10);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
  const recordsPerPage = 10;
  const [isMobile, setisMobile] = useState(false);
  const [searchParam, setSearchParam] = useState({
    value: "",
    param: "",
    start_date: "",
    end_date: "",
  });

  const options = [
    { value: "Bank A", label: "Bank A" },
    { value: "Bank B", label: "Bank B" },
    { value: "Bank C", label: "Bank C" },
  ];
  const [selectedFile, setSelectedFile] = useState();
  const [isuploadError, setisuploadError] = useState(false);
  const [showUpload, setshowUpload] = useState(true);

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
    setIndexOfFirstRecord(pageNumber * recordsPerPage);
  };
  const handleDownload = async () => {
    try {
      const pdfUrl =
        "https://media.githubusercontent.com/media/datablist/sample-csv-files/main/files/organizations/organizations-100.csv"; // Provide the actual URL of the PDF file

      // Fetch the PDF file
      const response = await fetch(pdfUrl);
      const blob = await response.blob();

      // Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `hospicashSample.csv`; // Specify the desired file name

      // Trigger the download
      downloadLink.click();
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle error, e.g., display an error message to the user
    }
  };
  const getLocalData = async () => {
    const localData = localStorage.getItem("LoggedInUser");

    if (localData !== null || localData !== undefined) {
      const decryptdata = decryptData(localData);
      console.log(decryptdata);
      setLoginData(decryptdata?.user_details);
    }
  };
  const [windowWidth, setWindowWidth] = useState([window.innerWidth]);
  const sendFile = async () => {
    setshowUpload(false);

    const data = await fileUpload(LoginData?.id, selectedFile);
    if (data?.status) {
      setisuploadError(false);
      toast.success(data?.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.error("File Upload Failed", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setisuploadError(true);
    }
    setshowUpload(true);
  };
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth([window.innerWidth]);
    };

    window.addEventListener("resize", handleWindowResize);
    if (windowWidth <= 768) {
      setisMobile(false);
    } else {
      setisMobile(true);
    }
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);
  const dealerTransactionList = useCallback(async () => {
    const data = localStorage.getItem("LoggedInUser");
    const decryptdata = decryptData(data);

    if (decryptdata) {
      const listdata = {
        dealer_id: decryptdata?.user_details?.id,
        start: indexOfFirstRecord,
        end: recordsPerPage,
        policy_type: "sold",
      };
      if (indexOfFirstRecord !== indexOfLastRecord) {
        try {
          const data = await getBankTransactionList(listdata);
          setBankTransactionList(data?.data);
          setTotalRecords(data?.recordsTotal);
          console.log(data?.recordsTotal);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle the error as needed
        }
      }
    }
  }, [indexOfFirstRecord, indexOfLastRecord, recordsPerPage]);
  const handleFileSelect = () => {
    console.log("File Upload ");
  };

  useEffect(() => {
    dealerTransactionList();
  }, []);

  useEffect(() => {
    setIndexOfLastRecord(currentPage * recordsPerPage);
  }, [currentPage, recordsPerPage]);

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
  useEffect(() => {
    getLocalData();
  }, [showUpload]);
  const [timeLeft, setTimeLeft] = useState(200 * 6);

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
  //     }, 1000);

  //     // Cleanup function to clear the interval when the component unmounts
  //     return () => clearInterval(timer);
  //   }, []);
  return (
    <div className="flex flex-col w-full items-center">
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        icList={insuranceCompaniesList}
      />

      <div className="  -z-10 w-full">
        <img
          src={coverImage}
          className="w-full h-36 object-cover"
          alt="cover_image"
        />
      </div>
      <div className=" grid md:grid-cols-3    gap-2 w-[85%]  lg:max-h-80 min-h-fit -mt-20  rounded mb-4 ">
        <div className="h-64 min-w-[250px] bg-white col-span-2 md:col-span-1 overflow-scroll hide-scrollbar justify-between">
          <MyDropzoneComponent onFileSelect={handleFileSelect} />
          <Box
            display="flex"
            flexDirection="row"
            gap={2}
            marginRight={2}
            marginLeft={2}
          >
            {selectedFile && !isuploadError && showUpload && (
              <Button
                onClick={sendFile}
                className={"w-fit"}
                type="submit"
                label="Upload"
                variant="primary"
              />
            )}
            {isuploadError && (
              <>
                <Button
                  onClick={handleDownload}
                  className={"w-fit"}
                  type="submit"
                  label="sample"
                  variant="primary"
                />
                <Button
                  className={"w-fit"}
                  type="submit"
                  label="Download"
                  variant="secondary"
                />
              </>
            )}
          </Box>
        </div>
        <div className=" bg-white h-64 overflow-y-scroll hide-scrollbar p-2 row-span-2 col-span-2 w-full">
          {" "}
          {insuranceCompaniesList?.map((data, index) => (
            <div
              onClick={() => setSelectedIC(data)}
              className={`w-full h-fit  border border-[#6d6d6d] mb-2 flex items-center flex-row justify-around rounded-lg `}
            >
              <div
                style={{
                  backgroundColor: data.bgColor,
                }}
                className={`rounded-lg p-2`}
              >
                <img src={Excel} alt={data.title} className="w-8 h-10" />
              </div>
              <p>Hospicash.csv</p>
              <div className="overflow-hidden w-[400px] mx-3">
                {" "}
                <BarLoader
                  color="#0089D1"
                  height={2}
                  speedMultiplier={0.9}
                  width={500}
                />
              </div>
              <div className="mx-4 items-end">
                {Math.floor(timeLeft / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(timeLeft % 60).toString().padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="  w-[85%] mb:px-8 mb-20 bg-white border border-neutral-light rounded">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Upload FIle List</h1>
          {false && (
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
              <div
                style={{ padding: "10px" }}
                className=" flex items-center w-full "
              >
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
                <label>Start Date: </label>{" "}
                <DatePicker
                  id="date"
                  selected={searchParam.start_date}
                  onKeyDown={(event) => {
                    const allowedCharacters = /^[0-9/]*$/;

                    if (
                      !(
                        allowedCharacters.test(event.key) ||
                        event.key === "Backspace" ||
                        event.key === "/"
                      )
                    ) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(date) => {
                    console.log(date);
                    setSearchParam({ ...searchParam, start_date: date });
                  }}
                  preventOpenOnFocus={false}
                  autoComplete="false"
                  dateFormat="yyyy/MM/dd"
                  placeholderText="YYYY/MM/DD"
                  className="focus:outline-none border border-[#6D6D6D] px-2 py-1  "
                />
                <div
                  style={{ color: "#aaaaaa" }}
                  className="border-[0.5px] h-[25px]  mx-4"
                />
                <label>End Date: </label>{" "}
                <DatePicker
                  id="date"
                  selected={searchParam.end_date}
                  onKeyDown={(event) => {
                    const allowedCharacters = /^[0-9/]*$/;

                    if (
                      !(
                        allowedCharacters.test(event.key) ||
                        event.key === "Backspace" ||
                        event.key === "/"
                      )
                    ) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(date) => {
                    console.log(date);
                    setSearchParam({ ...searchParam, end_date: date });
                  }}
                  preventOpenOnFocus={false}
                  autoComplete="false"
                  dateFormat="yyyy/MM/dd"
                  placeholderText="YYYY/MM/DD"
                  className="focus:outline-none border border-[#6D6D6D] px-2 py-1  "
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
          )}

          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-600">
              Showing {indexOfFirstRecord + 1} to {indexOfFirstRecord + 10} of{" "}
              {totalRecords} entries
            </span>
            <div className="flex items-center mt-4">
              <span className="text-gray-600 mx-2">
                Page {currentPage} of {Math.ceil(totalRecords / recordsPerPage)}
              </span>

              <button
                className={`mx-1 p-2 rounded bg-blue-500 text-gray`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className={`mx-1 p-2 rounded bg-blue-500 text-gray`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(totalRecords / recordsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
