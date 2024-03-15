// Plans.js
import React, { useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import PlanCard from "./PlanCard";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUserData } from "../Redux/userSlice.js";
import "./transaction/Transaction.css";
import { useDispatch } from "react-redux";

const Plans = () => {
  const location = useLocation();
  const initialPlansData = location?.state?.formdata?.plan_data;
  const [plansData] = useState(initialPlansData);
  const [hasOverflow, setHasOverflow] = useState(false);
  const dispatch = useDispatch();
  const Navigation = useNavigate();

  const handleBuyClick = (selectedPlan) => {
    // Dispatching the action
    dispatch(updateUserData({ plan_id: selectedPlan?.id }));

    Navigation("/Form", { state: { selectedPlan, Action: "NewPolicy" } });
  };

  useEffect(() => {
    const container = document.getElementById("plansContainer");

    const handleOverflowChange = () => {
      setHasOverflow(container.scrollWidth > container.clientWidth);
    };

    container.addEventListener("scroll", handleOverflowChange);
    handleOverflowChange(); // Initial check

    return () => {
      container.removeEventListener("scroll", handleOverflowChange);
    };
  }, [hasOverflow]);
  return (
    <>
      <div className="flex flex-col  items-center overflow-x-scroll w-[100%]">
        <div className=" -z-10 top-12 w-full">
          <img
            src={coverImage}
            className="w-full h-36 object-cover"
            alt="cover_image"
          />
        </div>

        <div className="mx-6  h-full mb-20 -mt-20 flex p-2  w-[94%] justify-center">
          <div
            id="plansContainer"
            style={{
              minHeight: "fit-content",
              overflowX: "scroll",
              // background: hasOverflow ? "red" : "",
              // paddingLeft: hasOverflow ? "176px" : "0px",
            }}
            // className="flex md:h-[450px] justify-around mt-6 md:flex-row flex-col gap-4   "
            className="gap-4 p-5 flex md:flex-row flex-col  md:h-[450px] hide-scrollbar"
          >
            {plansData?.length > 0 ? (
              plansData.map((plan, index) => (
                <PlanCard
                  key={index}
                  title={plan.plan_name}
                  data={plan}
                  features={plan.features}
                  price={plan.total_premium}
                  backgroundColor={plan.backgroundColor}
                  onBuyClick={() => handleBuyClick(plan)}
                  button
                />
              ))
            ) : (
              <p>No plans available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Plans;
