import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SingleReview from "./SingleReview";
import CreateReview from "./CreateReview";
import { Chart } from "chart.js";
import BarChart from "./BarChar";

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [reviewID, setReviewID] = useState(0);
  const [reviews, setReviews] = useState([]);
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
        setDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const isReviewed = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/reviews/movie/" + id + "/isReviewed",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setReviewID(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    isReviewed();
    fetchData();
  }, [reviews]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/reviews/movie/" + id,
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

    fetchData();
  });

  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  function addToWatchlist() {
    axios
      .post(`http://localhost:8080/api/v1/watchlist/movie/` + id, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Review posted successfully:", response.data);
        setAddReviewSwitch(true);
      })
      .catch((error) => {
        console.error("Error posting review:", error);
      });
    window.location.reload();
  }

  const [addReviewSwitch, setAddReviewSwitch] = useState(true);

  const [isInMyWatchlist, setIsInMyWatchlist] = useState(false);

  const removeFromWatchlist = useCallback(() => {
    axios
      .delete("http://localhost:8080/api/v1/watchlist/movie/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    window.location.reload();
  }, [id]);

  useEffect(() => {
    const checkIsInWatchlist = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/watchlist/movie/" + id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setIsInMyWatchlist(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    checkIsInWatchlist();
  }, [id, removeFromWatchlist]);

  function updateReview(id) {
    navigate("/updatereview/" + id);
  }

  return (
    <>
      {addReviewSwitch && (
        <div className="movie-details" style={{ color: "#5a7795" }}>
          <div
            className="title"
            style={{
              width: "1280px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>{details.title}</h1>
            {userRole === "CRITIC" && reviewID === -1 && (
              <button
                className="movie-btn"
                style={{ width: "300px" }}
                onClick={() => setAddReviewSwitch(!addReviewSwitch)}
              >
                Create review
              </button>
            )}
            {userRole === "CRITIC" && !(reviewID === -1) && (
              <button
                className="movie-btn"
                style={{ width: "300px" }}
                onClick={() => updateReview(reviewID)}
              >
                Update review
              </button>
            )}
            {userRole === "USER" && !isInMyWatchlist && (
              <button
                className="movie-btn"
                style={{ width: "300px" }}
                onClick={() => addToWatchlist()}
              >
                Add to watchlist
              </button>
            )}
            {userRole === "USER" && isInMyWatchlist && (
              <button
                className="movie-btn"
                style={{ width: "300px" }}
                onClick={() => removeFromWatchlist()}
              >
                Remove from watchlist
              </button>
            )}
          </div>

          <div
            className="backdrop"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${details.backdrop_path})`,
            }}
          />
          <h5 style={{ width: "1280px" }}>{details.overview}</h5>
          <div className="details">
            <div className="details-box">
              <h5>Genres: </h5>
              <div className="genre-container" style={{ display: "flex" }}>
                {details.genres &&
                  details.genres.map((genre) => (
                    <div
                      className="genre"
                      style={{ marginRight: "10px" }}
                      onClick={() => navigate(`/genre/${genre.id}`)}
                    >
                      {genre.name}
                    </div>
                  ))}
              </div>
            </div>
            <div className="details-box">
              <h5>Release date: </h5>
              {details.release_date}
            </div>
            <div className="details-box">
              <h5>Tagline: </h5>
              {details.tagline}
            </div>
            <div className="details-box">
              <h5>Homepage: </h5>
              <a href={details.homepage}>{details.homepage}</a>
            </div>
            <div className="details-box">
              <h5>Budget: </h5>${details.budget}
            </div>
            <div className="details-box">
              <h5>Runtime: </h5>
              {details.runtime}
            </div>
          </div>

          <h2>Cast</h2>
          <div
            className="actors"
            style={{
              width: "1280px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "40px",
              marginLeft: "30px",
            }}
          >
            {details.cast &&
              details.cast.map((actor) => (
                <div className="actor-movie">
                  <div
                    className="circle-actor"
                    onClick={() => navigate(`/actors/${actor.id}`)}
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${actor.profile_path})`,
                    }}
                  />
                  <div className="actor-name">{actor.name}</div>
                </div>
              ))}
          </div>

          <h2>Crew</h2>
          <div
            className="actors"
            style={{
              width: "1280px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "40px",
              marginLeft: "30px",
            }}
          >
            {details.crew &&
              details.crew.map((member) => (
                <div className="actor-movie">
                  <div
                    className="circle-actor"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${member.profile_path})`,
                    }}
                  />
                  <div className="actor-name">{member.name}</div>
                </div>
              ))}
          </div>

          <div className="movies-reviews-bar">
            <div style={{ marginLeft: "20px", marginTop: "20px" }}>
              <h2>Reviews</h2>
              {reviews &&
                reviews.map((review) => <SingleReview review={review} />)}
              {reviews.length === 0 && (
                <h4 style={{ width: "600px", marginLeft: "20px" }}>
                  No reviews available yet. Check back later for updates!
                </h4>
              )}
            </div>
            <BarChart movieID={id} />
          </div>
        </div>
      )}
      {!addReviewSwitch && (
        <CreateReview
          details={details}
          setAddReviewSwitch={setAddReviewSwitch}
          onReviewPosted={() => setAddReviewSwitch(true)}
        />
      )}
    </>
  );
};

export default MovieDetails;
