import axios from 'axios';
import { useState, useEffect } from 'react';
import Movie from './Movie';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/movies', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });
            // setMovies(response.data.content)
            setMovies(response.data.content.filter((m) => (m.id<200)));
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
        console.log(movies)
    }, []);

    return ( 
        <div className="movies-page" style={{color: 'white'}}>
            {/* <button onClick={() => console.log(movies)}>sd</button> */}
            {/* {data.title} <br/>
            {data.tagline}<br/>
            {data.popularity} */}
            {movies && movies.map((movie) => (
                <Movie movie={movie}/>
            ))}
            {/* <Movie title={data.title} tagline={data.tagline} popularity={data.popularity}/>
            <Movie title={data.title} tagline={data.tagline} popularity={data.popularity}/>
            <Movie title={data.title} tagline={data.tagline} popularity={data.popularity}/> */}
        </div>
     );
}
 
export default MoviesPage;