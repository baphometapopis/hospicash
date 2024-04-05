import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import { getDealerTransactionList } from "../Api/getDealerTransactionList";
import IconFilter from "../assets/Icons/IconFIlter.png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Refresh from "../assets/Icons/icons8-refresh-64.png";

import "react-datepicker/dist/react-datepicker.css";
import { decryptData } from "../Utils/cryptoUtils";
import TransactionListTable from "../components/dashboardcomponent/DashboardCardContainer/TransactionCard/TransactionListTable";
import { SearchContainer } from "../components/dashboardcomponent/SearchContainer";
import FilterDrawer from "../components/Mobile FIlterCOmponent/FilterDrawer";
import { calculatePagination } from "../Utils/calculationPagination";
export default function TransactionsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [totalPage, settotalPage] = useState();

  const handleOpenFilterDrawer = () => {
    setFilterDrawerVisible(true);
  };
  const [isRefreshButtonDisabled, setIsRefreshButtonDisabled] = useState(false);

  const handleCloseFilterDrawer = () => {
    setFilterDrawerVisible(false);
  };
  const [filterValue, setfilterValue] = useState("");

  const [totalRecords, setTotalRecords] = useState();
  const [poicyList, setPolicyList] = useState([]);
  const [loginData, setloginData] = useState();
  const [indexOfLastRecord, setIndexOfLastRecord] = useState(10);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
  const recordsPerPage = 10;
  const [isMobile, setisMobile] = useState(false);

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

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth([window.innerWidth]);
    };

    window.addEventListener("resize", handleWindowResize);
    if (windowWidth <= 1035) {
      setisMobile(false);
    } else {
      setisMobile(true);
    }
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);

  const handleRefresh = () => {
    // Disable the button
    setIsRefreshButtonDisabled(true);

    dealerTransactionList();

    setTimeout(() => {
      // Enable the button after 10 seconds
      setIsRefreshButtonDisabled(false);
    }, 10000); // 10 seconds in milliseconds
  };
  const getSearchValue = (prop) => {
    setfilterValue(prop);
    // console.log(prop);
    dealerTransactionList();
  };

  const dealerTransactionList = useCallback(async () => {
    const data = localStorage.getItem("Acemoney_Cache");
    const decryptdata = decryptData(data);
    setloginData(decryptdata);

    if (decryptdata) {
      const listdata = {
        value: filterValue?.searchvalue,
        start_date: filterValue?.start_date,
        end_date: filterValue?.end_date,

        search: filterValue?.param,
        dealer_id: decryptdata?.user_details?.id,
        start: indexOfFirstRecord,
        end: recordsPerPage,
        // policy_type: "sold",
        role_type: decryptdata?.user_details?.role_type,
      };
      if (indexOfFirstRecord !== indexOfLastRecord) {
        try {
          const data = await getDealerTransactionList(listdata);
          setPolicyList(data?.data);
          setTotalRecords(data?.recordsTotal);
          const pagination = calculatePagination(
            totalRecords,
            recordsPerPage,
            0
          );
          settotalPage(pagination?.totalPages);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle the error as needed
        }
      }
    }
  }, [indexOfFirstRecord, filterValue, indexOfLastRecord, totalRecords]);

  useEffect(() => {
    dealerTransactionList();
  }, [dealerTransactionList]);

  // useEffect(() => {
  //   setIndexOfLastRecord(currentPage * recordsPerPage);
  // }, [currentPage, recordsPerPage, totalPage]);

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
            <h1 className="text-2xl font-bold mb-4">Transaction List</h1>
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
              searchType={"dealertransaction"}
            />
          )}

          <TransactionListTable
            data={poicyList}
            role={loginData?.user_details?.role_type}
            loginData={loginData}
            handlePageChange={dealerTransactionList}
          />

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
