import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateReview = ({ details, setAddReviewSwitch, onReviewPosted}) => {

  const navigate = useNavigate();
  // const { id } = useParams();

  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    axios
  .post(
    `http://localhost:8080/api/v1/reviews`,
    {
      content: document.getElementById('content').value,
      rating: selectedValue,
      movie: {
        id: details.id
      }
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
  .then(response => {
    console.log('Review posted successfully:', response.data);
    // Perform any necessary actions after successful review submission

    // Redirect to the movie details page
    onReviewPosted();
  })
  .catch(error => {
    console.error('Error posting review:', error);
    onReviewPosted();
    // Handle error scenarios
  });
}
const sliderRef = useRef(null);
const [selectedValue, setSelectedValue] = useState(1);

  const handleSliderChange = () => {
    const value = sliderRef.current.value;
    setSelectedValue(value);
  };

    return ( 
        <div className="add-review">
          <h5 style={{ textAlign: 'center', color: 'white'}}>{details.title}</h5>

            <input className="form-control" type="text" name="" id="content" style={{width: '200px', margin: '8px'}} placeholder="Content"/>
            <input
              type="range"
              min="1"
              max="10"
              defaultValue="1"
              step="1"
              ref={sliderRef}
              onChange={handleSliderChange}
            />
            <div>
            <div style={{color: 'white'}}>
              Rating: {selectedValue}
            </div>
      </div>
            <button className="btn-login" onClick={() => handleSubmit()}>Post review</button>
        </div>
     );
}
 
export default CreateReview;