// Plans.js
import React, { useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import PlanCard from "./PlanCard";
import { useLocation, useNavigate } from "react-router-dom";

const Plans = () => {
  const location = useLocation();
  const initialPlansData = location?.state?.formdata?.plan_data || [];
  const [plansData] = useState(initialPlansData);

  const Navigation = useNavigate();

  const handleBuyClick = (selectedPlan) => {
    console.log(`Buying ${selectedPlan.title} plan`);
    Navigation("/Form", { state: { selectedPlan, Action: "NewPolicy" } });
  };

  // const plansData = [
  //   {
  //     plan_id: 1324354,
  //     plan_name: "Silver Plan",
  //     features: [
  //       "Basic medical coverage",
  //       "Up to $5000 in annual claims",
  //       "24/7 support",
  //     ],
  //     policy_premium: "Rs 500/month",
  //     backgroundColor: "#E5E7EB",
  //   },
  //   {
  //     plan_id: 132433244,
  //     plan_name: "Platinum Plan",
  //     features: [
  //       "Comprehensive medical coverage",
  //       "Up to $15,000 in annual claims",
  //       "Personalized health tracking",
  //     ],
  //     policy_premium: "Rs 1000/month",
  //     backgroundColor: "#D1FAE5",
  //   },
  //   {
  //     plan_id: 1324354,
  //     plan_name: "Gold Plan",
  //     features: [
  //       "VIP medical services",
  //       "Unlimited annual claims",
  //       "Priority access to specialists",
  //     ],
  //     policy_premium: "Rs 1500/month",
  //     backgroundColor: "#FDE68A",
  //   },
  // ];
  return (
    <>
      <div className="flex flex-col w-full items-center">
        <div className="sticky -z-10 top-12 w-full">
          <img
            src={coverImage}
            className="w-full h-36 object-cover"
            alt="cover_image"
          />
        </div>

        <div className="mx-6 md:min-w-fit md:w-1/2 h-full mb-20 -mt-20 flex p-2">
          <div className="flex justify-around mt-6 md:flex-row flex-col gap-4">
            {plansData?.length > 0 ? (
              plansData.map((plan, index) => (
                <PlanCard
                  key={index}
                  title={plan.plan_name}
                  features={plan.features}
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
