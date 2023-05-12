import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateReview = () => {

    const navigate = useNavigate();
  const { id: movieId } = useParams();
  const userId = localStorage.getItem('userId');

  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {

    axios
      .post(`http://localhost:8080/api/v1/reviews`, {
        author_id: userId,
        content: document.getElementById('content').value,
        rating: document.getElementById('rating').value,
        movie_id: movieId
      })
      .then(response => {
        console.log('Review posted successfully:', response.data);
        // Perform any necessary actions after successful review submission

        // Redirect to the movie details page
        // navigate(`/movies/${movieId}`);
      })
      .catch(error => {
        console.error('Error posting review:', error);
        // Handle error scenarios
      });
  };

    return ( 
        <div className="add-review">
            <input type="text" name="" id="content" />
            <input type="text" name="" id="rating" />
            <button onClick={() => alert("ALOOO STA TREBA DA SE PROSLEDI")}>Post review</button>
        </div>
     );
}
 
export default CreateReview;