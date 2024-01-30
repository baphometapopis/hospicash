import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { isMobile } from "react-device-detect";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppLayout from "./AppLayout";
import Transactions from "./pages/Transactions";
import Plans from "./pages/Plans";
import FormPage from "./pages/FormPage";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import TransactionsList from "./pages/TransactionList";
import SoldPolicy from "./pages/SoldPolicy";
import PurchaseStatus from "./pages/PurchaseStatus";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="Login" />}></Route>
            <Route path="Form" element={<FormPage />}></Route>
            <Route path="transaction" element={<Transactions />}></Route>
            <Route path="soldPolicy" element={<SoldPolicy />}></Route>
            <Route path="confirmed" element={<PurchaseStatus />}></Route>

            <Route
              path="transaction_list"
              element={<TransactionsList />}
            ></Route>

            <Route path="plans" element={<Plans />}></Route>

            <Route path="home" element={<Home />}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
