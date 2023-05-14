import axios from "axios";
import { useState, useEffect } from "react";
import Movie from "./Movie";
import { useParams } from "react-router-dom";

const Genre = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/genres/" + id + "/movies",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMovies(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/genres/" + id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setGenre(response.data.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <h2 style={{ color: "#2c3e50", paddingLeft: "100px" }}>Genre: {genre}</h2>
      <div
        className="genre-page"
        style={{
          paddingLeft: "10%",
          display: "flex",
          flexWrap: "wrap",
          width: "1400px",
        }}
      >
        {movies && movies && movies.map((movie) => <Movie movie={movie} key={movie.id}/>)}
      </div>
    </>
  );
};

export default Genre;
