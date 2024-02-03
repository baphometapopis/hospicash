import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const DateTimeChart = ({ data }) => {
  const [monthCount, setMonthCount] = useState({});

  useEffect(() => {
    const countline = {
      monthCount: {
        "Jul 2019": 3,
        "Oct 2019": 2,
        "Nov 2019": 4,
        "Dec 2019": 4,
        "Jan 2020": 7,
        "Jul 2020": 19,
        "Sep 2020": 3,
        "Oct 2020": 2,
        "Jan 2021": 6,
        "Sep 2022": 2,
        "Feb 2024": 72,
      },
      totalRecords: 124,
    };

    const sampleData = {
      monthCount: {
        "Jul 2019": 25,
        "Oct 2019": 20,
        "Nov 2019": 4,
        "Dec 2019": 4,
        "Jan 2020": 15,
        "Jul 2020": 19,
        "Sep 2020": 3,
        "Oct 2020": 1,
        "Jan 2021": 6,
        "Sep 2022": 2,
        "Feb 2024": 7,
      },
      totalRecords: 124,
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
