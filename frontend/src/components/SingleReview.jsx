import { Button } from "bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
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
    
    return ( 
        <div className="single-review" style={{color: 'white'}}>
            <div className="autor">{review.author.firstname} {review.author.lastname}</div>
            <div className="review-content">{review.content}</div>
            <div className="rating">Rating: {review.rating}</div>
            {role==='ADMIN' && <button onClick={() => deleteReview(review.id)}>Delete review</button>}
        </div>
     );
}
 
export default SingleReview;