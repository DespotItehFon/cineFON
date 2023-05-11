import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

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

    const [reviews, setReviews] = useState([]); // VELJKO JOS NIJE UBACIO PRIMERE ZA REVIEW
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
          setReviews(response.data)
        //   console.log(movieDetails.data)
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
      console.log(reviews)
    }, []);

    const navigate = useNavigate();
    // console.log(reviews)
    return ( 
        <div className="movie-details" style={{color: "white"}}>
            <h1>{details.title}</h1>
            <div className="backdrop" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})` }}/>
            <div className="details">
                <h5>{details.tagline}</h5>
            </div>
            <div className="actors">
                {details.cast && details.cast.map((actor) => (
                <div className="actor-movie">
                    <div className="circle-actor" onClick={() => navigate(`/actors/${actor.id}`)} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${actor.profile_path})` }} />
                    <div className="actor-name">{actor.name}</div>
                </div>
                ))}
            </div>
            <div className="movies-reviews">

            </div>
        </div>
     );
}
 
export default MovieDetails;