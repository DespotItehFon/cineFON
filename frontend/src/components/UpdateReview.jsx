import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [review, setReview] = useState();

  useEffect(() => {
    const getReviewByID = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/reviews/" + id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReview(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getReviewByID();
    console.log(review);
  }, []);
  
  const handleSubmit = () => {
    axios
      .put(
        `http://localhost:8080/api/v1/reviews`,
        {
          content: document.getElementById("content").value,
          rating: selectedValue,
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Review posted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error posting review:", error);
      });
    navigate("/movies/" + review.movie.id);
  };
  const sliderRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(1);

  const handleSliderChange = () => {
    const value = sliderRef.current.value;
    setSelectedValue(value);
  };

  return (
    <div className="add-review" style={{ width: "400px", height: "420px" }}>
      <h5 style={{ textAlign: "center", color: "white" }}>
        {review?.movie && review.movie.title}
      </h5>

      <textarea
        className="form-control"
        name="content"
        id="content"
        style={{ width: "340px", height: "250px", margin: "4px" }}
        placeholder={review?.movie && review.content}
      ></textarea>

      <input
        type="range"
        min="1"
        max="10"
        defaultValue="1"
        step="1"
        ref={sliderRef}
        onChange={handleSliderChange}
      />
      <div>
        <div style={{ color: "white" }}>Rating: {selectedValue}</div>
      </div>
      <button className="btn-login" onClick={() => handleSubmit()}>
        Post review
      </button>
    </div>
  );
};

export default UpdateReview;
