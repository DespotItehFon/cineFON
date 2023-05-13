import { useNavigate } from "react-router-dom";

const Movie = ({ movie, removeFromWatchlist }) => {
  const navigate = useNavigate();
  return (
    <>
      {!removeFromWatchlist && (
        <div
          className="movie-poster"
          onClick={() => navigate(`/movies/${movie.id}`)}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movie.poster_path})`,
          }}
        />
      )}
    </>
  );
};

export default Movie;
