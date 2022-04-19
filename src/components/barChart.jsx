import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

function BarChart({ chartData }) {
  const [dataState, setDataState] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: "#0000",
        borderColor: "#0000",
      },
    ],
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Terms",
      },
    },
  };

  const createData = (data) => {
    const labels = [];
    const myData = [];
    const colors = [];
    for (let term in data) {
      labels.push(term);
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      myData.push(data[term]);
      colors.push(color);
    }
    const myChardData = {
      labels,
      datasets: [
        {
          data: myData,
          backgroundColor: colors,
          borderColor: colors,
        },
      ],
    };

    setDataState(myChardData);
  };

  useEffect(() => {
    createData(chartData);
  }, [chartData]);

  return (
    <div>
      <Bar data={dataState} options={options} />
    </div>
  );
}

export default BarChart;
