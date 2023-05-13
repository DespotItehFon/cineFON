import axios from 'axios';
import { useState, useEffect } from 'react';
import Movie from './Movie';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/movies', {
            params: {
                size: 5,
                page: currentPage
            }, 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });
            const { content, totalPages } = response.data;
            setTotalPages(totalPages);
            setMovies(response.data.content)
            // setMovies(response.data.content.filter((m) => (m.id<200)));
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
        console.log(movies)
    }, [currentPage]);
    // const [currentPage, setCurrentPage] = useState(1);

    

    // const totalPages = Math.ceil(actors.length / actorsPerPage);

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const previousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return ( 
        <div>
            {/* <button onClick={previousPage} disabled={currentPage === 0}>Previous</button>
            <button onClick={nextPage} disabled={currentPage === totalPages - 1}>Next</button> */}
            {/* <button onClick={() => console.log(movies)}>sd</button> */}
            {/* {data.title} <br/>
            {data.tagline}<br/>
            {data.popularity} */}
            <h1 style={{color: 'white', marginLeft: '100px', marginBottom: '40px'}}>Movies</h1>
            <div className="pagination">
                <button
                style={{width: '120px'}}
                onClick={previousPage}
                disabled={currentPage === 0}
                className="pagination-button"
                >
                Previous
            </button>
            <button 
                style={{width: '120px'}}
                onClick={(nextPage)}
                disabled={currentPage === 3}
                className="pagination-button"
                >
                Next
            </button>
            </div>
            <div className="movies-page">
                {movies && movies.map((movie) => (
                    <Movie movie={movie}/>
                ))}
            </div>
            {/* <Movie title={data.title} tagline={data.tagline} popularity={data.popularity}/>
            <Movie title={data.title} tagline={data.tagline} popularity={data.popularity}/>
            <Movie title={data.title} tagline={data.tagline} popularity={data.popularity}/> */}
        </div>
     );
}
 
export default MoviesPage;