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
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/actors', {
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
            setActors(response.data.content);
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
        console.log(actors)
    }, [currentPage]);

    
    
    const nextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
  };

    return ( 
      <div>
        <h1 style={{color: 'white', marginLeft: '100px', marginBottom: '40px'}}>Actors</h1>
      <div className="actors-list">
        {actors.map((actor) => (
          <div className="box-actor-movie" onClick={() => navigate(`/actors/${actor.id}`)} style={{color: 'white'}}>
            <div className="box-actor" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${actor.profile_path})` }} />
            <div className="actor-name" style={{marginTop: '20px'}}>{actor.name}</div>
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
          disabled={currentPage === totalPages-1}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
     );
}
 
export default ActorsPage;