import axios from 'axios';
import { useEffect, useState } from 'react';
import SingleReview from './SingleReview';
import Movie from './Movie';
import { useParams, useNavigate } from 'react-router-dom';

const MyPage = () => {
    const role = localStorage.getItem('role');
    const [reviews, setReviews] = useState();
    const [watchlist, setWatchlist] = useState();

    const [userId, setUserId] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/users/currentlyLoggedIn', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        setUserId(response.data.id);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

    useEffect(() => {
        const fetchDataReviews = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/reviews/user/' + userId, {
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
                const response = await axios.get('http://localhost:8080/api/v1/watchlist/user/' + userId, {
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
    }, [userId]);
    // console.log(watchlist)
    if(role === 'CRITIC'){
        console.log(reviews)
    }
    else if(role === 'USER'){
        console.log(watchlist)
    }
    return ( 
        <div className="user-page" style={{paddingLeft: '28%'}}>
            {role === 'CRITIC' && reviews && reviews.map((review) => (
                <SingleReview review={review} delete={true}/>
            ))}
            {role === 'USER' && watchlist && watchlist.movies && watchlist.movies.map((movie) => (
                <Movie movie={movie}/>
            ))}
        </div>
     );
}
 
export default MyPage;