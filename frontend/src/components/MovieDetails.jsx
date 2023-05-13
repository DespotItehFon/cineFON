import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import SingleReview from './SingleReview'
import CreateReview from "./CreateReview";

const MovieDetails = () => {
    const { id } = useParams();
    // let movieDetails;
    const [details, setDetails] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/movies/' + id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          // setMovies(response.data.content)
        //   setMovies(response.data.content.filter((m) => (m.id<200)));
        //   movieDetails = response.data;
          setDetails(response.data)
        //   console.log(movieDetails.data)
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
      console.log(details)
    }, []);

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/reviews/movie/' + id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          // setMovies(response.data.content)
        //   setMovies(response.data.content.filter((m) => (m.id<200)));
        //   movieDetails = response.data;
          setReviews(response.data.content)
        //   console.log(movieDetails.data)
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
      console.log(reviews)
    }, []);
    console.log(reviews)

    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');
    // console.log(reviews)
    // const userID = localStorage.getItem('token');

    function addToWatchlist(){
      axios
      .post(`http://localhost:8080/api/v1/watchlist/movie/`+id, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log('Review posted successfully:', response.data);
        setAddReviewSwitch(true)
        // Perform any necessary actions after successful review submission

        // Redirect to the movie details page
        // navigate(`/movies/${movieId}`);
      })
      .catch(error => {
        console.error('Error posting review:', error);
        // Handle error scenarios
      });
    }

    const [addReviewSwitch, setAddReviewSwitch] = useState(true);

    const handleReviewPosted = () => {
      setAddReviewSwitch(false);
    };

    
    return ( 
      <>
        {addReviewSwitch && (
        <div className="movie-details" style={{ color: "#5a7795" }}>
          <div className="title" style={{ width: '1280px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>{details.title}</h1>
            {userRole === 'CRITIC' && (
              <button className="movie-btn" onClick={() => setAddReviewSwitch(!addReviewSwitch)}>Create review</button>
            )}
            {userRole === 'USER' && (
              <button className="movie-btn" onClick={() => addToWatchlist()}>Add to watchlist</button>
            )}
          </div>

          <div className="backdrop" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${details.backdrop_path})` }}/>
          <h5 style={{width: '1280px'}}>{details.overview}</h5>
          <div className="details">
              <div className="details-box">
                  <h5>Genres: </h5>
                  <div className="genre-container" style={{ display: 'flex' }}>
                    {details.genres &&
                      details.genres.map((genre) => (
                        <div className="genre" style={{ marginRight: '10px' }} onClick={() => navigate(`/genre/${genre.id}`)}>{genre.name}</div>
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
          </div>

          <h2>Cast</h2>
          <div className="actors"  style={{ width: '1280px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', marginLeft: '30px'}}>
              {details.cast && details.cast.map((actor) => (
              <div className="actor-movie">
                  <div className="circle-actor" onClick={() => navigate(`/actors/${actor.id}`)} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${actor.profile_path})` }} />
                  <div className="actor-name">{actor.name}</div>
              </div>
              ))}
          </div>

          <h2>Crew</h2>
          <div className="actors"  style={{ width: '1280px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', marginLeft: '30px'}}>
              {details.crew && details.crew.map((member) => (
              <div className="actor-movie">
                  <div className="circle-actor" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${member.profile_path})` }} />
                  <div className="actor-name">{member.name}</div>
              </div>
              ))}
          </div>
          
          <div className="movies-reviews">
            <h2>Reviews</h2>
            <div style={{ marginLeft: '20px', marginTop: '20px' }}>
              {reviews && reviews.map((review) => (
                <SingleReview review={review} />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* {addReviewSwitch === false && <CreateReview details={details} setAddReviewSwitch={setAddReviewSwitch} addReviewSwitch={addReviewSwitch}/>} */}
      {!addReviewSwitch && (
        <CreateReview
          details={details}
          setAddReviewSwitch={setAddReviewSwitch}
          onReviewPosted={() => setAddReviewSwitch(true)}
        />
      )}
      </>
     );
}
 
export default MovieDetails;