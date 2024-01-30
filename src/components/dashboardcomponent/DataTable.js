// DataTable.js
import React, { useMemo } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { format, parseISO } from "date-fns";
import "./DataTable.css"; // Import the CSS file for styling

const DataTable = ({ data }) => {
  const columns = useMemo(
    () => [
      { Header: "Sr. No", accessor: "srno" },
      { Header: "Party Name", accessor: "partyName" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Transaction No", accessor: "transactionNo" },
      { Header: "IFSC Code", accessor: "ifscCode" },
      { Header: "Bank Name", accessor: "bankName" },
      { Header: "Account No", accessor: "accountNo" },
      {
        Header: "Payment Date",
        accessor: "paymentDate",
        Cell: ({ value }) => format(parseISO(value), "yyyy-MM-dd"),
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => format(parseISO(value), "yyyy-MM-dd HH:mm:ss"),
      },
    ],
    []
  );

  const defaultColumn = useMemo(() => {
    return {
      // Set up filters and any other default configurations
    };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 5 }, // Initial pagination settings, show 5 rows per page
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div>
      <div>
        <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value || undefined)}
          placeholder="Search..."
        />
      </div>
      <table {...getTableProps()} className="data-table">
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
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
          </strong>{" "}
        </span>
        <button onClick={() => pageIndex > 0 && setGlobalFilter(0)}>
          First
        </button>
        <button onClick={() => pageIndex > 0 && setGlobalFilter(pageIndex - 1)}>
          Previous
        </button>
        <button
          onClick={() =>
            pageIndex < Math.ceil(data.length / pageSize) - 1 &&
            setGlobalFilter(pageIndex + 1)
          }
        >
          Next
        </button>
        <button
          onClick={() =>
            pageIndex < Math.ceil(data.length / pageSize) - 1 &&
            setGlobalFilter(Math.ceil(data.length / pageSize) - 1)
          }
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default DataTable;
