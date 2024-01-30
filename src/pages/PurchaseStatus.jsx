import React from "react";
import coverImage from "../assets/img/hospicashcoverimage.jpeg";
import policyPurchaseSuccess from "../assets/img/undraw_certification_re_ifll (1).svg";
// import policyPurchaseFailed from "../assets/img/policy_purchase_failed.svg";
import Button from "../components/ui/Button";

export default function PurchaseStatus() {
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
            />
          </div>
          <div className="my-4">
            <table className="text-sm space-x-4">
              <tr>
                <td className="w-40 text-neutral-darker text-right pr-4">
                  Policy Number
                </td>
                <td>POL1234</td>
              </tr>
              <tr>
                <td className="w-40 text-neutral-darker text-right  pr-4">
                  Customer Name
                </td>
                <td>Vignesh Nadar</td>
              </tr>
              <tr>
                <td className="w-40 text-neutral-darker text-right  pr-4">
                  Mobile Number
                </td>
                <td>998766567</td>
              </tr>
              <tr>
                <td className="w-40 text-neutral-darker text-right  pr-4">
                  Email
                </td>
                <td>vignesh@gmail.com</td>
              </tr>
              <tr>
                <td className="w-40 text-neutral-darker text-right  pr-4">
                  Plan Amount
                </td>
                <td>Rs. 259/-</td>
              </tr>
              <tr>
                <td className="w-40 text-neutral-darker text-right  pr-4">
                  Policy Start Date
                </td>
                <td>11th Jan 2024</td>
              </tr>
              <tr>
                <td className="w-40 text-neutral-darker text-right  pr-4">
                  Policy End Date
                </td>
                <td>11th Jan 2034</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center py-4 pb-8 w-96 space-x-4">
          <Button type="button" label="Go to Dashboard" variant="ghost" />
          <Button type="submit" label="Create New Policy" variant="primary" />
        </div>
      </div>
    </div>
  );
}
