import React from "react";

const BankTransactionCard = ({ transaction }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          backgroundColor: "#FCD34D",
          color: "#ffffff",
        };
      case "approved":
        return {
          backgroundColor: "#68D391",
          color: "#ffffff",
        };
      case "concile":
        return {
          backgroundColor: "#4299E1",
          color: "#ffffff",
        };
      default:
        return {
          backgroundColor: "#D1D5DB",
          color: "#000000",
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
    <div className="bg-white shadow-lg py-4 px-4 rounded-md mb-1 overflow-hidden">
      <table className="w-full">
        <tbody>
          <tr>
            <td
              style={{
                width: "20px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {transaction.id}
            </td>
            <td
              style={{
                width: "120px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {" "}
              {transaction.name}
            </td>
            <td
              style={{
                width: "200px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {" "}
              {transaction.transaction_no}
            </td>
            <td
              style={{
                width: "20px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {" "}
              ₹{transaction.amount}
            </td>
            <td
              style={{
                width: "20px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {" "}
              {transaction.account_no}
            </td>
            <td
              style={{
                width: "20px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {" "}
              {transaction.bank_name}
            </td>
            <td
              style={{
                width: "20px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {" "}
              {transaction.ifsc_code}
            </td>
            <td
              style={{
                width: "20px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {" "}
              {formatDate(transaction.payment_date)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BankTransactionCard;
