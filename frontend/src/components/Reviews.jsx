import axios from 'axios';
import { useState, useEffect } from 'react';
import SingleReview from './SingleReview';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/reviews/'+localStorage.getItem('token'), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });
            setReviews(response.data.content);
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
        // console.log(reviews)
    }, []);
    return ( 
        <div className="reviews">
            {reviews && reviews.map((review) => (
                <SingleReview review={review} key={review.id}/>
            ))}
            {!reviews && <h2>No reviews yet</h2>}
        </div>
     );
}
 
export default Reviews;