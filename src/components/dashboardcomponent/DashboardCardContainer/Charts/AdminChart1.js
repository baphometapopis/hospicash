import React from "react";
import ReactApexChart from "react-apexcharts";

const SparklineChart = ({ title }) => {
  const sparklineData = [10, 20, 30, 20, 10, 20, 30, 40, 50, 60, 70];

  const options = {
    series: [
      {
        data: sparklineData,
      },
    ],
    chart: {
      type: "area",
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
    },
    colors: ["#0089d1"],
    title: {
      text: "45",
      offsetX: 0,
      style: {
        fontSize: "24px",
      },
    },
    subtitle: {
      text: title,
      offsetX: 0,
      style: {
        fontSize: "14px",
      },
    },
  };

  return (
    <div id="chart-spark1" className="p-2">
      <ReactApexChart
        options={options}
        series={options.series}
        type="area"
        height={150}
      />
    </div>
  );
};

export default SparklineChart;
