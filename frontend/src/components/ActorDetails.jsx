import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ActorDetails = () => {
    const { id } = useParams();
    // let movieDetails;
    const [details, setDetails] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/actors/' + id, {
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

    const [movies, setMovies] = useState([]);
    useEffect(() => {
    const fetchDataMovies = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/actors/' + id + '/movies', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          // setMovies(response.data.content)
        //   setMovies(response.data.content.filter((m) => (m.id<200)));
        //   movieDetails = response.data;
          setMovies(response.data.content)
        //   console.log(movieDetails.data)
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchDataMovies();
      console.log(movies)
    }, []);

    // console.log(details)
    console.log(movies)

    const navigate = useNavigate();
    return ( 
      <div>
      <h1 style={{color: 'white', marginLeft: '50px'}}>{details.name}</h1>
        <div className="actor-details">
            <div className="profile" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${details.profile_path})` }}/>
            <div className="actor-movie-list">
                {movies && movies.map((movie) => (
                    <div className="movie-box" onClick={() => navigate(`/movies/${movie.id}`)} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})` }}>
                        {movie.title}
                    </div>
                ))}
            </div>
        </div>
        </div>
     );
}
 
export default ActorDetails;