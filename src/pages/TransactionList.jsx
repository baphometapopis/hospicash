import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import SearchIcon from "../assets/Icons/icons8-search-64.png";
import Select from "react-select";
import { getDealerTransactionList } from "../Api/getDealerTransactionList";
import TransactionCard from "../components/dashboardcomponent/DashboardCardContainer/TransactionCard/TransactionCard";
import MobileTransactionCard from "../components/dashboardcomponent/DashboardCardContainer/TransactionCard/MobileTransactionCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { decryptData } from "../Utils/cryptoUtils";
export default function TransactionsList() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [data, setData] = useState();
  const [totalRecords, setTotalRecords] = useState();
  const [poicyList, setPolicyList] = useState([]);

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

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
    setIndexOfFirstRecord(pageNumber * recordsPerPage);
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
          <h1 className="text-2xl font-bold mb-4">Transaction List</h1>
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

          {isMobile && (
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
                Transaction Type
              </span>
              <span
                style={{
                  width: "10%",
                  textAlign: "center",
                }}
                className="text-white"
              >
                Amount
              </span>
              <span
                style={{ textAlign: "center", width: "10%" }}
                className="text-white w-['10%']"
              >
                Status
              </span>
              <span
                style={{ textAlign: "center", width: "15%" }}
                className="text-white"
              >
                Payment Date
              </span>
              <span
                style={{ color: "white", width: "20%", textAlign: "center" }}
              >
                Created At
              </span>
            </div>
          )}
          {poicyList.map((data) => (
            <>
              {isMobile ? (
                <TransactionCard key={data.id} transaction={data} />
              ) : (
                <MobileTransactionCard key={data.id} transaction={data} />
              )}
            </>
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
