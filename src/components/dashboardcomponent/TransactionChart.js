import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const LineChart = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const datasetLabel = "Dataset 2";
  const data = labels.map(() => faker.number.int({ min: 0, max: 1000 }));

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Set to false to enable dynamic aspect ratio
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        // text: "Chart.js Line Chart",
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: datasetLabel,
        data,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div style={{ width: "80%", height: "200px" }}>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default LineChart;
