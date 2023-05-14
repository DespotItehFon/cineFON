import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateReview = ({ details, setAddReviewSwitch, onReviewPosted }) => {
  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:8080/api/v1/reviews`,
        {
          content: document.getElementById("content").value,
          rating: selectedValue,
          movie: {
            id: details.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log("Review posted successfully:", response.data);
        onReviewPosted();
      })
      .catch((error) => {
        console.error("Error posting review:", error);
        onReviewPosted();
      });
  };
  const sliderRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(1);

  const handleSliderChange = () => {
    const value = sliderRef.current.value;
    setSelectedValue(value);
  };

  return (
    <div className="add-review" style={{ width: "400px", height: "420px" }}>
      <h5 style={{ textAlign: "center", color: "white" }}>{details.title}</h5>

      <textarea
        className="form-control"
        name="content"
        id="content"
        style={{ width: "340px", height: "250px", margin: "4px" }}
        placeholder="Content"
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

export default CreateReview;
