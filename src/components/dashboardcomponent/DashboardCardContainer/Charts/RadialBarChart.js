import React, { useContext, useState } from "react";
import ReactApexChart from "react-apexcharts";
import WindowSizeContext from "../../../../Utils/Context/WindowSizeContext";

const RadialBarChart = (data) => {
  // console.log(data,'RadialBarChart');
  const windowSize = useContext(WindowSizeContext);

  const totalPolicies = 5000;
  const pendingPolicies = 4000;
  const donePolicies = 1000;

  const [series] = useState([pendingPolicies, donePolicies]);

  const [chartOptions] = useState({
    chart: {
      height: 390,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 20,
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
      fontSize: "11px",
      offsetX: windowSize.width > 1345 ? 200 : 150,
      offsetY: 35,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        // return (
        //   seriesName +
        //   ":  " +
        //   opts.w.globals.series[opts.seriesIndex] +
        //   " (" +
        //   (opts.w.config.series[opts.seriesIndex] / 100) * totalPolicies +
        //   ` / ${totalPolicies})`
        // );
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
        height={300}
        options={chartOptions}
        series={series}
      />
    </div>
  );
};

export default RadialBarChart;
