// MyTable.js
import React from "react";
import { useTable } from "react-table";

const DataGridExample = () => {
  const data = [
    {
      id: 1,
      name: "The Oriental Insurance",
      amount: 30000,
      transaction_no:
        "INF/NEFT/030742517151/KKBK0000172/THE ORIENTAL Muthoot/THE ORIENTAL IN",
      ifsc_code: "ICIC0000544",
      bank_name: "ICICI BANK",
      account_no: "054405007965",
      payment_date: "2023-01-09 00:00:00",
      created_at: "2023-01-10 12:31:20",
    },
    {
      id: 2,
      name: "The Oriental Insurance",
      amount: 30000,
      transaction_no:
        "INF/NEFT/030742517331/KKBK0000172/THE ORIENTAL Muthoot/THE ORIENTAL IN",
      ifsc_code: "ICIC0000544",
      bank_name: "ICICI BANK",
      account_no: "054405007965",
      payment_date: "2023-01-09 00:00:00",
      created_at: "2023-01-10 12:31:42",
    },
    {
      id: 3,
      name: "The Oriental Insurance",
      amount: 30000,
      transaction_no:
        "INF/NEFT/030761648121/KKBK0000172/THE ORIENTAL Muthoot/THE ORIENTAL IN",
      ifsc_code: "ICIC0000544",
      bank_name: "ICICI BANK",
      account_no: "054405007965",
      payment_date: "2023-01-11 00:00:00",
      created_at: "2023-01-11 05:42:16",
    },
    {
      id: 4,
      name: "The Oriental Insurance",
      amount: 30000,
      transaction_no:
        "INF/NEFT/030776125791/KKBK0000172/THE ORIENTAL Muthoot/THE ORIENTAL IN",
      ifsc_code: "ICIC0000544",
      bank_name: "ICICI BANK",
      account_no: "054405007965",
      payment_date: "2023-01-12 00:00:00",
      created_at: "2023-01-12 06:21:44",
    },
    {
      id: 5,
      name: "The Oriental Insurance",
      amount: 30000,
      transaction_no:
        "INF/NEFT/030789681881/KKBK0000172/THE ORIENTAL Muthoot/THE ORIENTAL IN",
      ifsc_code: "ICIC0000544",
      bank_name: "ICICI BANK",
      account_no: "054405007965",
      payment_date: "2023-01-13 00:00:00",
      created_at: "2023-01-13 05:45:51",
    },
    {
      id: 6,
      name: "The Oriental Insurance",
      amount: 30000,
      transaction_no:
        "INF/NEFT/030851324131/KKBK0000172/THE ORIENTAL Muthoot/THE ORIENTAL IN",
      ifsc_code: "ICIC0000544",
      bank_name: "ICICI BANK",
      account_no: "054405007965",
      payment_date: "2023-01-19 00:00:00",
      created_at: "2023-01-19 11:03:13",
    },
    {
      id: 7,
      name: "The Oriental Insurance",
      amount: 30000,
      transaction_no:
        "INF/NEFT/030874951601/KKBK0000172/THE ORIENTAL Muthoot/THE ORIENTAL IN",
      ifsc_code: "ICIC0000544",
      bank_name: "ICICI BANK",
      account_no: "054405007965",
      payment_date: "2023-01-21 00:00:00",
      created_at: "2023-01-21 06:21:37",
    },
    {
      id: 8,
      name: "The Oriental Insurance",
      amount: 30000,
      transaction_no:
        "INF/NEFT/030891221291/KKBK0000172/THE ORIENTAL Muthoot/THE ORIENTAL IN",
      ifsc_code: "ICIC0000544",
      bank_name: "ICICI BANK",
      account_no: "054405007965",
      payment_date: "2023-01-23 00:00:00",
      created_at: "2023-01-27 10:09:47",
    },
    {
      id: 9,
      name: "The Oriental Insurance",
      amount: 30000,
      transaction_no:
        "INF/NEFT/030907932871/KKBK0000172/THE ORIENTAL Muthoot/THE ORIENTAL IN",
      ifsc_code: "ICIC0000544",
      bank_name: "ICICI BANK",
      account_no: "054405007965",
      payment_date: "2023-01-24 00:00:00",
      created_at: "2023-01-27 10:11:07",
    },
    {
      id: 10,
      name: "The Oriental Insurance",
      amount: 30000,
      transaction_no:
        "INF/NEFT/030932120051/KKBK0000172/THE ORIENTAL Muthoot/THE ORIENTAL IN",
      ifsc_code: "ICIC0000544",
      bank_name: "ICICI BANK",
      account_no: "054405007965",
      payment_date: "2023-01-27 00:00:00",
      created_at: "2023-01-27 10:12:11",
    },
  ];
  const columns = [
    { Header: "ID", accessor: "id" },
    {
      Header: "Dealer Name",
      accessor: "name",
    },
    {
      Header: "Transaction No",
      accessor: "transaction_no",
    },
    {
      Header: "Plan Name",
      accessor: "account_no",
    },
    {
      Header: "Bank Name",
      accessor: "bank_name",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Payment Date",
      accessor: "payment_date",
    },
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataGridExample;
