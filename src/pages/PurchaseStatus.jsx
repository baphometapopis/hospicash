import React, { useCallback, useEffect, useState } from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import policyPurchaseSuccess from "../assets/img/undraw_certification_re_ifll (1).svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/ui/Button";
import { getSoldPolicyData } from "../Api/getSoldPolicyData";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { decryptData } from "../Utils/cryptoUtils";

export default function PurchaseStatus() {
  const handleDownloadPDF = async (pdfUrl) => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${policyData?.sold_policy_no}_${policyData?.fname}.pdf`;

      downloadLink.click();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [policy_id] = useState(location?.state?.policy_id);

  const [policyData, setPolicyData] = useState();
  const getPolicyData = useCallback(async () => {
    const localdata = localStorage.getItem("Acemoney_Cache");
    const decryptdata = decryptData(localdata);

    if (decryptdata) {
      try {
        const data = await getSoldPolicyData(
          decryptdata?.user_details?.id,
          policy_id
        );
        if (data?.status) {
          setPolicyData(data?.data[0]);
        } else {
          toast.error("Failed to get Policy Data", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      } catch (error) {
        console.error("Error fetching policy data:", error);
      }
    }
  }, [policy_id, setPolicyData]);

  useEffect(() => {
    getPolicyData();
  }, [getPolicyData]);
  return (
    <div className="flex flex-col w-full items-center">
      <div className="sticky -z-10 top-12 w-full">
        <img
          src={coverImage}
          className="w-full h-36 object-cover"
          alt="cover_image"
        />
      </div>
      <div className="justify-around	 lg:flex    w-full p-8 mx md:w-[75%] max-w-[95%] bg-white  min-h-fit -mt-20 border border-neutral-light rounded mb-4 ">
        <div className="flex flex-col items-center">
          <img
            src={policyPurchaseSuccess}
            className="w-36"
            alt="policy_purchase_success"
          />
          <h3 className="mt-4 text-xl font-semibold">Congratulations!</h3>
          <p className="text-sm">The policy has been successfully purchased.</p>
          <div className="flex justify-center w-60 my-4 mx-auto">
            <Button
              type="button"
              label="Download Policy PDF"
              variant="secondary"
              onClick={() => handleDownloadPDF(policyData?.policy_url)}
            />
          </div>
          <div className="my-4">
            <table className="text-sm space-x-4">
              <tr>
                <td className="w-40 text-neutral-darker text-right pr-4">
                  Policy Number
                </td>
                <td>:{policyData?.sold_policy_no}</td>
              </tr>
              <tr>
                <td className="w-40 text-neutral-darker text-right  pr-4">
                  Customer Name
                </td>
                <td>
                  {policyData?.fname} {policyData?.mname} {policyData?.lname}
                </td>
              </tr>
              <tr>
                <td className="w-40 text-neutral-darker text-right  pr-4">
                  Mobile Number
                </td>
                <td>{policyData?.mobile_no}</td>
              </tr>
              <tr>
                <td className="w-40 text-neutral-darker text-right  pr-4">
                  Email
                </td>
                <td>{policyData?.email}</td>
              </tr>
              <tr>
                <td className="w-40 text-neutral-darker text-right  pr-4">
                  Plan Amount
                </td>
                <td>Rs. {policyData?.sold_policy_price_with_tax}/-</td>
              </tr>
              <tr>
                <td className="w-40 text-neutral-darker text-right  pr-4">
                  Policy Start Date
                </td>
                <td>
                  {moment(
                    policyData?.sold_policy_effective_date,
                    "YYYY-MM-DD HH:mm:ss"
                  ).format("DD MMM YYYY")}
                </td>
              </tr>
              <tr>
                <td className="w-40 text-neutral-darker text-right  pr-4">
                  Policy End Date
                </td>
                <td>
                  {moment(
                    policyData?.sold_policy_end_date,
                    "YYYY-MM-DD HH:mm:ss"
                  ).format("DD MMM YYYY")}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center py-4 pb-8 w-96 space-x-4">
          <Button
            type="button"
            onClick={() => navigate("/home")}
            label="Go to Dashboard"
            variant="ghost"
          />
          {/* <Button type="submit" label="Create New Policy" variant="primary" /> */}
        </div>
      </div>
    </div>
  );
}
