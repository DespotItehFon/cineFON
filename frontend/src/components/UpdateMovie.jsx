import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateMovie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/movies/" + id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const handleSubmit = () => {
    axios
      .put(
        `http://localhost:8080/api/v1/movies`,
        {
          id: id,
          budget: document.getElementById("budget").value,
          overview: document.getElementById("overview").value,
          runtime: document.getElementById("runtime").value,
          tagline: document.getElementById("tagline").value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log("Review posted successfully:", response.data);
        navigate("/movies/" + id);
      })
      .catch((error) => {
        console.error("Error posting review:", error);
      });
  };
  return (
    <div className="update-movie">
      <div className="add-review" style={{ width: "400px", height: "450px" }}>
        <h5 style={{ textAlign: "center", color: "white" }}>{movie?.title}</h5>
        <label htmlFor="overview" style={{ color: "white" }}>
          Overview:
        </label>
        <textarea
          className="form-control"
          name="overview"
          id="overview"
          style={{ width: "340px", height: "250px", margin: "4px" }}
          placeholder={movie?.overview}
        ></textarea>
        <label htmlFor="tagline" style={{ color: "white" }}>
          Tagline:
        </label>
        <input
          type="text"
          id="tagline"
          className="form-control"
          placeholder={movie?.tagline}
          style={{ width: "300px" }}
        />
        <label htmlFor="runtime" style={{ color: "white" }}>
          Runtime:
        </label>
        <input
          type="number"
          id="runtime"
          className="form-control"
          placeholder={movie?.runtime}
          style={{ width: "300px" }}
        />
        <label htmlFor="budget" style={{ color: "white" }}>
          Budget:
        </label>
        <input
          type="number"
          id="budget"
          className="form-control"
          placeholder={movie?.budget}
          style={{ width: "300px" }}
        />

        <div></div>
        <button className="btn-login" onClick={() => handleSubmit()}>
          Update movie
        </button>
      </div>
    </div>
  );
};

export default UpdateMovie;
