import React from "react";

const TransactionCard = ({ transaction }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          backgroundColor: "#FCD34D",
          color: "#ffffff",
          padding: "2px",
          width: "fit-content",
          height: "fit-content",
        };
      case "approved":
        return {
          backgroundColor: "#68D391",
          color: "#ffffff",
          width: "fit-content",
          height: "fit-content",
        };
      case "concile":
        return {
          backgroundColor: "#4299E1",
          color: "#ffffff",
          width: "fit-content",
          height: "fit-content",
        };
      default:
        return {
          backgroundColor: "#D1D5DB",
          color: "#000000",
          width: "fit-content",
          height: "fit-content",
        };
    }
  };

  const statusStyle = getStatusStyle(transaction.approval_status);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="flex flex-col bg-white shadow-lg py-4 px-4 rounded-md mb-1">
      <div className="flex  md:flex-row md:justify-between item-center w-full">
        <span style={{ width: "5%", textAlign: "center" }}>
          {transaction.id}
        </span>

        <span
          style={{
            textAlign: "center",
            width: "30%",
          }}
        >
          {transaction.bank_transaction_no}
        </span>

        <span style={{ textAlign: "center", width: "10%" }}>
          {transaction.account_type}
        </span>

        <span
          style={{
            textAlign: "center",
            width: "10%",
          }}
        >
          ₹{transaction.deposit_amount}
        </span>

        <span className="px-4 rounded-lg" style={statusStyle}>
          {transaction.approval_status}
        </span>

        <span
          style={{
            textAlign: "center",
            width: "15%",
          }}
        >
          {transaction.transaction_type}
        </span>

        <span
          style={{
            textAlign: "center",
            width: "20%",
          }}
        >
          {" "}
          {formatDate(transaction.created_date)}
        </span>
      </div>
    </div>
  );
};

export default TransactionCard;
