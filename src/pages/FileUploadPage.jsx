import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import moment from "moment";

import Download from "../assets/Icons/icons8-download-64 (2).png";
import Cancel from "../assets/Icons/icons8-cancel-100 (1).png";

import "react-toastify/dist/ReactToastify.css";

import { decryptData } from "../Utils/cryptoUtils";
import SearchIcon from "../assets/Icons/icons8-search-64.png";
import Select from "react-select";
import Excel from "../assets/Icons/icons8-microsoft-excel-50.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MyDropzoneComponent } from "../components/dashboardcomponent/FileDropZone";

import { fileUpload } from "../Api/fileUpload";
import { BarLoader } from "react-spinners";

import { get_Excel_InQueue_List } from "../Api/getExcelInQueueList";
import { API_BASE_URL, FileURL } from "../Api/api_Endpoint";
import TimeDifferenceTimer from "../Utils/TimeDifferenceTimer";

export default function MonthlyFileUpload() {
  const [LoginData, setLoginData] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  // const [data, setData] = useState();
  const [totalRecords, setTotalRecords] = useState();
  const [inQueueList, setinQueueList] = useState([]);
  const [totalFileUploaded, settotalFileUploaded] = useState([]);

  const [indexOfLastRecord, setIndexOfLastRecord] = useState(10);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
  const recordsPerPage = 10;
  // const [isMobile, setisMobile] = useState(false);
  const [searchParam, setSearchParam] = useState({
    value: "",
    param: "",
    start_date: "",
    end_date: "",
  });

  const options = [
    { value: "Option1", label: "Option1" },
    { value: "Option2", label: "Option2" },
    { value: "Option3", label: "Option3" },
  ];
  const [selectedFile, setSelectedFile] = useState();
  const [showUpload, setshowUpload] = useState(true);

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
    setIndexOfFirstRecord(pageNumber * recordsPerPage);
  };

  // const [windowWidth, setWindowWidth] = useState([window.innerWidth]);
  const sendFile = async () => {
    setshowUpload(false);

    const data = await fileUpload(LoginData?.id, selectedFile);
    if (data?.status) {
      toast.success(data?.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      console.log(data);
      toast.error(data?.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    setshowUpload(true);
  };
  // useEffect(() => {
  //   const handleWindowResize = () => {
  //     setWindowWidth([window.innerWidth]);
  //   };

  //   window.addEventListener("resize", handleWindowResize);
  //   if (windowWidth <= 768) {
  //     setisMobile(false);
  //   } else {
  //     setisMobile(true);
  //   }
  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // }, [windowWidth]);

  const handleDownloadPDF = async (id, status) => {
    console.log(id, status);
    try {
      const href_url = `${FileURL}/downloadMonthExcel?excel_id=${id}&status=${status}`;
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
  const getExcelInQueueList = useCallback(
    async (id, status) => {
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
    },
    [settotalFileUploaded, setTotalRecords, setinQueueList]
  );
  const getLocalData = useCallback(async () => {
    const localData = localStorage.getItem("Acemoney_Cache");

    if (localData !== null && localData !== undefined) {
      const decryptdata = decryptData(localData);
      setLoginData(decryptdata?.user_details);
      getExcelInQueueList(decryptdata?.user_details?.id);
      getExcelInQueueList(decryptdata?.user_details?.id, "all");
    }
  }, [getExcelInQueueList, setLoginData]);

  const dealerTransactionList = useCallback(async () => {
    const data = localStorage.getItem("Acemoney_Cache");
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
  }, [getExcelInQueueList, indexOfFirstRecord, indexOfLastRecord]);
  const handleFileSelect = (file) => {
    console.log("File Upload ", file);
    setSelectedFile(file);
  };

  useEffect(() => {
    dealerTransactionList();
  }, [dealerTransactionList]);

  useEffect(() => {
    setIndexOfLastRecord(currentPage * recordsPerPage);
  }, [currentPage, recordsPerPage]);

  useEffect(() => {
    getLocalData();
  }, [getLocalData, showUpload]);
  useEffect(() => {}, [selectedFile]);
  const [timeLeft, setTimeLeft] = useState(200 * 6);
  const handleDownload = () => {
    const url = process.env.PUBLIC_URL + "/SampleFile/acemoney-hsopicash.csv";
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "acemoney-hsopicash.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
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
      <div className=" grid md:grid-cols-3    gap-2 w-[85%]  lg:max-h-80 min-h-fit -mt-20  rounded mb-4 ">
        <div className="h-64 min-w-[250px] border  border-neutral-light bg-white col-span-2 md:col-span-1 overflow-scroll hide-scrollbar justify-between">
          <MyDropzoneComponent onFileSelect={handleFileSelect} />
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              // backgroundColor: "red",
              justifyContent: "center",
            }}
          >
            {showUpload ? (
              <div onClick={sendFile} className=" bg-primary mx-5 w-[45%]">
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
            <div
              className=" bg-secondary mx-5 w-[45%]"
              onClick={handleDownload}
            >
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Sample
              </p>
            </div>
          </div>
        </div>
        <div className=" border border-neutral-light bg-white h-64 overflow-y-scroll hide-scrollbar p-2 row-span-2 col-span-2 w-full">
          {inQueueList.length !== 0 ? (
            <>
              {inQueueList?.map((data, index) => (
                <div
                  key={index}
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
                    {/* {Math.floor(timeLeft / 60)
                      .toString()
                      .padStart(2, "0")}
                    :{(timeLeft % 60).toString().padStart(2, "0")} */}

                    <TimeDifferenceTimer createDate={data.create_date} />
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

          {totalFileUploaded?.map((data, index) => (
            <div
              key={index}
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
