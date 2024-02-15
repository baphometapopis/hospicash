import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const DateTimeChart = ({ data }) => {
  const [monthCount, setMonthCount] = useState({});

  useEffect(() => {
    const sampleData = {
      monthCount: {
        January: 12,
        Feb: 10,
        March: 45,
        April: 40,
        May: 75,
        June: 19,
        July: 3,
        August: 2,
        September: 6,
        October: 2,
        November: 72,
        December: 100,
      },
    };

    // Set the month count state for further use
    setMonthCount(sampleData.monthCount);
  }, [data]);

  const mixedChartOptions = {
    chart: {
      height: 400,
      type: "line",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    stroke: {
      width: [0, 2],
    },
    xaxis: {
      categories: Object.keys(monthCount),
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#008FFB",
        },
        labels: {
          style: {
            colors: "#008FFB",
          },
        },
        title: {
          text: "Number of Records",
          style: {
            color: "#008FFB",
          },
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      labels: {
        colors: "#008FFB",
      },
    },
  };

  const mixedChartData = [
    {
      name: "Records Count",
      type: "column",
      data: Object.values(monthCount),
    },
    {
      name: "Records Count (Line)",
      type: "line",
      data: Object.values(monthCount),
    },
  ];

  return (
    <div>
      <ApexCharts
        options={mixedChartOptions}
        series={mixedChartData}
        type="line"
        height={250}
      />
    </div>
  );
};

export default DateTimeChart;
