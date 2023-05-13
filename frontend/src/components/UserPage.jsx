import axios from 'axios';
import { useEffect, useState } from 'react';
import SingleReview from './SingleReview';
import Movie from './Movie';
import { useParams, useNavigate } from 'react-router-dom';

const UserPage = () => {
    
    const [role, setRole] = useState('');
    const [reviews, setReviews] = useState();
    const [watchlist, setWatchlist] = useState();
    const { userID } = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        axios
          .get('http://localhost:8080/api/v1/users/' + userID, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => {
            setRole(response.data.role);
            setUser(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    useEffect(() => {
        const fetchDataReviews = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/reviews/user/' + userID, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });
            setReviews(response.data.content);
        } catch (error) {
            console.error(error);
        }
        };

        const fetchDataWatchlist = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/watchlist/user/' + userID, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
                });
                setWatchlist(response.data);
                // console.log(response)
            } catch (error) {
                console.error(error);
            }
            };
            if(role === 'CRITIC'){
                fetchDataWatchlist();
            }
            else if(role === 'USER'){
                fetchDataReviews();
            }
            fetchDataReviews();
        // console.log(reviews)
        fetchDataWatchlist();
        // console.log(watchlist)
    }, [userID]);
    // console.log(watchlist)
    if(role === 'CRITIC'){
        console.log(reviews)
    }
    else if(role === 'USER'){
        console.log(watchlist)
    }
    let isUserPage = false;
    const url = window.location.href;
    // setIsUserPage(url.includes("movie"))
    if (url.includes("movie")) {
        isUserPage=false;
      } else {
        isUserPage=true;
      }

    return ( 
        <div className="user-page" style={{paddingLeft: '27%'}}>
            {user && <h1 style={{color: 'white', marginLeft: '150px', marginBottom: '40px'}}>{user.firstname} {user.lastname}</h1>}
            {role === 'CRITIC' && reviews && reviews.map((review) => (
                <SingleReview review={review} isUserPage={isUserPage}/>
                // review.content
            ))}
            {role === 'USER' && watchlist && watchlist.movies && watchlist.movies.map((movie) => (
                <Movie movie={movie}/>
            ))}
        </div>
     );
}
 
export default UserPage;