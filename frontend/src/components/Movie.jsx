import { useNavigate } from 'react-router-dom';

const Movie = ({ movie }) => {
    const navigate = useNavigate();
    return ( 
        <>
            <div className="movie" onClick={() => navigate(`/movies/${movie.id}`)} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})` }}>
                Title: {movie.title} <br/>
                Tagline: {movie.tagline} <br/>
                Popularity: {movie.popularity} <br/>
            </div>
        </>
     );
}
 
export default Movie;