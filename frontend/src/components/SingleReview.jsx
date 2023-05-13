import { Button } from "bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const SingleReview = ({ review, deleteReview, isUserPage }) => {
  const [userId, setUserId] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users/currentlyLoggedIn", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserId(response.data.id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const role = localStorage.getItem("role");
  function deleteReview(id) {
    axios.delete("http://localhost:8080/api/v1/reviews/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    window.location.reload();
  }
  function updateReview(id) {
    navigate("/updatereview/"+id);
  }

  const navigate = useNavigate();

  const handleNavigationToTheUser = (id) => {
    const newUrl = "http://localhost:3000/review/user/" + id;
    window.location.href = newUrl;
  };

  const handleNavigationToTheMovie = (id) => {
    const newUrl = "http://localhost:3000/movies/" + id;
    window.location.href = newUrl;
  };

  return (
    <div className="single-review" style={{ color: "white" }}>
  <div className="review-info">
    {isUserPage && (
      <div
        className="author"
        style={{ color: "#0a7af3" }}
        onClick={() => handleNavigationToTheMovie(review.movie.id)}
      >
        {review.movie.title}:
      </div>
    )}
    {!isUserPage && (
      <div
        className="author"
        style={{ color: "#0a7af3" }}
        onClick={() => handleNavigationToTheUser(review.author.id)}
      >
        {review.author.firstname} {review.author.lastname}:
      </div>
    )}
    {/* <div className="author" style={{color: 'green'}} onClick={() => handleNavigation(review.author.id)}>
        {review.movie.title}: 
        </div> */}
    <div className="review-content">{review.content}</div>
  </div>
  <div className="rating">Rating: {review.rating}</div>
  <div className="date" style={{ width: '200px', marginLeft: '10px  ' }}>Reviewed on: {review.date}</div>
  <div className="review-buttons">
    <div className="button-container">
      {role === "CRITIC" && review.author.id === userId && (
        <button
          className="review-btn-left"
          onClick={() => updateReview(review.id)}
        >
          Update review
        </button>
      )}
      {role === "ADMIN" ||
        (role === "CRITIC" && review.author.id === userId && (
          <button
            className="review-btn-right"
            onClick={() => deleteReview(review.id)}
          >
            Delete review
          </button>
        ))}
    </div>
  </div>
</div>


  );
};

export default SingleReview;
