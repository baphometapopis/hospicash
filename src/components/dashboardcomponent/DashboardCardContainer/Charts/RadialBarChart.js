import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const RadialBarChart = () => {
  const totalPolicies = 5000;
  const pendingPolicies = 4000;
  const donePolicies = 1000;

  const pendingPercentage = (pendingPolicies / totalPolicies) * 100;
  const donePercentage = (donePolicies / totalPolicies) * 100;

  const [series, setSeries] = useState([pendingPercentage, donePercentage]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 390,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: -20,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
            formatter: function (val) {
              return `${val}%`;
            },
          },
        },
      },
    },
    colors: ["#FCD34D", "#0084ff"],
    labels: ["Pending", "Done"],
    legend: {
      show: true,
      floating: true,
      fontSize: "12px",
      offsetX: 200,
      offsetY: 15,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return (
          seriesName +
          ":  " +
          opts.w.globals.series[opts.seriesIndex] +
          " (" +
          (opts.w.config.series[opts.seriesIndex] / 100) * totalPolicies +
          ` / ${totalPolicies})`
        );
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  });

  return (
    <div>
      <ReactApexChart
        type="radialBar"
        height={350}
        options={chartOptions}
        series={series}
      />
    </div>
  );
};

export default RadialBarChart;
