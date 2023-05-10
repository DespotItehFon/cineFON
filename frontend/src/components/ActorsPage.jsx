import { useState } from "react";
import Actor from "./Actor";
import React from 'react';

const ActorsPage = () => {
    const [data, setData] = useState([{
        "id": 31,
        "name": "Tom Hanks",
        "popularity": 61.599,
        "original_name": "Tom Hanks",
        "profile_path": "/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg"
    },
    {
        "id": 32,
        "name": "Robin Wright",
        "popularity": 20.012,
        "original_name": "Robin Wright",
        "profile_path": "/d3rIv0y2p0jMsQ7ViR7O1606NZa.jpg"
    },
    {
        "id": 33,
        "name": "Gary Sinise",
        "popularity": 14.459,
        "original_name": "Gary Sinise",
        "profile_path": "/ngYV91xYfCu0JNcSxJ4yQ7tzOna.jpg"
    },
    {
        "id": 34,
        "name": "Mykelti Williamson",
        "popularity": 12.834,
        "original_name": "Mykelti Williamson",
        "profile_path": " https://image.tmdb.org/t/p/w300/8TnU8lT8uJp97vKi5AluaQFuTZI.jpg"
    }]);
    return ( 
        <div className="actors">
            {data.map((actor) => (
                <Actor name={actor.name} img={actor.profile_path} key={actor.id}/>
            ))}
        </div>
     );
}
 
export default ActorsPage;