import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import moment from "moment";
import Refresh from "../assets/Icons/icons8-refresh-64.png";
import Download from "../assets/Icons/icons8-download-64 (2).png";
import Cancel from "../assets/Icons/icons8-cancel-100 (1).png";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { decryptData } from "../Utils/cryptoUtils";

import Excel from "../assets/Icons/icons8-microsoft-excel-50.png";
import "react-datepicker/dist/react-datepicker.css";
import { MyDropzoneComponent } from "../components/dashboardcomponent/FileDropZone";

import { fileUpload } from "../Api/fileUpload";
import { BarLoader } from "react-spinners";

import { get_Excel_InQueue_List } from "../Api/getExcelInQueueList";
import { FileURL } from "../Api/api_Endpoint";
import TimeDifferenceTimer from "../Utils/TimeDifferenceTimer";
import { calculatePagination } from "../Utils/calculationPagination";
import { SearchContainer } from "../components/dashboardcomponent/SearchContainer";

export default function MonthlyFileUpload() {
  const [LoginData, setLoginData] = useState();
  const [isRefreshButtonDisabled, setIsRefreshButtonDisabled] = useState(false);
  const [isSampleButtonDisabled, setIsSampleButtonDisabled] = useState(false);
  const [totalRecords, setTotalRecords] = useState();
  const [totalPage, settotalPage] = useState("");
  const [isMobile, setisMobile] = useState(false);

  // const [data, setData] = useState();
  const [inQueueList, setinQueueList] = useState([]);
  const [totalFileUploaded, settotalFileUploaded] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState([window.innerWidth]);
  const [filterValue, setfilterValue] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [showUpload, setshowUpload] = useState(true);
  const [indexOfLastRecord, setIndexOfLastRecord] = useState(10);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
  const recordsPerPage = 10;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const pagination = calculatePagination(
      totalRecords,
      recordsPerPage,
      pageNumber
    );
    settotalPage(pagination?.totalPages);
    // setIndexOfFirstRecord()
    setIndexOfFirstRecord(pagination?.startIndex);
    // setIndexOfFirstRecord(pageNumber * recordsPerPage);
  };

  const getSearchValue = (prop) => {
    setfilterValue(prop);
    // console.log(prop);
    getExcelAllList();
  };

  const UploadExcelFile = async () => {
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

  const handleDownloadPDF = async (id, status) => {
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
  const getExcelAllList = useCallback(
    async (id, status) => {
      if (status) {
        const listdata = {
          start_date: filterValue?.start_date,
          end_date: filterValue?.end_date,

          id: id,
          start: indexOfFirstRecord,
          end: recordsPerPage,
        };

        if (indexOfFirstRecord !== indexOfLastRecord) {
          get_Excel_InQueue_List(listdata, "all")
            .then((data) => {
              settotalFileUploaded(data?.data);
              setTotalRecords(data?.recordsTotal);
              const pagination = calculatePagination(
                totalRecords,
                recordsPerPage,
                0
              );
              settotalPage(pagination?.totalPages);
            })
            .catch((error) => {
              console.error(error, "dsdsds");
            });
        }
      }
    },
    [
      filterValue?.end_date,
      filterValue?.start_date,
      indexOfFirstRecord,
      indexOfLastRecord,
      totalRecords,
    ]
  );

  const getExcelInQueueList = useCallback(async (id, status) => {
    if (status) {
      const listdata = {
        id: id,
      };

      const data = await getExcelInQueueList(listdata);
      setinQueueList(data?.data);
    }
  }, []);

  const getLocalData = useCallback(async () => {
    const localData = localStorage.getItem("Acemoney_Cache");

    if (localData !== null && localData !== undefined) {
      const decryptdata = decryptData(localData);
      setLoginData(decryptdata?.user_details);
      getExcelInQueueList(decryptdata?.user_details?.id);
      getExcelAllList(decryptdata?.user_details?.id, "all");
    }
  }, [getExcelAllList, getExcelInQueueList]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    getLocalData();
  }, [getLocalData, showUpload]);

  const handleSampleDownload = () => {
    const url = process.env.PUBLIC_URL + "/SampleFile/acemoney-hsopicash.csv";
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "acemoney-hsopicash.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //Disable Refresh Button for 10 sec to avoid continous api Hit
  const handleRefresh = () => {
    // Disable the button
    setIsRefreshButtonDisabled(true);
    // Call the API or any other logic
    //sending all parameter will call all uploaded file list
    getExcelAllList(LoginData?.id, "all");
    //sending without parameter will  call the list which are in queue
    getExcelInQueueList(LoginData?.id);

    setTimeout(() => {
      // Enable the button after 10 seconds
      setIsRefreshButtonDisabled(false);
    }, 10000); // 10 seconds in milliseconds
  };

  const handleSampleDownloadRefresh = () => {
    // Disable the button
    setIsSampleButtonDisabled(true);
    // Call the API or any other logic
    handleSampleDownload();

    setTimeout(() => {
      // Enable the button after 10 seconds
      setIsSampleButtonDisabled(false);
    }, 10000); // 10 seconds in milliseconds
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

  useEffect(() => {}, [selectedFile]);

  useEffect(() => {
    setIndexOfLastRecord(currentPage * recordsPerPage);
  }, [currentPage, recordsPerPage, totalPage]);

  useEffect(() => {
    getExcelAllList();
  }, [indexOfLastRecord, indexOfFirstRecord, getExcelAllList]);

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
              <div
                onClick={UploadExcelFile}
                className=" bg-primary mx-5 w-[45%]"
              >
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
              className={` bg-secondary mx-5 w-[45%] ${
                isSampleButtonDisabled ? "opacity-50" : ""
              }`}
              onClick={() =>
                !isSampleButtonDisabled && handleSampleDownloadRefresh()
              }
            >
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  cursor: isSampleButtonDisabled ? "not-allowed" : "pointer",
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <h1 className="text-2xl font-bold mb-4">Uploaded File List</h1>
              <Tippy
                content={
                  isRefreshButtonDisabled ? "wait 10 sec " : "Refresh Files"
                }
                placement="right"
                arrow={true}
                className="rounded-sm text-xs"
              >
                <img
                  src={Refresh}
                  className={`w-[35px] h-[30px]   ${
                    isRefreshButtonDisabled
                      ? "cursor-not-allowed animate-spin-slow"
                      : "cursor-pointer"
                  } ${isRefreshButtonDisabled ? "opacity-50" : ""}`}
                  alt="search_image"
                  onClick={() => !isRefreshButtonDisabled && handleRefresh()}
                />
              </Tippy>
            </div>

            <p className="bg-primary p-1 rounded text-white cursor-pointer">
              Download Plan Details
            </p>
          </div>

          {isMobile && (
            <SearchContainer
              getSearchValue={getSearchValue}
              searchType={"policy"}
              removeSearchFilter={true}
            />
          )}

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
                Page {currentPage} of {totalPage}
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
                disabled={currentPage === totalPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
