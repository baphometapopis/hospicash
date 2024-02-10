import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import cloud from "../../assets/img/uploadcloud.jpeg";
import * as XLSX from "xlsx";

export const MyDropzoneComponent = ({ onFileSelect }) => {
  const [rows, setnumberofRows] = useState();

  const handleFile = (file) => {
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      const dataArray = data.split("\n"); // Split CSV data by newline to get rows
      const numberOfRows = dataArray.length - 1; // Exclude header row

      console.log("Number of rows:", numberOfRows);
      setnumberofRows(numberOfRows);
    };

    reader.readAsBinaryString(file);
    onFileSelect(file); // Invoke the callback with the selected file
  };

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      accept: {
        "application/vnd.ms-excel": [".xls"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
        "text/csv": [".csv"],
      },
      onDrop: (acceptedFiles) => {
        // Handle dropped files
        console.log(acceptedFiles);

        // Read and parse each dropped file
        acceptedFiles.forEach((file) => {
          handleFile(file);
        });
      },
    });

  return (
    <div
      style={{
        border: "3px dashed  #CECECE      ",
        margin: "10px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""}`}
    >
      {rows && (
        <p
          style={{
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {rows}-Records Found
        </p>
      )}
      <input {...getInputProps()} />
      <img
        src={cloud}
        alt="Cloud_logo"
        className="w-28"
        style={{ alignSelf: "center" }}
      />
      {acceptedFiles.length === 0 && (
        <p
          style={{
            fontSize: "12px",
            alignSelf: "center",
            whiteSpace: "nowrap",
            padding: "12px",
          }}
        >
          (Only *.xls ,*.xlsx will be accepted)
        </p>
      )}
      {acceptedFiles.length > 0 && (
        <div>
          <ul>
            {acceptedFiles.map((file) => (
              <li
                style={{
                  fontSize: "12px",
                  alignSelf: "center",
                }}
                key={file.path}
              >
                {file.path} - {file.size} bytes
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
