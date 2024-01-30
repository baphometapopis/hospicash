import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Total Proposal", "Uploaded Proposal", "Remainning proposal"],
    datasets: [
      {
        data: [20, 15, 5],
        backgroundColor: ["#d6fffe", "#f0f8ff", "#feff7f"],
        // hoverBackgroundColor: ["darkred", "darkblue", "darkyellow"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
      },
    },
    layout: {
      // padding: {
      //   // left: 50,
      //   // right: 50,
      //   top: 0,
      //   bottom: 0,
      // },
    },
    aspectRatio: 2, // Adjust the aspect ratio to your preference
    responsive: true,
    maintainAspectRatio: true, // Set to false to enable dynamic aspect ratio
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
