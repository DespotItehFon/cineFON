import axios from 'axios';
import { useState } from 'react';
import Movie from './Movie';

const MoviesPage = () => {
    // const getData = () => {
    //     axios
    //       .get('http://localhost:8080/api/v1/movies', {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //       })
    //       .then(response => {
    //         console.log(response);
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    //   };
    const [data, setData] = useState({
        "id": 13,
        "adult": false,
        "budget": 55000000,
        "genres": [
            {
                "id": 35,
                "name": "Comedy"
            },
            {
                "id": 18,
                "name": "Drama"
            },
            {
                "id": 10749,
                "name": "Romance"
            }
        ],
        "homepage": "https://www.paramountmovies.com/movies/forrest-gump",
        "overview": "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
        "popularity": 52.321,
        "revenue": 677387716,
        "runtime": 142,
        "status": "Released",
        "tagline": "The world will never be the same once you've seen it through the eyes of Forrest Gump.",
        "title": "Forrest Gump",
        "video": false,
        "cast": [
            {
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
                "id": 35,
                "name": "Sally Field",
                "popularity": 15.189,
                "original_name": "Sally Field",
                "profile_path": "/5fBK36MdmdwQQMuP0W70rXADXih.jpg"
            },
            {
                "id": 34,
                "name": "Mykelti Williamson",
                "popularity": 12.834,
                "original_name": "Mykelti Williamson",
                "profile_path": "/8TnU8lT8uJp97vKi5AluaQFuTZI.jpg"
            }
        ],
        "crew": [
            {
                "id": 37,
                "adult": false,
                "gender": 2,
                "name": "Alan Silvestri",
                "popularity": 3.649,
                "department": "Sound",
                "job": "Original Music Composer",
                "credit_id": "52fe420ec3a36847f800076b",
                "known_for_department": "Sound",
                "original_name": "Alan Silvestri",
                "profile_path": "/pQOAsQDuYMR4cKaPAP0wkRlCSNo.jpg"
            },
            {
                "id": 37,
                "adult": false,
                "gender": 2,
                "name": "Alan Silvestri",
                "popularity": 3.649,
                "department": "Sound",
                "job": "Conductor",
                "credit_id": "5cc623de9251410961f44e23",
                "known_for_department": "Sound",
                "original_name": "Alan Silvestri",
                "profile_path": "/pQOAsQDuYMR4cKaPAP0wkRlCSNo.jpg"
            },
            {
                "id": 24,
                "adult": false,
                "gender": 2,
                "name": "Robert Zemeckis",
                "popularity": 8.581,
                "department": "Directing",
                "job": "Director",
                "credit_id": "52fe420ec3a36847f800072d",
                "known_for_department": "Directing",
                "original_name": "Robert Zemeckis",
                "profile_path": "/lPYDQ5LYNJ12rJZENtyASmVZ1Ql.jpg"
            },
            {
                "id": 26,
                "adult": false,
                "gender": 2,
                "name": "Winston Groom",
                "popularity": 1.235,
                "department": "Writing",
                "job": "Novel",
                "credit_id": "5690606ac3a3686b5200066a",
                "known_for_department": "Writing",
                "original_name": "Winston Groom",
                "profile_path": "/d5SooICKys7VofhLcBHi5LjGe63.jpg"
            },
            {
                "id": 27,
                "adult": false,
                "gender": 2,
                "name": "Eric Roth",
                "popularity": 3.612,
                "department": "Writing",
                "job": "Screenplay",
                "credit_id": "52fe420ec3a36847f8000781",
                "known_for_department": "Writing",
                "original_name": "Eric Roth",
                "profile_path": "/16WXnoU1NP2H732P0qAQUtetSI9.jpg"
            }
        ],
        "backdrop_path": "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
        "imdb_id": "tt0109830",
        "original_language": "en",
        "original_title": "Forrest Gump",
        "poster_path": "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        "release_date": "1994-06-23"
    });

    return ( 
        <div className="movies-page" style={{color: 'white'}}>
            {/* <button onClick={() => getData()}>getData</button> */}
            {/* {data.title} <br/>
            {data.tagline}<br/>
            {data.popularity} */}
            <Movie title={data.title} tagline={data.tagline} popularity={data.popularity}/>
            <Movie title={data.title} tagline={data.tagline} popularity={data.popularity}/>
            <Movie title={data.title} tagline={data.tagline} popularity={data.popularity}/>
        </div>
     );
}
 
export default MoviesPage;