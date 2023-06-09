import axios from "axios";
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
import React, { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ movieID }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const getChartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/movies/" + movieID + "/statistics",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const labels = Object.keys(response.data);
        const counts = Object.values(response.data);
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Ratings",
              data: counts,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.4)",
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };

    getChartData();
  }, []);
  return (
    <div
      className="chart-container"
      style={{ width: "300px", height: "300px", marginLeft: "20px" }}
    >
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
};

export default BarChart;
