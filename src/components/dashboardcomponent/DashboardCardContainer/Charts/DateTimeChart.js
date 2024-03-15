import React, { useContext, useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import WindowSizeContext from "../../../../Utils/Context/WindowSizeContext";
import { getDefaultMonthCount } from "../../../../Utils/getMonthname";

const DateTimeChart = ({ data }) => {
  const [monthCount, setMonthCount] = useState(data ?? getDefaultMonthCount());

  useEffect(() => {
    if (data) {
      setMonthCount(data);
    } else {
      setMonthCount(getDefaultMonthCount());
    }
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
      name: "Month wise Policy Count",
      type: "column",
      data: Object.values(monthCount),
    },
    {
      name: "Month wise Policy Count(Line)",
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
