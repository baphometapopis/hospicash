import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./AppLayout";
import Transactions from "./pages/Transactions";
import Plans from "./pages/Plans";
import FormPage from "./pages/FormPage";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import TransactionsList from "./pages/TransactionList";
import SoldPolicy from "./pages/SoldPolicy";
import PurchaseStatus from "./pages/PurchaseStatus";
import CancelledPolicy from "./pages/CancelledPolicy";
import { Provider } from "react-redux";
import store from "./Redux/store";

function App() {
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
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
