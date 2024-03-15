import "./App.css";
import { useIdleTimer } from "react-idle-timer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import store from "./Redux/store";
import AppLayout from "./AppLayout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Transactions from "./pages/transaction/Transactions";
import Plans from "./pages/Plans";
import FormPage from "./pages/Formpage/FormPage";
import Home from "./pages/Home";
import TransactionsList from "./pages/TransactionList";
import SoldPolicy from "./pages/SoldPolicy";
import PurchaseStatus from "./pages/PurchaseStatus";
import CancelledPolicy from "./pages/CancelledPolicy";
import AdminLogin from "./pages/AdminLogin";
import MonthlyFileUpload from "./pages/FileUploadPage";
import ApprovePendingPolicy from "./pages/Admin/ApprovePendingPolicy";
import IdleModal from "./components/dashboardcomponent/Modal/IdleModal";
import { useWindowSize } from "./Utils/useWindowSize";
import { WindowSizeProvider } from "./Utils/Context/WindowSizeContext";

function App() {
  const [state, setState] = useState("Active");
  const [count, setCount] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [isIdleModalOpen, setIsIdleModalOpen] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const onIdle = () => {
    setState("Idle");
    if (isLoggedIn) {
      setIsIdleModalOpen(true);
    }
  };

  const onActive = () => {
    setState("Active");
  };

  const onAction = () => {
    setCount(count + 1);
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 600000,
    throttle: 500,
  });

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Call the handler right away so state gets updated with initial window size
    handleResize();

    console.log(windowSize);
    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures effect is only run on mount and unmount

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [getRemainingTime]);

  useEffect(() => {
    const getLocalData = () => {
      const localData = localStorage.getItem("Acemoney_Cache");
      setisLoggedIn(localData !== null);
    };
    getLocalData();
  }, [state]);

  useEffect(() => {
    const { search } = window.location;
    const urlParams = new URLSearchParams(search);
    const redirectionKey = urlParams.get("redirection_key");
    if (redirectionKey) {
      setIsRedirect(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <WindowSizeProvider>
        <BrowserRouter>
          <ToastContainer />
          <IdleModal
            isOpen={isIdleModalOpen}
            onClose={() => setIsIdleModalOpen(false)}
          />
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="login" />} />
              <Route path="Form" element={<FormPage />} />
              <Route path="transaction" element={<Transactions />} />
              <Route path="soldPolicy" element={<SoldPolicy />} />
              <Route path="confirmed" element={<PurchaseStatus />} />
              <Route path="Pending_Policy" element={<ApprovePendingPolicy />} />
              <Route path="Monthly_Policy" element={<MonthlyFileUpload />} />
              <Route path="cancelledPolicy" element={<CancelledPolicy />} />
              <Route path="transaction_list" element={<TransactionsList />} />
              <Route path="plans" element={<Plans />} />
              <Route path="home" element={<Home />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="Admin" element={<AdminLogin />} />
            {/* {!isRedirect && <Route path="*" element={<PageNotFound />} />} */}
          </Routes>
        </BrowserRouter>
      </WindowSizeProvider>
    </Provider>
  );
}

export default App;
