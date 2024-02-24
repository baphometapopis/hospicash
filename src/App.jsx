import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./AppLayout";
import Transactions from "./pages/transaction/Transactions";
import Plans from "./pages/Plans";
import FormPage from "./pages/Formpage/FormPage";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import TransactionsList from "./pages/TransactionList";
import SoldPolicy from "./pages/SoldPolicy";
import PurchaseStatus from "./pages/PurchaseStatus";
import CancelledPolicy from "./pages/CancelledPolicy";
import { Provider } from "react-redux";
import store from "./Redux/store";
import AdminLogin from "./pages/AdminLogin";
import MonthlyFileUpload from "./pages/FileUploadPage";
import ApprovePendingPolicy from "./pages/Admin/ApprovePendingPolicy";
import { useEffect, useState } from "react";

function App() {
  // Check for redirection_key
  const [isRedirect, setIsRedirect] = useState(false);
  const { search } = window.location;
  const urlParams = new URLSearchParams(search);
  const redirectionKey = urlParams.get("redirection_key");

  // If redirection_key is found, redirect to Login

  useEffect(() => {
    if (redirectionKey) {
      setIsRedirect(true);
    }
  }, []);
  return (
    <>
      <Provider store={store}>
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
                path="Pending_Policy"
                element={<ApprovePendingPolicy />}
              ></Route>

              <Route
                path="Monthly_Policy"
                element={<MonthlyFileUpload />}
              ></Route>

              <Route
                path="cancelledPolicy"
                element={<CancelledPolicy />}
              ></Route>

              <Route
                path="transaction_list"
                element={<TransactionsList />}
              ></Route>

              <Route path="plans" element={<Plans />}></Route>

              <Route path="home" element={<Home />}></Route>
            </Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="Admin" element={<AdminLogin />}></Route>

            {/* {!isRedirect && <Route path="*" element={<PageNotFound />} />} */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
