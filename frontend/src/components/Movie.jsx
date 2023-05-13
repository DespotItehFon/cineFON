import { useNavigate } from 'react-router-dom';

const Movie = ({ movie, removeFromWatchlist }) => {
    const navigate = useNavigate();
    return ( 
        <>
            {/* <div className="movie-poster" onClick={() => navigate(`/movies/${movie.id}`)} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movie.poster_path})` }}/> */}
            {/* {removeFromWatchlist && (
                <button
                onClick={() => removeFromWatchlist(movie.id)}
                style={{ width: '200px', height: '40px'}} // Add this inline style to create spacing between the movie poster and the button
                >
                Remove from watchlist
                </button>
            )} */}
            {removeFromWatchlist && <div className="movie-poster-delete" onClick={() => removeFromWatchlist(movie.id)} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movie.poster_path})` }}/>}
            {!removeFromWatchlist && <div className="movie-poster" onClick={() => navigate(`/movies/${movie.id}`)} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movie.poster_path})` }}/>}
        </>
     );
}
 
export default Movie;