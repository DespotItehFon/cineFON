// import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import SingleReview from './SingleReview'
import CreateReview from "./CreateReview";
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

const BarChart = ( { movieID } ) => {
    const [chartData, setChartData] = useState({
        datasets: [],
      });
     
      const [chartOptions, setChartOptions] = useState({});
      useEffect(() => {
        const getChartData = async () => {
            setChartData({
              '1': 0,
              '2': 0,
              '3': 0,
              '4': 0,
              '5': 1,
              '6': 2,
              '7': 4,
              '8': 1,
              '9': 12,
              '10': 13
            });
            // try {
            //   const response = await axios.get('http://localhost:8080/api/v1/movies/' + id + "/statistics", {
            //     headers: {
            //       Authorization: `Bearer ${localStorage.getItem('token')}`
            //     }
            //   });
            //   // setMovies(response.data.content)
            // //   setMovies(response.data.content.filter((m) => (m.id<200)));
            // //   movieDetails = response.data;
            //   setChartData(response);
            // //   console.log(movieDetails.data)
            // } catch (error) {
            //   console.error(error);
            // }
          };
    
          getChartData();
      }, [])
     
      useEffect(() => {
        const getChartData = async () => {
            // setChartData({
            //   '1': 0,
            //   '2': 0,
            //   '3': 0,
            //   '4': 0,
            //   '5': 1,
            //   '6': 2,
            //   '7': 4,
            //   '8': 1,
            //   '9': 12,
            //   '10': 13
            // });
            try {
              const response = await axios.get('http://localhost:8080/api/v1/movies/' + movieID + "/statistics", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              });
              const labels = Object.keys(response.data);
                const counts = Object.values(response.data);
              setChartData({
                // labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                labels: labels,
                datasets: [
                  {
                    label: "Ratings",
                    // data: [3, 3, 3, 3, 3, 3, 3, 6, 7, 15],
                    data: counts,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.4)",
                  },
                ],
              });
              setChartOptions({
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Ratings",
                  },
                },
              });
            } catch (error) {
              console.error(error);
            }
          };
    
          getChartData();
      }, []);
    return (
        <div className="chart-container" style={{width: '300px', height: '300px', marginLeft: '20px'}}>
        <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <Bar options={chartOptions} data={chartData} />
        </div>
    );
}
 
export default BarChart;