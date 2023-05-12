import axios from 'axios';
import { useState, useEffect } from 'react';
import Movie from './Movie';
import { useParams } from 'react-router-dom';

const Genre = () => {
    const [movies, setMovies] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/genres/' + id + '/movies', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });
            setMovies(response.data.content)
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
        // console.log(movies)
    }, []);
    return ( 
        <div className="genre-page" style={{paddingLeft: '20%'}}>
            {movies && movies && movies.map((movie) => (
                <Movie movie={movie}/>
            ))}
        </div>
     );
}
 
export default Genre;