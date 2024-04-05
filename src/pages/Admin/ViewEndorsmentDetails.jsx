/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import coverImage from "../../assets/img/hospicashcoverimage.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getEndorsementDetails,
  updateEndorsmentStatus,
} from "../../Api/adminAPi/getEndorsmentPendingList";
import CustomSelect from "../../components/ui/CustomSelect";
import { Select } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewImageModal from "../../components/dashboardcomponent/Modal/ViewImageModal";
import { get_policy_data } from "../../Api/getFormData";
export default function ViewEndorsmentDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [previousEndorsementData, setPreviousEndorsementData] = useState({});
  const [updatedEndorsementData, setUpdatedEndorsementData] = useState({});
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [Salutation, setSalutation] = useState("");
  const [Gender, setGender] = useState("");
  const [Relation, setRelation] = useState("");

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const getFormData = async () => {
    const data = await get_policy_data();
    if (data?.status) {
      setSalutation(data?.salutation_data);
      setGender(data?.genders_data);
      setRelation(data?.nominee_relation_data);
    }
  };

  // Function to open the modal
  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  // Function to close the modal
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const StatusOptions = [
    { value: "reject", label: "Reject" },
    { value: "approved", label: "Approved" },
  ];

  function filterArrayByParam(array, paramName, paramId) {
    const data = array?.filter((item) => item[paramName] == paramId);
    return data[0];
  }

  const getEndorsementData = async () => {
    const res = await getEndorsementDetails(
      location.state?.selectedID?.endorsement_id
    );
    setPreviousEndorsementData(res?.endorsement_data?.user_details[0] || {});
    setUpdatedEndorsementData(
      res?.endorsement_data?.updated_user_details[0] || {}
    );
    getFormData();
  };
  const handleChangeStatus = async () => {
    if (!selectedStatus) {
      alert("Please select a status.");
      return;
    }

    if (!remarks) {
      alert("Please provide remarks.");
      return;
    }

    const res = await updateEndorsmentStatus(
      location.state?.selectedID?.endorsement_id,
      selectedStatus,
      remarks
    );
    if (res?.status) {
      console.log("jhgfhg");
      navigate("/Endorsement_list");
      toast.success(res?.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      toast.error(res?.message, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  useEffect(() => {
    getEndorsementData();
  }, []);

  const previousKeyMapping = {
    email: "Email ",
    mobile_no: "Mobile No",
    addr1: "Address 1",
    addr2: "Address 2",
    pincode: "Pincode ",
    cityName: "City Name",
    StateName: "State",
    nominee_full_name: "Nominee Name",
    nominee_age: "Nominee Age",
    nominee_relation: "Nominee Relation",
    appointee_name: "Appointee Name",
    appointee_age: "Appointee Age",
    appointee_relation: "Appointee Relation",
    fname: "First Name",
    lname: "Last Name",
    salutation: "Salutation",
    mname: "Middle Name",
    endorsement_no: "Endorsment No",
    pan_card_no: "Pan Card",
    gender: "Gender",
    endorsement_document: "Uploaded Document",
    endorsement_filed: "Endorsement Field",
  };

  // Mapping of old keys to new keys for updated endorsement data
  const updatedKeyMapping = {
    email: "Email ",
    mobile_no: "Mobile No",
    addr1: "Address 1",
    addr2: "Address 2",
    pincode: "Pincode ",
    cityName: "City Name",
    StateName: "State",
    nominee_full_name: "Nominee Name",
    nominee_age: "Nominee Age",
    nominee_relation: "Nominee Relation",
    appointee_name: "Appointee Name",
    appointee_age: "Appointee Age",
    appointee_relation: "Appointee Relation",
    fname: "First Name",
    lname: "Last Name",
    salutation: "Salutation",
    mname: "Middle Name",
    endorsement_no: "Endorsment No",
    pan_card_no: "Pan Card",
    gender: "Gender",
    endorsement_document: "Uploaded Document",
    endorsement_filed: "Endorsement Field",
  };

  // Fields to exclude from rendering
  const excludedFields = ["dealer_id", "policy_id", "endorsement_filed"];

  const renderPreviousEndorsementData = () => {
    return Object.entries(previousEndorsementData)
      .filter(([key, value]) => !excludedFields.includes(key))
      .map(([key, value]) => {
        // Check if key exists in previousKeyMapping, use the new key if it does, else use the original key
        const mappedKey = previousKeyMapping[key] || key;
        if (key === "gender") {
          return (
            <p key={key} className="my-2">
              <span className="inline-block w-36">{mappedKey}:</span>{" "}
              {Salutation && filterArrayByParam(Gender, "id", value)?.name}
            </p>
          );
        }
        if (key === "salutation") {
          return (
            <p key={key} className="my-2">
              <span className="inline-block w-36">{mappedKey}:</span>{" "}
              {Salutation && filterArrayByParam(Salutation, "id", value)?.name}
            </p>
          );
        }
        if (key === "nominee_relation" || key === "appointee_relation") {
          return (
            <p key={key} className="my-2">
              <span className="inline-block w-36">{mappedKey}:</span>{" "}
              {Salutation && filterArrayByParam(Relation, "id", value)?.name}
            </p>
          );
        }
        return (
          <p key={key} className="my-2">
            <span className="inline-block w-36">{mappedKey}:</span>{" "}
            <span>{value}</span>
          </p>
        );
      });
  };

  const renderEndorsedFields = () => {
    // Split the string into an array
    const endorsedFields = updatedEndorsementData.endorsement_filed
      ? updatedEndorsementData.endorsement_filed.split(",")
      : [];

    return endorsedFields.map((field) => {
      return (
        <span
          key={field}
          className="inline-block bg-primary-lightest  rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2"
        >
          {previousKeyMapping[field]}
        </span>
      );
    });
  };

  const renderUpdatedEndorsementData = () => {
    return Object.entries(updatedEndorsementData)
      .filter(([key, value]) => !excludedFields.includes(key))
      .map(([key, value]) => {
        // Check if key exists in updatedKeyMapping, use the new key if it does, else use the original key
        const mappedKey = updatedKeyMapping[key] || key;

        // Special handling for endorsement_document key
        if (key === "endorsement_document") {
          return (
            <p key={key} className="my-2">
              <span className="inline-block w-36">{mappedKey}:</span>{" "}
              <span>
                <button onClick={openImageModal}>View Document</button>
              </span>
              {isImageModalOpen && (
                <ViewImageModal
                  documentUrl={value} // Pass the document URL to the modal
                  closeModal={closeImageModal} // Pass the closeModal function to the modal
                />
              )}
            </p>
          );
        }

        if (key === "gender") {
          return (
            <p key={key} className="my-2">
              <span className="inline-block w-36">{mappedKey}:</span>{" "}
              {Salutation && filterArrayByParam(Gender, "id", value)?.name}
            </p>
          );
        }
        if (key === "salutation") {
          return (
            <p key={key} className="my-2">
              <span className="inline-block w-36">{mappedKey}:</span>{" "}
              {Salutation && filterArrayByParam(Salutation, "id", value)?.name}
            </p>
          );
        }
        if (key === "nominee_relation" || key === "appointee_relation") {
          return (
            <p key={key} className="my-2">
              <span className="inline-block w-36">{mappedKey}:</span>{" "}
              {Salutation && filterArrayByParam(Relation, "id", value)?.name}
            </p>
          );
        }

        return (
          <p key={key} className="my-2">
            <span className="inline-block w-36">{mappedKey}:</span>{" "}
            <span>{value}</span>
          </p>
        );
      });
  };

  return (
    <>
      <div className="flex flex-col w-full items-center overflow-auto">
        <div className=" -z-10 top-12 w-full">
          <img
            src={coverImage}
            className="w-full h-36 object-cover"
            alt="cover_image"
          />
        </div>
        <div className="flex flex-col md:flex-row w-full justify-center">
          <div className="mx-6  bg-white h-full -mt-20 border border-neutral-light rounded mb-20 md:w-2/4">
            <div className="bg-base-white h-24 border-b border-neutral-light rounded-t p-4">
              <p className="text-2xl">Endorsement Details</p>
            </div>
            {/* Display previous and updated endorsement data */}
            {/* {renderEndorsedFields()} */}

            <div className="p-4">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                className="p-4"
              >
                <div className="w-1/2">
                  <p className="text-lg font-bold text-center">
                    Previous Details
                  </p>
                  {Object.keys(previousEndorsementData).length === 0 ? (
                    <p>No previous data available</p>
                  ) : (
                    renderPreviousEndorsementData()
                  )}
                </div>
                {/* Display updated endorsement data */}
                <div className="w-1/2">
                  <p className="text-lg font-bold text-center">
                    Updated Details
                  </p>
                  {Object.keys(updatedEndorsementData).length === 0 ? (
                    <p>No updated data available</p>
                  ) : (
                    renderUpdatedEndorsementData()
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <p>Select Status</p>
                <Select
                  options={StatusOptions}
                  placeholder="Select Status"
                  onChange={(value) => setSelectedStatus(value)}
                  value={selectedStatus}
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      zIndex: 9999,
                    }),
                    control: (provided) => ({
                      ...provided,
                      width: "100%",
                      outline: "none",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      color: "#0089d1",
                    }),
                  }}
                />

                <div className="mt-4">
                  <label
                    htmlFor="comments"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Remarks
                  </label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    rows="3"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  className="bg-primary text-white text-center p-2 rounded m-2 cursor-pointer"
                  onClick={handleChangeStatus}
                >
                  Change Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
