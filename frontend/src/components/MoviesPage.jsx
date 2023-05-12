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
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });
            const { content, totalPages } = response.data;
            setTotalPages(totalPages);
            // setMovies(response.data.content)
            setMovies(response.data.content.filter((m) => (m.id<200)));
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
        console.log(movies)
    }, []);
    // const moviesPerPage = 10;
    // const startIndex = currentPage * moviesPerPage;
    // const endIndex = startIndex + moviesPerPage;
    // const displayedMovies = movies.slice(startIndex, endIndex);
    // const goToPage = (page) => {
    //     setCurrentPage(page);
    //     // Make API request to fetch data for the selected page
    //   };
      
    //   const nextPage = () => {
    //     if (currentPage < totalPages - 1) {
    //       goToPage(currentPage + 1);
    //     }
    //   };
      
    //   const previousPage = () => {
    //     if (currentPage > 0) {
    //       goToPage(currentPage - 1);
    //     }
    //   };

    return ( 
        <div className="movies-page" style={{color: 'white'}}>
            {/* <button onClick={previousPage} disabled={currentPage === 0}>Previous</button>
            <button onClick={nextPage} disabled={currentPage === totalPages - 1}>Next</button> */}
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