import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const CompanyBarChart = () => {
  const [chartData] = useState({
    series: [
      {
        name: "New India Assurance",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 55, 44, 22],
      },
      {
        name: "BHARTI ASSIST GLOBAL",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 44, 77, 22],
      },
      {
        name: "Kotak Group Accident Protect",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 55, 57, 23],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        title: {
          text: "proposal",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return " " + val + " Proposal";
          },
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={250}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default CompanyBarChart;
