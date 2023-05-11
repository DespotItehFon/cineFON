import { useState, useEffect } from "react";
// import Actor from "./Actor";
import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ActorsPage = () => {
    const [actors, setActors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/actors', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });
            // setMovies(response.data.content)
            // setMovies(response.data.content.filter((m) => (m.id<200)));
            setActors(response.data.content);
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
        console.log(actors)
    }, []);
    console.log(actors)
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
            </div>
        </div>
     );
}
 
export default ActorsPage;