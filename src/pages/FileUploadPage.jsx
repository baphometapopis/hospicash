import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import AddPAyment from "../assets/Icons/icons8-add-payment-24.png";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import moment from "moment";

import Download from "../assets/Icons/icons8-download-64 (2).png";
import Cancel from "../assets/Icons/icons8-cancel-100 (1).png";

import "react-toastify/dist/ReactToastify.css";
import { get_Insurance_Companies_List } from "../Api/getInsuranceCompaniesList";
import { getBankTransactionList } from "../Api/getBankTransactionList";
import { decryptData } from "../Utils/cryptoUtils";
import SearchIcon from "../assets/Icons/icons8-search-64.png";
import Select from "react-select";
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
import { get_Excel_InQueue_List } from "../Api/getExcelInQueueList";

export default function MonthlyFileUpload() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [LoginData, setLoginData] = useState();

  const [insuranceCompaniesList, setInsuranceCompaniesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [data, setData] = useState();
  const [totalRecords, setTotalRecords] = useState();
  const [bankTransactionList, setBankTransactionList] = useState([]);
  const [inQueueList, setinQueueList] = useState([]);
  const [totalFileUploaded, settotalFileUploaded] = useState([]);

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

  const getLocalData = async () => {
    const localData = localStorage.getItem("LoggedInUser");

    if (localData !== null || localData !== undefined) {
      const decryptdata = decryptData(localData);
      console.log(decryptdata);
      setLoginData(decryptdata?.user_details);
      getExcelInQueueList(decryptdata?.user_details?.id);
      getExcelInQueueList(decryptdata?.user_details?.id, "all");
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
  const handleDownloadPDF = async (id, status) => {
    console.log(id, status);
    try {
      const href_url = `https://hospicash.mylmsnow.com/api/downloadMonthExcel?excel_id=${id}&status=${status}`;
      console.log(href_url);
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
  const dealerTransactionList = useCallback(async () => {
    const data = localStorage.getItem("LoggedInUser");
    const decryptdata = decryptData(data);

    if (decryptdata) {
      if (indexOfFirstRecord !== indexOfLastRecord) {
        try {
          const data = await getExcelInQueueList(
            decryptdata?.user_details?.id,
            "all"
          );
          settotalFileUploaded(data?.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle the error as needed
        }
      }
    }
  }, [indexOfFirstRecord, indexOfLastRecord, recordsPerPage]);
  const handleFileSelect = (file) => {
    console.log("File Upload ", file);
    setSelectedFile(file);
  };

  useEffect(() => {
    dealerTransactionList();
  }, []);

  useEffect(() => {
    setIndexOfLastRecord(currentPage * recordsPerPage);
  }, [currentPage, recordsPerPage]);

  const getExcelInQueueList = async (id, status) => {
    if (status) {
      const data = await get_Excel_InQueue_List(id, status);
      if (data?.status) {
        settotalFileUploaded(data?.data);
        setTotalRecords(data?.data?.length);
      }
    } else {
      const data = await get_Excel_InQueue_List(id);
      if (data?.status) {
        setinQueueList(data?.data);
      }
    }
  };

  useEffect(() => {
    getLocalData();
  }, [showUpload]);
  useEffect(() => {}, [selectedFile]);
  const [timeLeft, setTimeLeft] = useState(200 * 6);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);
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
        <div className="h-64 min-w-[250px] border  border-neutral-light bg-white col-span-2 md:col-span-1 overflow-scroll hide-scrollbar justify-between">
          <MyDropzoneComponent onFileSelect={handleFileSelect} />
          {showUpload ? (
            <div onClick={sendFile} className=" bg-primary mx-5">
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Upload
              </p>
            </div>
          ) : (
            <div className=" bg-primary mx-5">
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  cursor: "not-allowed",
                }}
              >
                Uploading....
              </p>
            </div>
          )}
        </div>
        <div className=" border border-neutral-light bg-white h-64 overflow-y-scroll hide-scrollbar p-2 row-span-2 col-span-2 w-full">
          {inQueueList.length !== 0 ? (
            <>
              {inQueueList?.map((data, index) => (
                <div
                  style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                  }}
                  className={`w-full h-fit  border border-neutral-light mb-2 flex items-center flex-row justify-around rounded-lg `}
                >
                  <div
                    style={{
                      backgroundColor: data.bgColor,
                    }}
                    className={`rounded-lg p-2`}
                  >
                    <img src={Excel} alt={data.title} className="w-8 h-10" />
                  </div>
                  <div className="justify-center">
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                      }}
                    >
                      Hospicash.csv
                    </p>
                    <p
                      style={{
                        textAlign: "center",
                        color: "#6d6d6d",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {moment(data?.create_date).format("DD-MM-YYYY hh:mm A")}
                    </p>
                  </div>
                  <div className="overflow-hidden w-[400px] mx-3">
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
            </>
          ) : (
            <p>No File In Queue</p>
          )}
        </div>
      </div>
      <div className="  w-[85%] mb:px-8 mb-20 bg-white border border-neutral-light rounded">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Uploaded FIle List</h1>
          {false && (
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "50px",
                marginBottom: "20px",
                marginTop: "5px",
                border: "1px solid",
                paddingLeft: "20px",
                marginLeft: "auto",
                zIndex: 5,
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

          {totalFileUploaded?.map((data, index) => (
            <div
              style={{
                boxShadow:
                  " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
              }}
              className={`w-full h-fit justify-between border  border-neutral-light mb-2 flex items-center flex-row  rounded-lg `}
            >
              <div className="flex flex-row items-center   gap-5">
                <div
                  style={{
                    backgroundColor: data.bgColor,
                  }}
                  className={`rounded-lg p-2 `}
                >
                  <img src={Excel} alt={data.title} className="w-8 h-10" />
                </div>
                <div className="justify-center">
                  <p>Hospicash.csv</p>
                  <p
                    style={{
                      textAlign: "center",
                      color: "#6d6d6d",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {moment(data?.create_date).format("DD-MM-YYYY hh:mm A")}
                  </p>
                </div>
              </div>

              <div className="flex  mx-3 gap-4 ">
                <div
                  style={{
                    fontSize: "14px",
                    backgroundColor: "#0089d1",
                    color: "#ffff",
                    padding: "1px",
                  }}
                  className="rounded-md cursor-pointer h-fit"
                  onClick={() => handleDownloadPDF(data?.id, "sold")}
                >
                  <Tippy
                    content={"Sold Proposal"}
                    placement="top"
                    arrow={true}
                    className="rounded-sm text-xs"
                  >
                    <img
                      src={Download}
                      className="w-[25px] object-center"
                      alt="search_image"
                    />
                  </Tippy>
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    backgroundColor: "#dc143c",
                    color: "#ffff",
                  }}
                  className="rounded-md cursor-pointer h-fit"
                  onClick={() => handleDownloadPDF(data?.id, "reject")}
                >
                  <Tippy
                    content={"Rejected Proposal"}
                    placement="top"
                    arrow={true}
                    className="rounded-sm text-xs"
                  >
                    <img src={Cancel} className="w-[25px]" alt="search_image" />
                  </Tippy>
                </div>
              </div>
            </div>
          ))}

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
