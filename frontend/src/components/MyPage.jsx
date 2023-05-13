import axios from "axios";
import { useEffect, useState } from "react";
import SingleReview from "./SingleReview";
import Movie from "./Movie";
import { useParams, useNavigate } from "react-router-dom";

const MyPage = () => {
  const role = localStorage.getItem("role");
  const [reviews, setReviews] = useState();
  const [watchlist, setWatchlist] = useState();
  const [user, setUser] = useState();
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users/currentlyLoggedIn", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserId(response.data.id);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchDataReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/reviews/user/" + userId,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReviews(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataWatchlist = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/watchlist/user/" + userId,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setWatchlist(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataReviews();
    fetchDataWatchlist();

  }, [userId]);
  
  let isUserPage = false;
  const url = window.location.href;
  
  if (url.includes("movie")) {
    isUserPage = false;
  } else {
    isUserPage = true;
  }

  return (
    <div className="user-page">
      {user && (
        <h1 style={{ color: "white", marginBottom: "40px" }}>
          {user.firstname} {user.lastname}
        </h1>
      )}
      {role === "USER" && (
        <h1 style={{ color: "white", marginLeft: "100px", marginBottom: "40px" }}>My watchlist</h1>
      )}
      {role === "CRITIC" && (
        <h1 style={{ color: "white", marginLeft: "100px", marginBottom: "40px" }}>My reviews</h1>
      )}
      <div className="movies-page">
        {role === "USER" &&
          watchlist &&
          watchlist.movies &&
          watchlist.movies.map((movie) => <Movie movie={movie} />)}
      </div>
      <div style={{ paddingLeft: "28%" }}>
        {role === "CRITIC" &&
          reviews &&
          reviews.map((review) => (
            <SingleReview review={review} isUserPage={isUserPage} />
          ))}
      </div>
    </div>
  );
};

export default MyPage;
