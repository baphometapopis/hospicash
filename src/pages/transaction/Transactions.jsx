import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../../assets/img/hospicashcoverimage.jpeg";
import AddPAyment from "../../assets/Icons/icons8-add-payment-24.png";
import chooseImg from "../../assets/img/ChooseBank.jpeg";
import { WalletOutlined, PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  Getpartypaymentdetails,
  get_Insurance_Companies_List,
} from "../../Api/getInsuranceCompaniesList";
import { getBankTransactionList } from "../../Api/getBankTransactionList";
import { decryptData } from "../../Utils/cryptoUtils";
import IconFilter from "../../assets/Icons/IconFIlter.png";
import "./Transaction.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import PaymentModal from "../../components/dashboardcomponent/Modal/PaymentModal";
import AccountBankTransactionListTable from "../../components/dashboardcomponent/DataTable";
import FilterDrawer from "../../components/Mobile FIlterCOmponent/FilterDrawer";
import { SearchContainer } from "../../components/dashboardcomponent/SearchContainer";
import { calculatePagination } from "../../Utils/calculationPagination";
import Refresh from "../../assets/Icons/icons8-refresh-64.png";

export default function Transactions() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const handleOpenFilterDrawer = () => {
    setFilterDrawerVisible(true);
  };
  const handleCloseFilterDrawer = () => {
    setFilterDrawerVisible(false);
  };
  const [insuranceCompaniesList, setInsuranceCompaniesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState();
  const [bankTransactionList, setBankTransactionList] = useState([]);
  const [selectedIC, setSelectedIC] = useState();
  const [selectedICPaymentDetails, setselectedICPaymentDetails] = useState();
  const [totalPage, settotalPage] = useState();

  const [indexOfLastRecord, setIndexOfLastRecord] = useState(10);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
  const [isFloatButton, setFloatButtonOpen] = useState(true);
  const [isRefreshButtonDisabled, setIsRefreshButtonDisabled] = useState(false);

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

  const handleRefresh = () => {
    // Disable the button
    setIsRefreshButtonDisabled(true);

    dealerTransactionList();

    setTimeout(() => {
      // Enable the button after 10 seconds
      setIsRefreshButtonDisabled(false);
    }, 10000); // 10 seconds in milliseconds
  };

  const getICPartyPAymentDetails = async (id) => {
    setSelectedIC(id);
    const data = await Getpartypaymentdetails(id?.id);
    if (data?.status) {
      setselectedICPaymentDetails(data?.data);
    } else {
      toast.error(data?.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
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
    const data = localStorage.getItem("Acemoney_Cache");
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
  }, [indexOfFirstRecord, indexOfLastRecord, totalRecords]);

  useEffect(() => {
    dealerTransactionList();
  }, [dealerTransactionList]);

  useEffect(() => {
    setIndexOfLastRecord(currentPage * recordsPerPage);
  }, [currentPage, recordsPerPage]);

  const getinsCompaniesList = async () => {
    const data = await get_Insurance_Companies_List();
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
      <div className=" grid md:grid-cols-3    gap-2 w-[85%]  lg:max-h-80 min-h-fit -mt-20  rounded-lg mb-4  ">
        <div className=" border border-neutral-light rounded bg-white h-64 overflow-y-scroll hide-scrollbar p-2 row-span-2 col-span-2 w-full">
          {" "}
          {insuranceCompaniesList?.map((data, index) => (
            <div
              onClick={() => getICPartyPAymentDetails(data)}
              className={`relative w-full h-fit border mb-1 rounded  border-neutral-light`}
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
                  {data.code}
                </h3>

                <img
                  src={`${data?.logo}`}
                  alt={data.code}
                  className="w-8 h-10 mx-auto mb-4  rounded-full"
                  style={{ position: "absolute", right: 5, bottom: -10 }}
                />
                {/* <p className="text-white text-xl ">{data.code}</p> */}
              </div>
            </div>
          ))}
        </div>
        <div className="border border-neutral-light rounded h-64 min-w-[250px] bg-[#0071ab] col-span-2 md:col-span-1 overflow-scroll hide-scrollbar justify-between">
          {" "}
          <p style={{ textAlign: "center", padding: "12px", color: "white" }}>
            {selectedIC?.name || "select an IC "}
          </p>
          {!selectedIC?.name && (
            <img src={chooseImg} className="w-full h-[95%]" alt="cover_image" />
          )}
          {selectedIC && (
            <>
              {" "}
              <div style={{ position: "relative" }}>
                {/* <img
                  onClick={() => setIsPaymentModalOpen(true)}
                  src={AddPAyment}
                  className="w-15 absolute right-3 -top-10 cursor-pointer"
                  alt="cover_image"
                /> */}
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#eeeeee",
                    padding: "12px",
                    fontSize: "14px",
                  }}
                >
                  DEPOSIT AMOUNT{" "}
                  <span> {selectedICPaymentDetails?.deposite_amount}</span>
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
                  SOLD POLICY COUNT{" "}
                  <span>
                    {" "}
                    {`${selectedICPaymentDetails?.policy_count ?? "-"}`}
                  </span>
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
                  SOLD POLICY AMOUNT{" "}
                  <span>
                    {`${selectedICPaymentDetails?.policy_primium ?? "-"}`}
                  </span>
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
                  BALANCE AMOUNT{" "}
                  <span>
                    {" "}
                    {`${selectedICPaymentDetails?.balance_amount ?? "-"}`}
                  </span>
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
          {/* <button onClick={handleOpenFilterDrawer}>Open Filter Drawer</button> */}
          <FilterDrawer
            visible={filterDrawerVisible}
            onClose={handleCloseFilterDrawer}
          />

          {isMobile && <SearchContainer />}

          <AccountBankTransactionListTable
            data={bankTransactionList}
            totalRecords={totalRecords}
          />

          {/* {bankTransactionList?.map((data) => (
            <>
              {isMobile ? (
                <BankTransactionCard key={data.id} transaction={data} />
              ) : (
                <MobileTransactionCard key={data.id} transaction={data} />
              )}
            </>
          ))} */}
          {/* <div className="bg-white w-[97%] mx-1 h-8 absolute bottom-24"></div> */}
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
      <>
        <FloatButton.Group
          onClick={() => {
            setFloatButtonOpen(!isFloatButton);
          }}
          open={isFloatButton}
          trigger="click"
          type="primary"
          style={{ right: 24 }}
          icon={<PlusOutlined />}
        >
          {/* <FloatButton /> */}
          <Tippy content="Add Payment" placement="right" arrow={true}>
            <FloatButton
              icon={<WalletOutlined />}
              onClick={() => setIsPaymentModalOpen(true)}
            />
          </Tippy>
        </FloatButton.Group>
      </>
    </div>
  );
}
