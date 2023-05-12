import { Button } from "bootstrap";
import {  useNavigate } from 'react-router-dom';
import axios from "axios";

const SingleReview = ({ review }) => {
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

    return ( 
        <div className="single-review" style={{color: 'white'}}>
            <div className="review-info">
                <div className="author" onClick={() => handleNavigation(review.author.id)}>{review.author.firstname} {review.author.lastname}:</div>
                <div className="review-content">{review.content}</div>
            </div>
            <div className="rating">Rating: {review.rating}</div>
            {role==='ADMIN' && <button className="delete-btn" onClick={() => deleteReview(review.id)}>Delete review</button>}
        </div>
     );
}
 
export default SingleReview;