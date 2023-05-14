import axios from 'axios';
import { useState, useEffect } from 'react';
import Movie from './Movie';


const Watchlist = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/watchlist/my', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });
            setMovies(response.data.movies)
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
        // console.log(movies)
    }, []);

    function removeFromWatchlist(id){
        axios.delete('http://localhost:8080/api/v1/watchlist/movie' + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
    return ( 
        <div className="watchlist">
            {movies && movies.map((movie) => (
                <Movie movie={movie} removeFromWatchlist={removeFromWatchlist} key={movie.id}/>
            ))}
        </div>
     );
}
 
export default Watchlist;