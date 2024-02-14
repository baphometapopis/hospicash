import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../../assets/img/hospicashcoverimage.jpeg";
import AddPAyment from "../../assets/Icons/icons8-add-payment-24.png";
import { DatePicker, Space } from "antd";
import { get_Insurance_Companies_List } from "../../Api/getInsuranceCompaniesList";
import { getBankTransactionList } from "../../Api/getBankTransactionList";
import { decryptData } from "../../Utils/cryptoUtils";
import SearchIcon from "../../assets/Icons/icons8-search-64.png";
import IconFilter from "../../assets/Icons/IconFIlter.png";

import Select from "react-select";
import "./Transaction.css";

import "react-datepicker/dist/react-datepicker.css";
import PaymentModal from "../../components/dashboardcomponent/Modal/PaymentModal";
import AccountBankTransactionListTable from "../../components/dashboardcomponent/DataTable";
import moment from "moment";
import FilterDrawer from "../../components/Mobile FIlterCOmponent/FilterDrawer";
const { RangePicker } = DatePicker;

export default function Transactions() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Function to handle date changes
  const handleDateChange = (dates, dateStrings) => {
    console.log("Selected Dates:", dates);
    console.log("Formatted Dates:", dateStrings);
  };

  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

  const handleOpenFilterDrawer = () => {
    setFilterDrawerVisible(true);
  };

  const handleCloseFilterDrawer = () => {
    setFilterDrawerVisible(false);
  };
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
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

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

  useEffect(() => {
    dealerTransactionList();
  }, [dealerTransactionList]);

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
        <div className=" bg-white h-64 overflow-y-scroll hide-scrollbar p-2 row-span-2 col-span-2 w-full">
          {" "}
          {insuranceCompaniesList?.map((data, index) => (
            <div
              onClick={() => setSelectedIC(data)}
              className={`relative w-full h-fit border mb-1`}
            >
              <div
                style={{
                  backgroundColor: data.bgColor,
                }}
                className={`rounded-lg p-4`}
              >
                <h3
                  style={{ zIndex: 2, position: "relative" }}
                  // className="text-white  "
                >
                  {data.name}
                </h3>

                <img
                  src={data.icon}
                  alt={data.title}
                  className="w-8 h-10 mx-auto mb-4 "
                  style={{ position: "absolute", right: 5, bottom: -10 }}
                />
                <p className="text-white text-xl ">{data.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="h-64 min-w-[250px] bg-[#0071ab] col-span-2 md:col-span-1 overflow-scroll hide-scrollbar justify-between">
          {" "}
          <p style={{ textAlign: "center", padding: "12px", color: "white" }}>
            {selectedIC?.name || "select an IC "}
          </p>
          {selectedIC && (
            <>
              {" "}
              <div style={{ position: "relative" }}>
                <img
                  onClick={() => setIsPaymentModalOpen(true)}
                  src={AddPAyment}
                  className="w-15 absolute right-3 -top-10"
                  alt="cover_image"
                />
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#eeeeee",
                    padding: "12px",
                    fontSize: "14px",
                  }}
                >
                  DEPOSIT AMOUNT <span> 1174118.00</span>
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#ffff",
                    padding: "12px",
                    fontSize: "14px",
                  }}
                >
                  SOLD POLICY COUNT <span> 1174118.00</span>
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#eeeeee",
                    padding: "12px",
                    fontSize: "14px",
                  }}
                >
                  SOLD POLICY AMOUNT <span> 1174118.00</span>
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#ffff",
                    padding: "12px",
                    fontSize: "14px",
                  }}
                >
                  BALANCE AMOUNT <span> 1174118.00</span>
                </p>
                {/* <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#eeeeee",
                    paddingTop: "12px",
                    fontSize: "14px",
                  }}
                >
                  NIA DEPOSIT AMOUNT <span> 1174118.00</span>
                </p> */}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="  w-[85%] mb:px-8 mb-20 bg-white border border-neutral-light rounded relative">
        <div className="container mx-auto p-4">
          <div className="flex gap-5">
            <h1 className="text-2xl font-bold mb-4">Transaction List</h1>
            {true && (
              <img
                src={IconFilter}
                className="w-[35px]  h-[30px]"
                alt="search_image"
                onClick={handleOpenFilterDrawer}
              />
            )}
          </div>
          {/* <button onClick={handleOpenFilterDrawer}>Open Filter Drawer</button> */}
          <FilterDrawer
            visible={filterDrawerVisible}
            onClose={handleCloseFilterDrawer}
          />

          {isMobile && (
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

                <RangePicker
                  onChange={handleDateChange}
                  allowClear // Show clear button
                  bordered="0px solid #ffff"
                  style={{
                    border: "5px solid #fffff",
                    borderRadius: "4px",
                    backgroundColor: "white",
                  }} // Custom border style
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

          {/* {isMobile && (
            <div
              style={{
                backgroundColor: "#0089d1",
                padding: "10px",
                zIndex: 4,
              }}
              className="px-4 flex rounded-t items-center justify-between w-full sticky top-[50px] "
            >
              <table className="w-full">
                <tbody>
                  <tr>
                    <td
                      style={{ width: "20px", textAlign: "center" }}
                      className="text-white"
                    >
                      SR No
                    </td>
                    <td
                      style={{ width: "90px", textAlign: "center" }}
                      className="text-white"
                    >
                      Company Name
                    </td>
                    <td
                      style={{ width: "100px", textAlign: "center" }}
                      className="text-white"
                    >
                      Transaction No
                    </td>
                    <td
                      style={{
                        width: "20px",
                        textAlign: "center",
                        minWidth: "fitcontent",
                      }}
                      className="text-white "
                    >
                      Amount
                    </td>
                    <td
                      style={{ width: "20px", textAlign: "center" }}
                      className="text-white"
                    >
                      Account no
                    </td>
                    <td
                      style={{ textAlign: "center", width: "20px" }}
                      className="text-white w-['10%']"
                    >
                      Bank Name
                    </td>
                    <td
                      style={{ textAlign: "center", width: "20px" }}
                      className="text-white"
                    >
                      IFSC Code
                    </td>
                    <td
                      style={{
                        color: "white",
                        width: "20px",
                        textAlign: "center",
                      }}
                    >
                      Payment Date
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )} */}
          {/* <DataGridExample data={bankTransactionList} /> */}
          <AccountBankTransactionListTable data={bankTransactionList} />

          {/* {bankTransactionList?.map((data) => (
            <>
              {isMobile ? (
                <BankTransactionCard key={data.id} transaction={data} />
              ) : (
                <MobileTransactionCard key={data.id} transaction={data} />
              )}
            </>
          ))} */}
          <div className="bg-white w-[97%] mx-1 h-8 absolute bottom-24"></div>
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
          {/* <DataTable data={bankTransactionList} /> */}
        </div>{" "}
      </div>
    </div>
  );
}
