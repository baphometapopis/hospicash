import React, { useCallback, useEffect, useState } from "react";
import BrandLogo from "../assets/img/brandLogo.png";
import walletClosed from "../assets/Icons/icons8-card-wallet-64.png";
import walletOpened from "../assets/Icons/icons8-wallet-64 (1).png";
import PaymentModal from "./dashboardcomponent/Modal/PaymentModal";
import { walletBalance } from "../Api/walletBalance";
import { toast } from "react-toastify";
import { decryptData } from "../Utils/cryptoUtils";
import { useNavigate } from "react-router-dom";
import UserPaymentModal from "./dashboardcomponent/Modal/UserPaymentModal.";

export default function Header({ toggle }) {
  const navigate = useNavigate();
  const [iswalletopened, setwalletopened] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isUserPaymentModalOpen, setIsUserPaymentModalOpen] = useState(false);
  const [loginData, setLoginData] = useState();
  const [availableBalance, setavailableBalance] = useState();

  const openPaymentModal = () => {
    setIsUserPaymentModalOpen(true);
  };
  function formatIndianRupees(amount) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Example usage
  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };
  const getwalletBalance = useCallback(async () => {
    const data = localStorage.getItem("LoggedInUser");
    if (data) {
      const decryptdata = decryptData(data);
      setLoginData(decryptdata);
      const balance = await walletBalance(decryptdata?.user_details?.id);
      if (balance?.status) {
        const formattedNumber = formatIndianRupees(balance?.wallet_balance);

        setavailableBalance(formattedNumber);
      } else {
        toast.error("Failed to Fetch Wallet Balance", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } else {
      navigate("/");

      toast.error("Session Expired, Login Again", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [setavailableBalance, navigate]);

  useEffect(() => {
    getwalletBalance();
  }, [getwalletBalance, iswalletopened]);

  return (
    <>
      <header className="fixed z-10 bg-white flex justify-between items-center md:sticky top-0 w-full h-12 px-6 border-b border-neutral-light">
        <div className="flex">
          <span
            onClick={toggle}
            className="material-symbols-outlined md:hidden mr-4 cursor-pointer"
          >
            menu
          </span>
          <img src={BrandLogo} alt="tvs-brand-logo" className="w-32" />
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {loginData?.user_details?.role_type === "dealer" && (
            <>
              {iswalletopened ? (
                <img
                  onClick={() => setwalletopened(!iswalletopened)}
                  src={walletClosed}
                  alt="wallet-money"
                  className="w-6"
                />
              ) : (
                <>
                  <img
                    onClick={() => setwalletopened(!iswalletopened)}
                    src={walletOpened}
                    alt="wallet-money"
                    className="w-6"
                  />
                  <p onClick={() => openPaymentModal()}>{availableBalance}</p>
                </>
              )}
            </>
          )}

          <div className="hidden md:block">
            <div className="bg-primary-lightest rounded-full h-8 w-8"></div>
          </div>
        </div>
        <PaymentModal isOpen={isPaymentModalOpen} onClose={closePaymentModal} />
        <UserPaymentModal
          isOpen={isUserPaymentModalOpen}
          onClose={closePaymentModal}
        />
      </header>
    </>
  );
}
