import React, { useEffect, useState } from "react";
import coverImage from "../../assets/img/hospicashcoverimage.jpeg";
import IconFilter from "../../assets/Icons/IconFIlter.png";
import { useCallback } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { getSold_CancelPolicy } from "../../Api/getsold_CancelPOlicy";
import DealerCancelledPolicyTable from "../../components/dashboardcomponent/DealerCancelledPolicyTable";
import { SearchContainer } from "../../components/dashboardcomponent/SearchContainer";
import FilterDrawer from "../../components/Mobile FIlterCOmponent/FilterDrawer";
import ApprovePendingPolicyDataTables from "../../components/dashboardcomponent/ApprovePendingPolicyDataTables";
import { decryptData } from "../../Utils/cryptoUtils";
import { getPendingPolicyListApi } from "../../Api/adminAPi/getPendingCancelledList";
import { calculatePagination } from "../../Utils/calculationPagination";
import Refresh from "../../assets/Icons/icons8-refresh-64.png";

export default function ApprovePendingPolicy() {
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [totalPage, settotalPage] = useState();

  const handleOpenFilterDrawer = () => {
    setFilterDrawerVisible(true);
  };

  const handleCloseFilterDrawer = () => {
    setFilterDrawerVisible(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  // const [data, setData] = useState();
  const [totalRecords, setTotalRecords] = useState();
  const [poicyList, setPolicyList] = useState([]);
  const [LoginData, setLoginData] = useState("");
  const [isRefreshButtonDisabled, setIsRefreshButtonDisabled] = useState(false);

  const [indexOfLastRecord, setIndexOfLastRecord] = useState(10);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
  const recordsPerPage = 10;
  const [isMobile, setisMobile] = useState(false);
  const [filterValue, setfilterValue] = useState("");

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

  const [windowWidth, setWindowWidth] = useState([window.innerWidth]);

  const getLocalData = async () => {
    const localData = localStorage.getItem("Acemoney_Cache");

    if (localData !== null || localData !== undefined) {
      const decryptdata = decryptData(localData);
      setLoginData(decryptdata?.user_details);
    }
    if (LoginData) {
      getPendingCancelledlist();
    }
  };
  const getPendingCancelledlist = useCallback(() => {
    const fetchData = async () => {
      const listdata = {
        value: filterValue?.searchvalue,
        start_date: filterValue?.start_date,
        end_date: filterValue?.end_date,

        search: filterValue?.param,
        dealer_id: LoginData?.id,
        start: indexOfFirstRecord,
        end: recordsPerPage,
        role_type: LoginData?.role_type,
      };
      if (indexOfFirstRecord !== indexOfLastRecord) {
        try {
          const data = await getPendingPolicyListApi(listdata);
          setPolicyList(data?.data);
          setTotalRecords(data?.recordsTotal);
          const pagination = calculatePagination(
            totalRecords,
            recordsPerPage,
            0
          );
          settotalPage(pagination?.totalPages);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [
    LoginData?.id,
    LoginData?.role_type,
    filterValue?.end_date,
    filterValue?.param,
    filterValue?.searchvalue,
    filterValue?.start_date,
    indexOfFirstRecord,
    indexOfLastRecord,
    totalRecords,
  ]);
  const handleRefresh = () => {
    // Disable the button
    setIsRefreshButtonDisabled(true);

    getPendingCancelledlist();

    setTimeout(() => {
      // Enable the button after 10 seconds
      setIsRefreshButtonDisabled(false);
    }, 10000); // 10 seconds in milliseconds
  };
  const getSearchValue = (prop) => {
    setfilterValue(prop);
    // console.log(prop);
    getPendingCancelledlist();
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

  useEffect(() => {
    setIndexOfLastRecord(currentPage * recordsPerPage);
  }, [currentPage, recordsPerPage, totalPage]);

  useEffect(() => {
    getLocalData();
  }, [indexOfLastRecord, indexOfFirstRecord, getPendingCancelledlist]);

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
          <div className="flex gap-5">
            <h1 className="text-2xl font-bold mb-4">
              Pending Cancelled Policy
            </h1>
            {!isMobile && (
              <img
                src={IconFilter}
                className="w-[35px]  h-[30px]"
                alt="search_image"
                onClick={handleOpenFilterDrawer}
              />
            )}

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
          <FilterDrawer
            visible={filterDrawerVisible}
            onClose={handleCloseFilterDrawer}
          />
          {isMobile && (
            <SearchContainer
              getSearchValue={getSearchValue}
              searchType={"policy"}
            />
          )}

          <ApprovePendingPolicyDataTables
            data={poicyList}
            loginData={LoginData}
            handlePageChange={getPendingCancelledlist}
          />

          {/* {poicyList?.map((data) => (
            <>
              {isMobile ? (
                <PolicyCard key={data.id} Policy={data} iscancelled={true} />
              ) : (
                <MobilePolicyCard
                  key={data.id}
                  policy={data}
                  iscancelled={true}
                />
              )}
            </>
          ))} */}
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
