import React, { useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import IconFilter from "../assets/Icons/IconFIlter.png";
import { useCallback } from "react";

import { getSold_CancelPolicy } from "../Api/getsold_CancelPOlicy";
import DealerCancelledPolicyTable from "../components/dashboardcomponent/DealerCancelledPolicyTable";
import { SearchContainer } from "../components/dashboardcomponent/SearchContainer";
import FilterDrawer from "../components/Mobile FIlterCOmponent/FilterDrawer";

export default function CancelledPolicy() {
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

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

  const [indexOfLastRecord, setIndexOfLastRecord] = useState(10);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
  const recordsPerPage = 10;
  const [isMobile, setisMobile] = useState(false);

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
    setIndexOfFirstRecord(pageNumber * recordsPerPage);
  };

  const [windowWidth, setWindowWidth] = useState([window.innerWidth]);

  const SoldCancelPolicy = useCallback(() => {
    const fetchData = async () => {
      const listdata = {
        dealer_id: "1",
        start: indexOfFirstRecord,
        end: recordsPerPage,
        policy_type: "cancelled",
      };
      if (indexOfFirstRecord !== indexOfLastRecord) {
        try {
          const data = await getSold_CancelPolicy(listdata);
          setPolicyList(data?.data);
          setTotalRecords(data?.recordsTotal);
          console.log(data?.recordsTotal);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [
    indexOfFirstRecord,
    indexOfLastRecord,
    recordsPerPage,
    setPolicyList,
    setTotalRecords,
  ]);

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
  }, [currentPage, recordsPerPage]);

  useEffect(() => {
    SoldCancelPolicy();
  }, [indexOfLastRecord, indexOfFirstRecord, SoldCancelPolicy]);

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
            <h1 className="text-2xl font-bold mb-4">Cancelled Policy</h1>
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

          <DealerCancelledPolicyTable data={poicyList} />

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
            {Math.floor(totalRecords / recordsPerPage) !== 0 && (
              <div className="flex items-center mt-4">
                <span className="text-gray-600 mx-2">
                  Page {currentPage} of{" "}
                  {Math.floor(totalRecords / recordsPerPage)}
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
                    currentPage === Math.floor(totalRecords / recordsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
