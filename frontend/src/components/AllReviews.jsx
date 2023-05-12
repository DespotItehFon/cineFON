import SingleReview from "./SingleReview";
import axios from 'axios';
import { useEffect, useState } from 'react';
// import styles from './Reviews.css';

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/reviews', {
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
        console.log(reviews)
    }, []);
    console.log(reviews)
    return ( 
        <div className="all-reviews">
            {reviews && reviews.map((review) => (
                <SingleReview review={review}/>
            ))}
        </div>
     );
}
 
export default AllReviews;