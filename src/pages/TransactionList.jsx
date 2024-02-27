import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import { getDealerTransactionList } from "../Api/getDealerTransactionList";
import IconFilter from "../assets/Icons/IconFIlter.png";

import "react-datepicker/dist/react-datepicker.css";
import { decryptData } from "../Utils/cryptoUtils";
import TransactionListTable from "../components/dashboardcomponent/DashboardCardContainer/TransactionCard/TransactionListTable";
import { SearchContainer } from "../components/dashboardcomponent/SearchContainer";
import FilterDrawer from "../components/Mobile FIlterCOmponent/FilterDrawer";
export default function TransactionsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

  const handleOpenFilterDrawer = () => {
    setFilterDrawerVisible(true);
  };

  const handleCloseFilterDrawer = () => {
    setFilterDrawerVisible(false);
  };
  const [totalRecords, setTotalRecords] = useState();
  const [poicyList, setPolicyList] = useState([]);
  const [loginData, setloginData] = useState();
  const [indexOfLastRecord, setIndexOfLastRecord] = useState(10);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
  const recordsPerPage = 10;
  const [isMobile, setisMobile] = useState(false);

  // const [searchParam, setSearchParam] = useState({
  //   value: "",
  //   param: "",
  //   start_date: "",
  //   end_date: "",
  // });

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber, "jhfd");

    setCurrentPage(pageNumber);
    setIndexOfFirstRecord((pageNumber - 1) * 10 + 1);
  };

  const [windowWidth, setWindowWidth] = useState([window.innerWidth]);

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
    const data = localStorage.getItem("Acemoney_Cache");
    const decryptdata = decryptData(data);
    setloginData(decryptdata);

    if (decryptdata) {
      const listdata = {
        dealer_id: decryptdata?.user_details?.id,
        start: indexOfFirstRecord,
        end: recordsPerPage,
        policy_type: "sold",
        role_type: decryptdata?.user_details?.role_type,
      };
      if (indexOfFirstRecord !== indexOfLastRecord) {
        try {
          const data = await getDealerTransactionList(listdata);
          setPolicyList(data?.data);
          setTotalRecords(data?.recordsTotal);
          console.log(data?.recordsTotal);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle the error as needed
        }
      }
    }
  }, [indexOfFirstRecord, indexOfLastRecord, recordsPerPage]);

  useEffect(() => {
    dealerTransactionList();
  }, [dealerTransactionList]);

  useEffect(() => {
    setIndexOfLastRecord(currentPage * recordsPerPage);
  }, [currentPage, recordsPerPage]);

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
          </div>
          <FilterDrawer
            visible={filterDrawerVisible}
            onClose={handleCloseFilterDrawer}
          />
          {isMobile && <SearchContainer />}

          <TransactionListTable
            data={poicyList}
            role={loginData?.user_details?.role_type}
            loginData={loginData}
            handlePageChange={dealerTransactionList}
          />
          {false && (
            <div
              style={{
                backgroundColor: "#0089d1",
                padding: "10px",
                zIndex: 4,
              }}
              className="px-4 flex rounded-t items-center justify-between w-full sticky top-[115px] "
            >
              <span
                style={{
                  width: "8%",
                  textAlign: "center",
                }}
                className="text-white"
              >
                SR No
              </span>
              <span
                style={{
                  width: "25%", // Adjusted width for responsiveness
                  textAlign: "center",
                }}
                className="text-white"
              >
                Tranx No
              </span>
              <span
                style={{
                  width: "10%",
                  textAlign: "center",
                  minWidth: "fitcontent",
                }}
                className="text-white "
              >
                Amount
              </span>
              <span
                style={{
                  width: "10%",
                  textAlign: "center",
                }}
                className="text-white"
              >
                Status
              </span>
              <span
                style={{ textAlign: "center", width: "10%" }}
                className="text-white w-['10%']"
              >
                Transaction Type
              </span>
              <span
                style={{ textAlign: "center", width: "15%" }}
                className="text-white"
              >
                Payment Date
              </span>
              {/* <span
                style={{ color: "white", width: "20%", textAlign: "center" }}
              >
                Created At
              </span> */}
              {loginData?.user_details?.role_type === "admin" && (
                <span
                  style={{ color: "white", width: "20%", textAlign: "center" }}
                >
                  Action
                </span>
              )}
            </div>
          )}
          {/* {poicyList.map((data) => (
            <>
              {isMobile ? (
                <TransactionCard
                  key={data.id}
                  transaction={data}
                  user_id={loginData?.user_details?.id}
                  role_type={loginData?.user_details?.role_type}
                />
              ) : (
                <MobileTransactionCard
                  key={data.id}
                  transaction={data}
                  user_id={loginData?.user_details?.id}
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
