import React, { useState } from "react";

import BrandLogo from "../assets/img/brandLogo.png";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../Api/loginApi";
import { encryptData } from "../Utils/cryptoUtils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { setItemToLocalStorage } from "../Utils/localStorageUtils";
import Loader from "../components/Loader";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),

  // password: Yup.string()
  //   .required("Required")
  //   .min(6, "Password must be atleast 6 characters long"),
});

export default function AdminLogin() {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleLoginApi(); // navigate("/dashboard ");
    },
  });
  const handleLoginApi = async () => {
    setLoading(true);

    try {
      const loginResponse = await login(
        formik.values.username,
        formik.values.password
      );

      if (loginResponse?.status) {
        const encryptedData = encryptData(loginResponse.data);
        console.log(loginResponse);

        // Attempt to store data in local storage
        // Check if the user is logged in after storing data
        const isSetSuccessful = setItemToLocalStorage(
          "LoggedInUser",
          encryptedData
        );

        if (isSetSuccessful) {
          toast.success(loginResponse?.message, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });

          navigation("/Home");
        }
      } else {
        console.log(loginResponse.message);

        toast.error(loginResponse?.message, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle other errors if needed
      toast.error("An error occurred during login");
    }
    setLoading(false);
  };
  return (
    <div style={{backgroundColor:'#0089D1'}} className="flex justify-center  items-center p-2 h-[100vh]">
      {loading && <Loader />}
      <div className="flex flex-col items-center">
        <div className=" bg-white border border-neutral-light rounded flex flex-col items-center w-full">
          <div>
            <img
              src={BrandLogo}
              style={{ width: "245px", padding: "20px", alignSelf: "center" }}
              alt="acemoney"
            />
          </div>
          <div className=" flex flex-col items-center  w-96 pb-8 mt-4">
            {/* <div className="flex flex-col items-center">
                <img src={BrandLogo} className="w-36" />
              </div> */}
            <p>Admin Login</p>
            <div className="mt-2">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col">
                  <label
                    htmlFor="username"
                    className="text-sm text-neutral-darker mb-0.5"
                  >
                    Username
                  </label>
                  <Input
                    {...formik.getFieldProps("username")}
                    formik={formik}
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formik.values.username}
                    removeError // Set this prop to control error visibility
                  />
                  <div className="text-danger text-xs mt-1">
                    {formik.touched.username && formik.errors.username ? (
                      <div>{formik.errors.username}</div>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col mt-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-neutral-darker mb-0.5"
                  >
                    Password
                  </label>
                  <Input
                    showError={false} // Set this prop to control error visibility
                    {...formik.getFieldProps("password")}
                    formik={formik}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    removeError
                  />
                  <div className="text-danger text-xs mt-1">
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                  </div>
                </div>
                <Button type="submit" label="Login" variant="primary"></Button>
              </form>
            </div>
          </div>
        </div>
        {/* <div className="mt-2 text-xs">
            Copyright © 2017 Indicosmic Capital Pvt. Ltd.
          </div> */}
      </div>
    </div>
  );
}
