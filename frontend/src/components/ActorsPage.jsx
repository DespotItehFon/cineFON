import { useState, useEffect } from "react";
// import Actor from "./Actor";
import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ActorsPage = () => {
    const [actors, setActors] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
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
    console.log(actors)
    const goToPage = (page) => {
        setCurrentPage(page);
        // Make API request to fetch data for the selected page
      };
      
      const nextPage = () => {
        if (currentPage < totalPages - 1) {
          goToPage(currentPage + 1);
        }
      };
      
      const previousPage = () => {
        if (currentPage > 0) {
          goToPage(currentPage - 1);
        }
      };
    return ( 
        <div className="actors-page">
            {/* {data.map((actor) => (
                <Actor name={actor.name} img={actor.profile_path} key={actor.id}/>
            ))} */}
            <div className="actors-list">
                {actors && actors.map((actor) => (
                <div className="actor-movie"  onClick={() => navigate(`/actors/${actor.id}`)}>
                    <div className="circle-actor"  style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${actor.profile_path})` }} />
                    <div className="actor-name">{actor.name}</div>
                </div>
                ))}
                {/* <button onClick={previousPage} disabled={currentPage === 0}>Previous</button>
                <button onClick={nextPage} disabled={currentPage === totalPages - 1}>Next</button> */}
            </div>
        </div>
     );
}
 
export default ActorsPage;