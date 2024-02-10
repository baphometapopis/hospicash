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
  const initialPlansData = location?.state?.formdata?.plan_data || [
    {
      id: 1,
      plan_name: "RSA1",
      display_plan_name: null,
      dealer_id: 1,
      pa_ic_id: 2,
      hc_ic_id: null,
      rsa_ic_id: 1,
      product_type_id: 1,
      policy_premium: 500,
      policy_premium_with_gst: 90,
      dealer_commission: 50,
      dealer_commission_with_gst: 9,
      pa_ic_commission: null,
      hc_ic_commission: null,
      rsa_ic_commission: null,
      rsa_cover_km: 25,
      plan_term: null,
      is_plan_active: 1,
      created_at: "2019-06-19T12:26:30.000000Z",
      updated_at: "2020-07-29T13:09:18.000000Z",
    },
    {
      id: 2,
      plan_name: "RSA2",
      display_plan_name: null,
      dealer_id: 1,
      pa_ic_id: 2,
      hc_ic_id: null,
      rsa_ic_id: 1,
      product_type_id: 1,
      policy_premium: 500,
      policy_premium_with_gst: 90,
      dealer_commission: 50,
      dealer_commission_with_gst: 9,
      pa_ic_commission: null,
      hc_ic_commission: null,
      rsa_ic_commission: null,
      rsa_cover_km: 25,
      plan_term: null,
      is_plan_active: 1,
      created_at: "2019-06-19T12:26:30.000000Z",
      updated_at: "2020-07-29T13:09:13.000000Z",
    },
    {
      id: 3,
      plan_name: "RSAPA",
      display_plan_name: null,
      dealer_id: 1,
      pa_ic_id: 2,
      hc_ic_id: null,
      rsa_ic_id: 1,
      product_type_id: 1,
      policy_premium: 741.53,
      policy_premium_with_gst: 133.47,
      dealer_commission: 125,
      dealer_commission_with_gst: 22.5,
      pa_ic_commission: 375,
      hc_ic_commission: null,
      rsa_ic_commission: 55,
      rsa_cover_km: 25,
      plan_term: null,
      is_plan_active: 1,
      created_at: "2019-06-19T12:26:30.000000Z",
      updated_at: "2019-12-26T07:03:04.000000Z",
    },
    {
      id: 113,
      plan_name: "COMBO",
      display_plan_name: "RSAPA + HC",
      dealer_id: 1,
      pa_ic_id: 7,
      hc_ic_id: 5,
      rsa_ic_id: 1,
      product_type_id: 1,
      policy_premium: 747.45,
      policy_premium_with_gst: 134.55,
      dealer_commission: 250,
      dealer_commission_with_gst: 45,
      pa_ic_commission: 140,
      hc_ic_commission: 135,
      rsa_ic_commission: 19,
      rsa_cover_km: 25,
      plan_term: null,
      is_plan_active: 1,
      created_at: "2020-10-15T17:20:53.000000Z",
      updated_at: "2022-09-24T07:18:35.000000Z",
    },
    {
      id: 183,
      plan_name: "GOLD",
      display_plan_name: "GOLD",
      dealer_id: 1,
      pa_ic_id: 0,
      hc_ic_id: 0,
      rsa_ic_id: 1,
      product_type_id: 1,
      policy_premium: 747.45,
      policy_premium_with_gst: 134.55,
      dealer_commission: 250,
      dealer_commission_with_gst: 45,
      pa_ic_commission: 140,
      hc_ic_commission: 135,
      rsa_ic_commission: 19,
      rsa_cover_km: 25,
      plan_term: 2,
      is_plan_active: 1,
      created_at: "2022-02-17T07:35:20.000000Z",
      updated_at: "2022-02-17T07:36:00.000000Z",
    },
  ];
  console.log(initialPlansData);
  const [plansData] = useState(initialPlansData);
  const [hasOverflow, setHasOverflow] = useState(false);
  const dispatch = useDispatch();
  const Navigation = useNavigate();

  const handleBuyClick = (selectedPlan) => {
    console.log(`Buying ${selectedPlan.title} plan`);
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
                  price={plan.policy_premium + plan.policy_premium_with_gst}
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
