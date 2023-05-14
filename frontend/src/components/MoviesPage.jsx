import axios from "axios";
import { useState, useEffect } from "react";
import Movie from "./Movie";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/movies",
          {
            params: {
              size: 5,
              page: currentPage,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { content, totalPages } = response.data;
        setTotalPages(totalPages);
        setMovies(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    console.log(movies);
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 style={{ color: "white", marginLeft: "100px", marginBottom: "40px" }}>
        Movies
      </h1>
      <div className="pagination">
        <button
          style={{ width: "120px" }}
          onClick={previousPage}
          disabled={currentPage === 0}
          className="pagination-button"
        >
          Previous
        </button>
        {Array.from(Array(totalPages).keys()).map((pageNumber) => (
          <button
            key={pageNumber}
            style={{ width: "40px" }}
            onClick={() => goToPage(pageNumber)}
            className={`pagination-button ${
              pageNumber === currentPage ? "active" : ""
            }`}
          >
            {pageNumber + 1}
          </button>
        ))}

        <button
          style={{ width: "120px" }}
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className="pagination-button"
        >
          Next
        </button>
      </div>
      <div className="movies-page">
        {movies && movies.map((movie) => <Movie movie={movie} key={movie.id}/>)}
      </div>
    </div>
  );
};

export default MoviesPage;
