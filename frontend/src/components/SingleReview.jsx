import { Button } from "bootstrap";
import {  useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";

const SingleReview = ({ review, deleteReview }) => {
    const [userId, setUserId] = useState();
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

    const role = localStorage.getItem('role')
    function deleteReview(id){
        axios.delete('http://localhost:8080/api/v1/reviews/'+id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });
    }

    const navigate = useNavigate();
    

    const handleNavigation = (id) => {
        const newUrl = 'http://localhost:3000/review/user/' + id; 
        window.location.href = newUrl;
    };
    console.log(deleteReview)
    return ( 
        <div className="single-review" style={{ color: 'white' }}>
        <div className="review-info">
            <div className="author" onClick={() => handleNavigation(review.author.id)}>
            {review.author.firstname} {review.author.lastname}:
            </div>
            <div className="review-content">{review.content}</div>
        </div>
        <div className="rating">Rating: {review.rating}</div>
        {role === 'ADMIN' || (role === 'CRITIC' && review.author.id === userId) && (
            <button className="delete-btn" onClick={() => deleteReview(review.id)}>
            Delete review
            </button>
        )}
        </div>
     );
}
 
export default SingleReview;