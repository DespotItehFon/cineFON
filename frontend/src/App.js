import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MoviesPage from './components/MoviesPage';
import ActorsPage from './components/ActorsPage';
import MovieDetails from './components/MovieDetails';
import ActorDetails from './components/ActorDetails';
import CreateReview from './components/CreateReview';
import Watchlist from './components/Watchlist';
import Reviews from './components/Reviews';
import { useEffect, useState } from 'react';
import UserPage from './components/UserPage';
import MyPage from './components/MyPage';
import Genre from './components/Genre';
import UpdateReview from './components/UpdateReview';
import axios from 'axios';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);  
  useEffect(() => {
    if(localStorage.getItem("token")===null) setIsLoggedIn(false)
    else setIsLoggedIn(true);
  }, [localStorage.getItem("token")])

  return (
    <BrowserRouter>
    <div className="App">
      {<Navbar isLoggedIn={isLoggedIn}/>}
      <div className='body'>
          <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<MoviesPage/>} />
            <Route path="/movies/:id" element={<MovieDetails/>} />
            <Route path="/actors" element={<ActorsPage/>} />
            <Route path="/actors/:id" element={<ActorDetails/>} />
            <Route path="/addreview/:id" element={<CreateReview/>} />
            <Route path="/watchlist" element={<Watchlist/>} />
            <Route path="/reviews" element={<Reviews/>} />
            <Route path="/user" element={<MyPage/>} />
            <Route path="/review/user/:userID" element={<UserPage/>} />
            <Route path="/genre/:id" element={<Genre/>}/>
            <Route path="/updatereview/:id" element={<UpdateReview/>}/>
          </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
