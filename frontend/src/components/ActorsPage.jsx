import { useState, useEffect } from "react";
// import Actor from "./Actor";
import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ActorsPage = () => {
    const [actors, setActors] = useState([]);
    // const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/actors', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });
            const { content, totalPages } = response.data;
            setTotalPages(totalPages);
            setActors(response.data.content);
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
        console.log(actors)
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const actorsPerPage = 10;

    const indexOfLastActor = currentPage * actorsPerPage;
    const indexOfFirstActor = indexOfLastActor - actorsPerPage;
    const currentActors = actors.slice(indexOfFirstActor, indexOfLastActor);
    
    const nextPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
    const previousPage = () => {
      setCurrentPage(currentPage - 1);
    };

    return ( 
      <div>
      <div className="actors-list">
        {currentActors.map((actor) => (
          <div className="actor-movie" onClick={() => navigate(`/actors/${actor.id}`)}>
            <div className="circle-actor" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${actor.profile_path})` }} />
            <div className="actor-name">{actor.name}</div>
          </div>
        ))}
      </div>
      <div style={{width: '1280px', marginLeft: '130px'}} className="pagination">
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === 2}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
     );
}
 
export default ActorsPage;